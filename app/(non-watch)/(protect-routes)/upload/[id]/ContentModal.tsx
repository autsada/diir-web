"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { doc, onSnapshot } from "firebase/firestore"

import ModalWrapper from "@/components/ModalWrapper"
import CategorySelect from "./CategorySelect"
import CloseButton from "@/components/CloseButton"
import { contentCategories } from "@/lib/helpers"
import { db, uploadsCollection } from "@/firebase/config"
import type { UploadedPublish } from "@/graphql/types"
import ButtonLoader from "@/components/ButtonLoader"

interface Props {
  publish: UploadedPublish
  updatePublish: any
}

export default function ContentModal({ publish, updatePublish }: Props) {
  const router = useRouter()

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
            <h6>Publish id: {publish.id}</h6>
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
                      className={`block w-full h-12 px-2 sm:px-4 rounded-sm border border-gray-300 focus:outline-none focus:border-orange-500`}
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
                      className={`block w-full py-1 px-2 sm:px-4 rounded-sm border border-gray-300 focus:outline-none focus:border-orange-500`}
                    />
                  </div>
                </label>

                <label
                  htmlFor="thumbnail"
                  className="block text-start font-semibold mb-5"
                >
                  Thumbnail
                  <div className="grid grid-cols-2 gap-x-4 sm:gap-x-10">
                    <div className="border border-gray-200 rounded-sm h-[80px] sm:h-[120px] cursor-pointer flex items-center justify-center">
                      Thumb1
                    </div>
                    <div className="border border-gray-200 rounded-sm h-[80px] sm:h-[120px] cursor-pointer flex items-center justify-center">
                      Thumb2
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
                  <div className="h-[180px] sm:h-[160px] lg:h-[260px] mb-2 flex items-center justify-center bg-gray-100">
                    {publish.playback ? (
                      <video
                        controls
                        className="w-full h-full object-cover"
                        poster={publish.playback.thumbnail}
                      >
                        <source src={publish.playback.hls} type="video/mp4" />
                        <source src={publish.playback.dash} type="video/oog" />
                      </video>
                    ) : (
                      <div className="text-center">
                        <p>Uploading...</p>
                        <ButtonLoader loading color="#f97316" />
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 border border-gray-100 rounded-sm">
                    {publish.playback && (
                      <div className="mb-4">
                        <p className="font-thin">Playback link</p>
                        <div>
                          <a
                            href={` http://localhost:3000/watch/${publish.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blueBase"
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
