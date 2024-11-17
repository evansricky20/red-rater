"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";

const PostCreate = () => {
  const [open, setOpen] = useState(false);

  const openPostCreate = () => {
    setOpen((open) => !open);
  };

  return (
    <div>
      <button
        className="btn btn-outline place-self-center border-2"
        onClick={openPostCreate}
      >
        Primary
        <Image src="/plus.svg" alt="Plus symbol" width={20} height={20} />
      </button>
      {open && (
        <div
          className="fixed flex justify-center items-center w-full h-full top-0 left-0 bg-black bg-opacity-50 z-50"
          onClick={openPostCreate}
        >
          <div
            className="bg-slate-50 w-1/3 h-2/3 right-0 rounded-md flex flex-col justify-center items-center p-5 px-16"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="w-full flex flex-row justify-center items-center m-5 mb-2">
              <h1 className="font text-center font-bold text-6xl pr-10 text-red-600">
                Create a Post
              </h1>
              <Image
                src="/DoubleT_BlkWht.png"
                alt="Black and white Texas Tech Double T"
                width={100}
                height={100}
                style={{ width: "10%", height: "90%" }}
              />
            </div>
            <div className="w-3/4 h-2 rounded-lg bg-black"></div>
            <div className="w-full ">
              <h2 className="text-left font-bold py-5">
                Select a course to review.
              </h2>
              <select
                className="select select-bordered max-w-xs font-bold"
                defaultValue=""
                // onChange={handleCourseChange}
              >
                <option value="" disabled>
                  Course List
                </option>
                {/* {profile.courses.map((course) => (
                <option key={course} value={course}>{`CS ${course}`}</option>
              ))} */}
              </select>
            </div>
            <div className="w-full h-full"></div>
            <div className="w-full h-full flex justify-center items-center flex-col">
              <h2 className="text-left font-bold py-5 w-full">
                Write your review here.
              </h2>
              <input
                type="text"
                placeholder="Please enter your evaluation here."
                className="input input-lg input-bordered w-full h-full max-w-2xl"
              />
              <button className="btn btn-wide m-5 bg-red-600 hover:bg-red-600">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCreate;
