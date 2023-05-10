"use client"

import React, { useCallback, useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { doc, onSnapshot } from "firebase/firestore"
import { Stream } from "@cloudflare/stream-react"
import { MdFileUpload, MdOutlineWarning } from "react-icons/md"
import { HiDotsVertical } from "react-icons/hi"
import { useDropzone } from "react-dropzone"

import ModalWrapper from "@/components/ModalWrapper"
import CategorySelect from "./CategorySelect"
import CloseButton from "@/components/CloseButton"
import ButtonLoader from "@/components/ButtonLoader"
import { contentCategories } from "@/lib/helpers"
import { db, uploadsCollection } from "@/firebase/config"
import type { ThumbSource, UploadedPublish } from "@/graphql/types"
import type { FileWithPrview } from "@/types"

interface Props {
  publish: UploadedPublish
  updatePublish: any
}

export default function ContentModal({ publish, updatePublish }: Props) {
  const [thumbnail, setThumbnail] = useState<FileWithPrview>()
  const [thumbnailError, setThumbnailError] = useState("")
  const [isChangingThumb, setIsChangingThumb] = useState(false)
  const [thumbSource, setThumbSource] = useState<ThumbSource>(() =>
    !publish?.thumbSource ? "generated" : publish.thumbSource
  )

  const router = useRouter()
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  // Listen to upload finished update in Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, uploadsCollection, publish?.id),
      (doc) => {
        // Reload data to get the most updated publish
        router.refresh()
      }
    )

    return unsubscribe
  }, [router, publish?.id])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    const f = acceptedFiles[0] as FileWithPrview

    // Check size
    if (f.size / 1000 > 4096) {
      // Maximum allowed image size = 4mb
      setThumbnailError("File too big")
    }
    const fileWithPreview = Object.assign(f, {
      preview: URL.createObjectURL(f),
    })

    setThumbnail(fileWithPreview)
    setThumbSource("custom")
    setIsChangingThumb(false)
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop: onDrop,
    accept: {
      "image/*": [],
    },
  })

  const selectThumbnail = useCallback((s: ThumbSource) => {
    setThumbSource(s)
  }, [])

  const requestChangeThumb = useCallback(() => {
    setIsChangingThumb(true)
  }, [])

  const cancelRequestChangeThumb = useCallback(() => {
    setIsChangingThumb(false)
  }, [])

  const onChangeThumb = useCallback(() => {
    if (hiddenInputRef?.current) {
      hiddenInputRef.current.click()
    }
  }, [hiddenInputRef])

  return (
    <ModalWrapper visible>
      <div className="w-full h-full min-w-full min-h-full max-w-full max-h-full flex items-center justify-center">
        <form
          className="relative w-[95%] h-[95%] bg-white rounded-md flex flex-col"
          action={updatePublish}
        >
          {/* This hidden input will send the publish id to the mutation action */}
          <input
            type="text"
            name="id"
            className="hidden"
            value={publish.id}
            onChange={() => {}}
          />

          <div className="w-full h-[60px] px-5 flex items-center justify-between border-b border-gray-100">
            <h6 className="text-sm sm:text-base lg:text-textRegular">
              Publish id: {publish.id}
            </h6>
            <div>
              <CloseButton
                onClick={() => router.back()}
                className="text-base"
              />
            </div>
          </div>

          <div className="flex-grow py-5 px-5 sm:px-10 overflow-y-auto">
            <h6>Details</h6>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
              <div>
                <label
                  htmlFor="title"
                  className="block text-start font-semibold mb-5"
                >
                  Title <span className="text-textDark">*</span>
                  <div className="relative">
                    <input
                      type="text"
                      name="title"
                      minLength={1}
                      maxLength={100}
                      defaultValue={publish.filename || ""}
                      placeholder="Publish title"
                      className={`block w-full h-12 px-2 sm:px-4 rounded-sm border border-gray-200 focus:outline-none focus:border-orange-500`}
                    />
                  </div>
                </label>

                <label
                  htmlFor="description"
                  className="block text-start font-semibold mb-5"
                >
                  Description
                  <div className="relative">
                    <textarea
                      name="description"
                      maxLength={5000}
                      defaultValue={publish.description || ""}
                      placeholder="Tell viewers about your content"
                      rows={6}
                      className={`block w-full py-1 px-2 sm:px-4 rounded-sm border border-gray-200 focus:outline-none focus:border-orange-500`}
                    />
                  </div>
                </label>

                <label
                  htmlFor="thumbnail"
                  className="block text-start font-semibold mb-5"
                >
                  Thumbnail
                  <p className="font-light text-textExtraLight text-sm">
                    Select or upload a picture for the publish thumbnail.
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-x-4 sm:gap-x-10">
                    {/* Generated thumbnail */}
                    <div
                      className={`rounded-sm h-[90px] sm:h-[120px] lg:h-[150px] cursor-pointer flex flex-col items-center justify-center  bg-gray-100 border-[2px] ${
                        thumbSource === "generated" &&
                        publish &&
                        publish.playback
                          ? "border-orange-500"
                          : "border-transparent"
                      }`}
                      onClick={
                        publish && publish.playback
                          ? selectThumbnail.bind(undefined, "generated")
                          : undefined
                      }
                    >
                      {publish && publish.playback ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={publish.playback.thumbnail}
                          alt="thumbnail_1"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <>
                          <MdOutlineWarning size={22} />
                          <p className="mt-2 text-center font-light text-xs text-textLight">
                            Generating thumbnail...
                          </p>
                        </>
                      )}
                    </div>

                    {/* Uploaded thumbnail */}
                    <div className="rounded-sm h-[90px] sm:h-[120px] lg:h-[150px] cursor-pointer flex flex-col items-center justify-center">
                      {publish.thumbnail || thumbnail ? (
                        <div
                          className={`relative z-0 w-full h-full flex items-center justify-center border-[2px]  ${
                            thumbSource === "custom"
                              ? "border-orange-500"
                              : "border-transparent"
                          }`}
                        >
                          {thumbnail ? (
                            <div
                              className="relative z-10 w-full h-full"
                              onClick={selectThumbnail.bind(
                                undefined,
                                "custom"
                              )}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={thumbnail.preview}
                                alt={thumbnail.name}
                                className="w-full h-full"
                              />
                            </div>
                          ) : publish.thumbnail ? (
                            <div
                              className="relative z-10 w-full h-full"
                              onClick={selectThumbnail.bind(
                                undefined,
                                "custom"
                              )}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={publish.thumbnail}
                                alt="thumbnail"
                                className="w-full h-full"
                              />
                            </div>
                          ) : null}

                          {/* This will allow user to request to change the uploaded thumbnail */}
                          <div className="absolute z-20 top-0 right-0 cursor-pointer py-1 w-[30px]">
                            <div className="absolute z-10 inset-0 bg-gray-500 opacity-40 rounded-[4px]" />
                            {!isChangingThumb ? (
                              <div
                                className="relative z-20 w-full h-full text-white flex items-center justify-center"
                                onClick={requestChangeThumb}
                              >
                                <HiDotsVertical
                                  size={22}
                                  className="relative z-20"
                                  color="white"
                                />
                              </div>
                            ) : (
                              <div
                                className="relative z-20 w-full h-full text-white flex items-center justify-center"
                                onClick={cancelRequestChangeThumb}
                              >
                                &#10005;
                              </div>
                            )}
                          </div>

                          {/* A button to be clicked to open upload box */}
                          {isChangingThumb && (
                            <button
                              className="absolute z-20 btn-orange px-5 rounded-full"
                              onClick={onChangeThumb}
                            >
                              Change
                            </button>
                          )}

                          {/* Hidden input to be clicked to change thumbnail */}
                          <div
                            className="hidden"
                            {...getRootProps({
                              isDragActive,
                              isDragReject,
                              isDragAccept,
                            })}
                          >
                            <input {...getInputProps()} ref={hiddenInputRef} />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="relative w-full h-full flex flex-col items-center justify-center bg-gray-100"
                          {...getRootProps({
                            isDragActive,
                            isDragReject,
                            isDragAccept,
                          })}
                        >
                          <input {...getInputProps()} />
                          <MdFileUpload size={25} />
                          <p className="font-light text-textLight text-sm mt-2">
                            Upload thumbnail
                          </p>
                          <span className="block font-light text-textExtraLight text-xs">
                            (Max 4MB)
                          </span>

                          {thumbnailError && (
                            <p className="absolute bottom-0 error">
                              {thumbnailError}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </label>

                <label
                  htmlFor="category"
                  className="block text-start font-semibold mb-5"
                >
                  Category
                  <p className="font-light text-textExtraLight text-sm">
                    You can choose up to 2 relevant categories.
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-x-2">
                    <div className="relative border border-gray-200 py-1 pl-4 rounded-sm">
                      <label htmlFor="primaryCat" className="block font-thin">
                        Primary <span className="text-textDark">*</span>
                      </label>
                      <CategorySelect
                        name="primary"
                        preSelectOption="Select"
                        options={contentCategories}
                        value={publish.primaryCategory}
                      />
                    </div>
                    <div className="relative border border-gray-200 py-1 pl-4 rounded-sm">
                      <label htmlFor="secondaryCat" className="block font-thin">
                        Secondary
                      </label>
                      <CategorySelect
                        name="secondary"
                        preSelectOption="Select"
                        options={contentCategories}
                        value={publish.secondaryCategory}
                      />
                    </div>
                  </div>
                </label>
              </div>

              <div className="sm:px-5">
                <div className="mb-5">
                  <div className="w-full mb-2 flex items-center justify-center bg-gray-100">
                    {publish.playback ? (
                      <div className="w-full">
                        <Stream
                          controls
                          src={publish.playback.videoId}
                          poster={publish.playback.thumbnail}
                        />
                      </div>
                    ) : (
                      <div className="h-[180px] sm:h-[160px] lg:h-[260px] flex flex-col items-center justify-center">
                        <p>Uploading...</p>
                        <ButtonLoader loading color="#f97316" />
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 border border-gray-200 rounded-sm">
                    {publish.playback && (
                      <div className="mb-4">
                        <p className="font-thin">Playback link</p>
                        <div>
                          <a
                            href={` http://localhost:3000/watch/${publish.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-base text-blueBase break-words"
                          >
                            http://localhost:3000/watch/{publish.id}
                          </a>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="font-thin">Filename</p>
                      <p>{publish.filename || ""}</p>
                    </div>
                  </div>
                </div>

                <label
                  htmlFor="visibility"
                  className="block text-start font-semibold mb-5"
                >
                  Visibility
                  <div className="px-5 mt-2">
                    <label
                      htmlFor="private"
                      className="block font-light text-textLight mb-4"
                    >
                      <input
                        type="radio"
                        name="visibility"
                        value="private"
                        defaultChecked={true}
                        className="cursor-pointer mr-4"
                      />
                      Private
                    </label>
                    <label
                      htmlFor="public"
                      className="block font-light text-textLight"
                    >
                      <input
                        type="radio"
                        name="visibility"
                        value="public"
                        className="cursor-pointer mr-4"
                      />
                      Public
                    </label>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="w-full h-[60px] py-2 px-5 border-t border-gray-100 flex items-center justify-end">
            <button type="submit" className="btn-blue mx-0 w-[100px]">
              Update
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  )
}
