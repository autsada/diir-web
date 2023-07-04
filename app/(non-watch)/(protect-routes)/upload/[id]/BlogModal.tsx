"use client"

import React, {
  useState,
  useCallback,
  useRef,
  useTransition,
  useMemo,
} from "react"
import { useRouter } from "next/navigation"
import Dropzone from "react-dropzone"
import { AiOutlineCloseCircle } from "react-icons/ai"
import type { DeltaStatic } from "quill"
import _ from "lodash"
import { toast } from "react-toastify"

import CloseButton from "@/components/CloseButton"
import ModalWrapper from "@/components/ModalWrapper"
import ButtonLoader from "@/components/ButtonLoader"
import Mask from "@/components/Mask"
import PreviewMode from "../PreviewMode"
import QuillEditor from "../QuillEditor"
import ConfirmModal from "@/components/ConfirmModal"
import { uploadFile, deleteFile } from "@/firebase/helpers"
import { publishesFolder } from "@/firebase/config"
import { saveBlogPost } from "../actions"
import type { FileWithPrview } from "@/types"
import type { Publish, Station } from "@/graphql/codegen/graphql"
import { PublishVisibility } from "@/graphql/types"

interface Props {
  profile: Station
  publish: Publish
}

export default function BlogModal({ profile, publish }: Props) {
  const stationName = profile.name
  const publishId = publish.id
  const prevVisibility = publish.visibility
  const [mode, setMode] = useState<"edit" | "preview">("edit")
  const prevTitle = publish.title || ""
  const [title, setTitle] = useState(prevTitle)
  const [titleError, setTitleError] = useState("")
  const isTitleEqual = useMemo(
    () => _.isEqual(prevTitle, title),
    [prevTitle, title]
  )
  const prevTags = publish.tags
  const [tags, setTags] = useState<string[]>(prevTags)
  const isTagsEqual = useMemo(() => _.isEqual(prevTags, tags), [prevTags, tags])
  const prevImage = publish.thumbnail
  const [oldImage, setOldImage] = useState(prevImage)
  const prevImageRef = publish.thumbnailRef
  const isOldImageEqual = useMemo(
    () => _.isEqual(oldImage, prevImage),
    [oldImage, prevImage]
  )
  const [image, setImage] = useState<FileWithPrview>()
  const [fileError, setFileError] = useState("")
  const prevContent = publish.blog?.content
  const [content, setContent] = useState<DeltaStatic | undefined>(prevContent)
  const isContentEqual = useMemo(
    () => _.isEqual(prevContent, JSON.parse(JSON.stringify(content))),
    [prevContent, content]
  )
  const [contentForPreview, setContentForPreview] = useState("")
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [savingDraft, setSavingDraft] = useState(false)
  const [publishingBlog, setPublishingBlog] = useState(false)
  const [error, setError] = useState("")

  const tagInputRef = useRef<HTMLDivElement>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  const onCloseModal = useCallback(() => {
    if (
      isTitleEqual &&
      isTagsEqual &&
      isOldImageEqual &&
      !image &&
      isContentEqual
    ) {
      goBack()
    } else {
      setConfirmModalVisible(true)
    }
  }, [
    isTitleEqual,
    isTagsEqual,
    isOldImageEqual,
    image,
    isContentEqual,
    goBack,
  ])

  const closeConfirmModal = useCallback(() => {
    setConfirmModalVisible(false)
  }, [])

  const saveBlog = useCallback(
    async (visibility: PublishVisibility) => {
      if (!stationName) return
      if (
        isTitleEqual &&
        isTagsEqual &&
        isOldImageEqual &&
        !image &&
        isContentEqual
      )
        return

      try {
        // Validate title
        if (title.length > 128) {
          setTitleError("Max length 128 characters.")
          return
        }

        if (visibility === "draft") {
          setSavingDraft(true)
        } else if (visibility === "public") {
          setPublishingBlog(true)
        }

        // Save a blog
        // 1 Upload image to cloud storage (if any)
        let imageUrl: string | undefined = undefined
        let imageRef: string | undefined = undefined
        let filename: string | undefined = undefined
        if (image) {
          const { url, fileRef } = await uploadFile({
            file: image,
            folder: `${publishesFolder}/${stationName}/${publishId}`,
          })
          imageUrl = url
          imageRef = fileRef
          filename = image.name

          // Remove the old image (if any) without waiting
          // Add try/catch to let the process continue if delete file has error
          try {
            if (prevImage && prevImageRef) {
              deleteFile(prevImageRef)
            }
          } catch (error) {
            console.error(error)
          }
          setImage(undefined)
          setOldImage(url)
        } else {
          // If user removes the old image wihout uploading a new one
          // Wait for the delete to finish
          if (!oldImage && prevImageRef) {
            await deleteFile(prevImageRef)
          }
        }

        // 2.2 Save the draft
        startTransition(() =>
          saveBlogPost({
            publishId,
            title,
            imageUrl: !imageUrl && !oldImage ? "" : imageUrl,
            imageRef: !imageRef && !oldImage ? "" : imageRef,
            filename: !filename && !oldImage ? "" : filename,
            tags,
            content: content ? JSON.stringify(content) : undefined,
            visibility,
          })
        )
        const id = setTimeout(() => {
          if (visibility === "draft") {
            setSavingDraft(false)
          } else if (visibility === "public") {
            setPublishingBlog(false)
          }
          clearTimeout(id)
        }, 1000)
        toast.success(
          visibility === "draft" ? "Blog updated" : "Blog published",
          { theme: "dark" }
        )
      } catch (error) {
        if (visibility === "draft") {
          setSavingDraft(false)
        } else if (visibility === "public") {
          setPublishingBlog(false)
        }
        setError("Failed saving the draft, please try again.")
      }
    },
    [
      stationName,
      isTitleEqual,
      isOldImageEqual,
      isTagsEqual,
      isContentEqual,
      title,
      image,
      tags,
      prevImage,
      oldImage,
      prevImageRef,
      publishId,
      content,
    ]
  )

  const changeMode = useCallback((m: "edit" | "preview") => {
    setMode(m)
  }, [])

  const changeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTitle(value)
  }, [])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    const f = acceptedFiles[0] as FileWithPrview

    // Check size
    if (f.size / 1000 > 4096) {
      // Maximum allowed image size = 4mb
      setFileError("File too big")
    }
    const fileWithPreview = Object.assign(f, {
      preview: URL.createObjectURL(f),
    })

    setImage(fileWithPreview)
  }, [])

  const removeImage = useCallback(() => {
    setImage(undefined)
  }, [])

  const removeOldImage = useCallback(() => {
    setOldImage("")
  }, [])

  const onClickTagsDiv = useCallback(() => {
    if (tagInputRef.current) {
      const input = document.getElementById("tag-input")
      if (input) {
        input.focus()
      }
    }
  }, [])

  const addTag = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const last = value.slice(value.length - 1)
    if (last === ",") {
      const newTag = value.substring(0, value.length - 1)
      setTags((prev) =>
        prev.includes(newTag) || prev.length === 4 ? prev : [...prev, newTag]
      )
      e.target.value = ""
    }
  }, [])

  const removeTag = useCallback((t: string) => {
    setTags((prev) => prev.filter((tag) => tag !== t))
  }, [])

  if (!publish) return null

  return (
    <ModalWrapper visible>
      <div className="w-full h-full min-w-full min-h-full max-w-full max-h-full flex items-center justify-center">
        <div className="relative w-[95%] h-[95%] bg-white rounded-md overflow-hidden flex flex-col">
          <div className="w-full py-2 px-5 8-red-200 flex items-center justify-between border-b border-neutral-100">
            <h6>Update blog</h6>
            <div className="h-full flex items-center justify-between">
              <div className="h-full flex items-center justify-center mr-2 sm:mr-10 md:mr-14 lg:mr-18 xl:mr-24">
                <button
                  onClick={changeMode.bind(undefined, "edit")}
                  className={`w-[50px] ${
                    mode === "edit" ? "font-semibold" : "font-light"
                  } sm:mr-5`}
                >
                  Edit
                </button>
                <button
                  onClick={changeMode.bind(undefined, "preview")}
                  className={`w-[80px] ${
                    mode === "preview" ? "font-semibold" : "font-light"
                  }`}
                >
                  Preview
                </button>
              </div>
              <CloseButton onClick={onCloseModal} className="text-base" />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto lg:overflow-y-hidden scrollbar-hide">
            {/* Edit */}
            <div className={`${mode === "edit" ? "block" : "hidden"} h-full`}>
              <div className="w-full pt-1 overflow-x-auto">
                <input
                  type="text"
                  placeholder="Blog title here"
                  className={`w-max min-w-full px-2 sm:px-4 py-1 text-semibold text-2xl md:text-3xl lg:text-4xl border-b-[2px] break-words break-all ${
                    titleError ? "border-error" : "border-white"
                  }`}
                  minLength={3}
                  maxLength={128}
                  value={title}
                  onChange={changeTitle}
                />
              </div>

              <div className="w-full h-full sm:divide-neutral-100 flex flex-col lg:flex-row">
                <div className="w-full h-max lg:h-full lg:w-2/5 py-2 px-2 lg:overflow-y-auto scrollbar-hide">
                  <div className="mb-4 w-full">
                    <div className="relative z-0 w-full flex items-center justify-center">
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image.preview}
                          alt={image.name}
                          className="w-full h-[200px] md:h-[320px] lg:h-[220px] xl:h-[250px]  object-cover"
                        />
                      ) : oldImage ? ( // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={oldImage}
                          alt={publish.filename || publish.title || ""}
                          className="w-full h-[200px] md:h-[320px] lg:h-[220px] xl:h-[250px]  object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="pt-5 flex items-center justify-center gap-x-8">
                      <Dropzone
                        accept={{
                          "image/*": [],
                        }}
                        onDrop={onDrop}
                        multiple={false}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <button
                              type="button"
                              className="btn-light mx-0 px-6 rounded-full"
                            >
                              {oldImage || image
                                ? "Change"
                                : "Add a cover image"}
                            </button>
                          </div>
                        )}
                      </Dropzone>
                      {image ? (
                        <button
                          type="button"
                          className="btn-cancel mx-0 px-6 rounded-full"
                          onClick={removeImage} // Remove new image
                        >
                          Remove
                        </button>
                      ) : oldImage ? (
                        <button
                          type="button"
                          className="btn-cancel mx-0 px-6 rounded-full"
                          onClick={removeOldImage} // Remove old image
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                  </div>

                  <div className="w-full p-2 border border-neutral-200 rounded-md overflow-x-auto scrollbar-hide">
                    <div
                      ref={tagInputRef}
                      className="w-max h-full flex items-center gap-2 cursor-pointer"
                      onClick={onClickTagsDiv}
                    >
                      {tags.length > 0 &&
                        tags.map((tag) => (
                          <Tag key={tag} tag={tag} onClick={removeTag} />
                        ))}
                      {tags.length < 4 && (
                        <input
                          id="tag-input"
                          type="text"
                          name="tag"
                          maxLength={31}
                          placeholder="Add up to 4 tags"
                          className="block w-full h-full"
                          onChange={addTag}
                        />
                      )}
                    </div>
                  </div>
                  <p className="font-light text-textLight text-sm">
                    Enter a comma after each tag
                  </p>
                </div>

                <div className="w-full h-full lg:w-3/5 sm:px-2 lg:px-3 xl:px-4 pb-[100px]">
                  <QuillEditor
                    content={content}
                    setContent={setContent}
                    setContentForPreview={setContentForPreview}
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div
              className={`${
                mode === "preview" ? "block" : "hidden"
              } h-full overflow-y-auto`}
            >
              <PreviewMode
                profile={profile}
                title={title}
                hashTags={tags}
                imageUrl={image?.preview}
                imageName={image?.name}
                content={contentForPreview}
              />
            </div>
          </div>

          <div className="w-full h-[70px] py-2 px-5 border-t border-neutral-100 flex items-center justify-end gap-x-5">
            <p className="error">
              {titleError ? (
                titleError
              ) : fileError ? (
                fileError
              ) : error ? (
                error
              ) : (
                <>&nbsp;</>
              )}
            </p>
            {prevVisibility === "draft" ? (
              <>
                <button
                  type="button"
                  className="btn-light mx-0 w-[130px]"
                  onClick={saveBlog.bind(undefined, "draft")}
                >
                  {savingDraft ? <ButtonLoader loading /> : "Update draft"}
                </button>
                <button
                  type="button"
                  className="btn-blue mx-0 w-[100px]"
                  onClick={saveBlog.bind(undefined, "public")}
                >
                  {publishingBlog ? <ButtonLoader loading /> : "Publish"}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn-light mx-0 w-[100px]"
                  //   onClick={saveBlog.bind(undefined, "draft")}
                >
                  {publishingBlog ? <ButtonLoader loading /> : "UnPublish"}
                </button>
                <button
                  type="button"
                  className="btn-light mx-0 w-[100px]"
                  //   onClick={saveBlog.bind(undefined, "draft")}
                >
                  {savingDraft ? <ButtonLoader loading /> : "Update"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      {confirmModalVisible && (
        <ConfirmModal
          cancelText="Yes, leave"
          onCancel={goBack}
          confirmText="No, stay"
          onConfirm={closeConfirmModal}
        >
          <div>
            <h6 className="text-lg md:text-xl">
              Changes NOT save, do you really want to leave?
            </h6>
          </div>
        </ConfirmModal>
      )}

      {/* Prevent interaction while creating a draft */}
      {(savingDraft || publishingBlog || isPending) && <Mask />}
    </ModalWrapper>
  )
}

function Tag({ tag, onClick }: { tag: string; onClick: (t: string) => void }) {
  return (
    <div className="px-2 lg:px-3 h-[30px] rounded-full bg-neutral-200 flex items-center justify-center gap-x-2 lg:gap-x-3">
      <span className="text-sm">{tag}</span>
      <AiOutlineCloseCircle
        size={16}
        className="cursor-pointer"
        onClick={onClick.bind(undefined, tag)}
      />
    </div>
  )
}
