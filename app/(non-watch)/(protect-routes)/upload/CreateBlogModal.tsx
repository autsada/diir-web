import React, { useState, useCallback, useRef, useTransition } from "react"
import Dropzone from "react-dropzone"
import { AiOutlineCloseCircle } from "react-icons/ai"
import type { DeltaStatic } from "quill"

import CloseButton from "@/components/CloseButton"
import ModalWrapper from "@/components/ModalWrapper"
import ButtonLoader from "@/components/ButtonLoader"
import Mask from "@/components/Mask"
import PreviewMode from "./PreviewMode"
import QuillEditor from "./QuillEditor"
import ConfirmModal from "@/components/ConfirmModal"
import { uploadFile } from "@/firebase/helpers"
import { publishesFolder } from "@/firebase/config"
import { saveBlogPost } from "./actions"
import type { FileWithPrview } from "@/types"
import type { Station } from "@/graphql/codegen/graphql"
import type { PublishVisibility } from "@/graphql/types"

interface Props {
  profile: Station
  cancelUpload: () => void
  stationName: string
}

export default function CreateBlogModal({
  profile,
  cancelUpload,
  stationName,
}: Props) {
  const [mode, setMode] = useState<"edit" | "preview">("edit")
  const [title, setTitle] = useState("")
  const [titleError, setTitleError] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [image, setImage] = useState<FileWithPrview>()
  const [fileError, setFileError] = useState("")
  const [content, setContent] = useState<DeltaStatic>()
  const [contentForPreview, setContentForPreview] = useState("")
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [savingDraft, setSavingDraft] = useState(false)
  const [publishingBlog, setPublishingBlog] = useState(false)
  const [error, setError] = useState("")

  const tagInputRef = useRef<HTMLDivElement>(null)

  const [isPending, startTransition] = useTransition()

  const onCloseModal = useCallback(() => {
    if (
      !title &&
      !image &&
      tags.length === 0 &&
      !content &&
      !contentForPreview
    ) {
      cancelUpload()
    } else {
      setConfirmModalVisible(true)
    }
  }, [title, image, tags, content, contentForPreview, cancelUpload])

  const closeConfirmModal = useCallback(() => {
    setConfirmModalVisible(false)
  }, [])

  const createPublish = useCallback(async () => {
    const result = await fetch(`/upload/draft/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await result.json()
    const publishId = data?.id as string
    return publishId
  }, [])

  const saveBlog = useCallback(
    async (visibility: PublishVisibility) => {
      if (
        !stationName ||
        (!title &&
          !image &&
          tags.length === 0 &&
          !content &&
          !contentForPreview)
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
          // Validate title
          if (title.length === 0) {
            setTitleError("Title is required.")
            return
          } else if (title.length < 3) {
            setTitleError("Min length 3 characters.")
            return
          } else if (title.length > 128) {
            setTitleError("Max length 128 characters.")
            return
          } else {
            setTitleError("")
          }

          // Validate content
          if (!content) {
            setError("No content to publish.")
            return
          }
          setPublishingBlog(true)
        }

        // 1. Create a publish
        const publishId = await createPublish()

        // 2. Save a blog
        // 2.1 Upload image to cloud storage (if any)
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
        }

        // 2.2 Save the draft
        startTransition(() =>
          saveBlogPost({
            publishId,
            title,
            imageUrl,
            imageRef,
            filename,
            tags,
            content,
            visibility,
          })
        )
        if (visibility === "draft") {
          setSavingDraft(false)
        } else if (visibility === "public") {
          setPublishingBlog(false)
        }

        // 2.3 Close modal
        cancelUpload()
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
      title,
      image,
      tags,
      content,
      contentForPreview,
      createPublish,
      cancelUpload,
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

  const onClickTagsDiv = useCallback(() => {
    if (tagInputRef.current) {
      const input = document.getElementById("tag-input")
      if (input) {
        console.log("called")
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

  return (
    <ModalWrapper visible>
      <div className="w-full h-full min-w-full min-h-full max-w-full max-h-full flex items-center justify-center">
        <div className="relative w-[95%] h-[95%] bg-white rounded-md overflow-hidden flex flex-col">
          <div className="w-full py-2 px-5 8-red-200 flex items-center justify-between border-b border-neutral-100">
            <h6>Create blog</h6>
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

          <div className="flex-grow overflow-y-auto lg:overflow-y-hidden scrollbar-hide pb-[70px]">
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
                      {image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image.preview}
                          alt={image.name}
                          className="w-full h-[200px] md:h-[320px] lg:h-[220px] xl:h-[250px]  object-cover"
                        />
                      )}
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
                              {image ? "Change" : "Add a cover image"}
                            </button>
                          </div>
                        )}
                      </Dropzone>
                      {image && (
                        <button
                          type="button"
                          className="btn-cancel mx-0 px-6 rounded-full"
                          onClick={removeImage}
                        >
                          Remove
                        </button>
                      )}
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

                <div className="w-full h-full lg:w-3/5 sm:px-2 lg:px-3 xl:px-4">
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
            <button
              type="button"
              className="btn-light mx-0 w-[100px]"
              onClick={saveBlog.bind(undefined, "draft")}
            >
              {savingDraft ? <ButtonLoader loading /> : "Save draft"}
            </button>
            <button
              type="button"
              className="btn-blue mx-0 w-[100px]"
              onClick={saveBlog.bind(undefined, "public")}
            >
              {publishingBlog ? <ButtonLoader loading /> : "Publish"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      {confirmModalVisible && (
        <ConfirmModal
          cancelText="Yes, leave"
          onCancel={cancelUpload}
          confirmText="No, stay"
          onConfirm={closeConfirmModal}
        >
          <div>
            <h6 className="text-lg md:text-xl">
              The draft has not been saved yet, do you really want to leave?
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
