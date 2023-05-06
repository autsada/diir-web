import React from "react"
import { MdPlayArrow } from "react-icons/md"
import { AiFillRead } from "react-icons/ai"

export default function Upload() {
  return (
    <>
      <h5>Upload content</h5>

      <div className="mt-5 flex flex-col sm:flex-row gap-y-5 sm:gap-y-0 sm:gap-x-5">
        <div className="w-full sm:w-[50%] md:w-[40%] lg:w-[35%] text-center px-5 py-10 border border-gray-200 rounded-md">
          <p>Upload videos, shorts, or podcasts.</p>
          <div className="my-10">
            <div className="w-[120px] h-[120px] mx-auto rounded-full flex items-center justify-center bg-orange-500">
              <MdPlayArrow size={50} color="white" />
            </div>
          </div>
          <button className="btn-dark w-[100px]">Upload</button>
        </div>
        <div className="w-full sm:w-[50%] md:w-[40%] lg:w-[35%] text-center px-5 py-10 border border-gray-200 rounded-md">
          <p>Create blogs.</p>
          <div className="my-10">
            <div className="w-[120px] h-[120px] mx-auto rounded-full flex items-center justify-center bg-blue-500">
              <AiFillRead size={50} color="white" />
            </div>
          </div>
          <button className="btn-light w-[100px]">Create</button>
        </div>
      </div>
    </>
  )
}
