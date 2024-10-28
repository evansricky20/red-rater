"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

const Navbar = () => {
  return (
    // drawer: root container
    <div className="drawer fixed z-50">
      {/* drawer-toggle: makes checkbox hidden and controls the drawer */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      {/* drawer-content: container for all page content */}
      <div className="drawer-content">
        {/* Navbar goes here */}
        <div className="navbar relative bg-black h-20 z-50">
          {/* putting label for my-drawer in navbar. htmlfor to connect to drawer */}
          <label
            htmlFor="my-drawer"
            className="btn btn-ghost z-50 hover:scale-110 hover:bg-transparent"
          >
            <Image
              src="/burger.svg"
              alt="Hamburger menu"
              width={100}
              height={100}
              style={{ width: "100%", height: "100%" }}
            />
          </label>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center pt-4 bg-red-600 h-28 w-24 z-50">
            <Image
              src="/DoubleT.png"
              alt="TTU DoubleT"
              width={100}
              height={100}
              style={{ width: "85%", height: "90%" }}
            />
          </div>
          <div className="absolute h-fit w-fit right-1 md:right-1 lg:right-16 2xl:right-52">
            <button
              className="btn btn-ghost hover:bg-transparent h-auto cursor-pointer text-red-600 text-2xl font-bold p-10 hidden md:flex"
              onClick={() => {
                const modal = document.getElementById("login_modal");
                if (modal) {
                  (modal as HTMLDialogElement).showModal();
                }
              }}
            >
              Login
            </button>
            <button
              className="btn btn-ghost hover:bg-transparent h-auto cursor-pointer text-red-600 text-2xl font-bold p-10 hidden md:flex"
              onClick={() => {
                const modal = document.getElementById("signup_modal");
                if (modal) {
                  (modal as HTMLDialogElement).showModal();
                }
              }}
            >
              Sign Up
            </button>
            {/* Signup Modal*/}
            <dialog
              id="signup_modal"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box relative">
                <div className="banner border-b-4 border-solid border-black flex p-2">
                  <h2 className="font-bold text-6xl p-4 me-auto">Red Rater</h2>
                  <Image
                    src="/DoubleT_BlkWht.png"
                    alt="Black and white Texas Tech Double T"
                    width={100}
                    height={100}
                    style={{ width: "20%", height: "20%" }}
                  />
                </div>
                <div className="modal-action flex flex-col">
                  <label className="input input-bordered flex items-center gap-2 mx-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Texas Tech Email"
                    />
                  </label>
                  <label className="input input-bordered flex items-center gap-2 my-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Password"
                    />
                  </label>
                  <button className="btn bg-red-600 hover:text-white hover:bg-black">
                    Sign Up
                  </button>
                  <p className="self-center">
                    Already have an account?{" "}
                    <a href="" className="text-red-600 underline">
                      Login here
                    </a>
                  </p>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            {/* Login Modal */}
            <dialog
              id="login_modal"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box relative">
                <div className="banner border-b-4 border-solid border-black flex p-2">
                  <h2 className="font-bold text-6xl p-4 me-auto">Red Rater</h2>
                  <Image
                    src="/DoubleT_BlkWht.png"
                    alt="Black and white Texas Tech Double T"
                    width={100}
                    height={100}
                    style={{ width: "20%", height: "20%" }}
                  />
                </div>
                <div className="modal-action flex flex-col">
                  <label className="input input-bordered flex items-center gap-2 mx-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Texas Tech Email"
                    />
                  </label>
                  <label className="input input-bordered flex items-center gap-2 my-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Password"
                    />
                  </label>
                  <button className="btn bg-red-600 hover:text-white hover:bg-black">
                    Login
                  </button>
                  <p className="self-center">
                    Don't have an account?{" "}
                    <a href="" className="text-red-600 underline">
                      Signup here
                    </a>
                  </p>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
        {/* Content goes here */}
      </div>
      {/* drawer-side: side bar container */}
      <div className="drawer-side h-screen overflow-auto">
        {/* drawer-overlay: a dark overlay that covers the screen when drawer is open */}
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        {/* list for links in side bar */}
        <ul className="flex flex-col items-start text-left pt-40 pl-6 lg:pl-15 2xl:pl-20 bg-red-600 h-full w-full md:w-1/2 overflow-hidden">
          <div className="absolute top-10 left-0 z-50 w-16 2xl:w-20">
            <Image
              src="/TTU_Lineart_black.png"
              alt="TTU line decal"
              width={100}
              height={100}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="absolute z-50 top-28 left-16 pl-1 md:hidden">
            <a
              className="btn btn-ghost hover:bg-transparent h-auto cursor-pointer text-white text-2xl font-bold p2 active:text-black"
              href=""
            >
              Login
            </a>
            <a
              href=""
              className="btn btn-ghost hover:bg-transparent h-auto cursor-pointer text-white text-2xl font-bold p-2 active:text-black"
            >
              Sign Up
            </a>
          </div>
          <li className="pl-10 p-2 sm:pb-5 2xl:p-10">
            <Link
              href="/page.tsx"
              className="btn btn-ghost h-auto cursor-pointer text-4xl xs:text-5xl lg:text-6xl 2xl:text-8xl font-bold text-white hover:bg-transparent hover:text-black"
            >
              Search
            </Link>
          </li>
          <li className="pl-10 p-2 sm:pb-5 2xl:p-10">
            <a
              href="https://portal.texastech.edu/"
              className="btn btn-ghost h-auto cursor-pointer text-4xl xs:text-5xl lg:text-6xl 2xl:text-8xl font-bold text-white hover:bg-transparent hover:text-black"
            >
              Raiderlink
            </a>
          </li>
          <li className="pl-10 p-2 sm:pb-5 2xl:p-10">
            <a
              href="https://www.depts.ttu.edu/lms/"
              className="btn btn-ghost h-auto cursor-pointer text-4xl xs:text-5xl lg:text-6xl 2xl:text-8xl font-bold text-white hover:bg-transparent hover:text-black"
            >
              Blackboard
            </a>
          </li>
          <li className="pl-10 p-2 sm:pb-5 2xl:p-10">
            <a
              href="https://www.ttu.edu/courseinfo/evals/"
              className="btn btn-ghost h-auto cursor-pointer text-4xl xs:text-5xl lg:text-6xl 2xl:text-8xl font-bold text-white hover:bg-transparent hover:text-black"
            >
              SmartEvals
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
