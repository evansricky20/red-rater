"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Signup from "./Signup";
import Login from "./Login";

const Navbar = ({
  initialUser,
}: {
  initialUser: { email: string; fname: string; lname: string } | null;
}) => {
  // State variables
  const [user, setUser] = useState<{ email: string; fname: string; lname: string } | null>(
    initialUser
  );
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    fname: user?.fname || "",
    lname: user?.lname || "",
    password: "",
  });

  useEffect(() => {
    if (!initialUser) {
      const fetchUser = async () => {
        try {
          const response = await fetch("/api/auth/user");
          if (response.ok) {
            const data = await response.json();
            setUser(data);
            setFormData({
              email: data.email,
              fname: data.fname,
              lname: data.lname,
              password: "",
            });
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, [initialUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser.user);
        alert("Profile updated successfully");
        // Call logout function after successful update
        await logout();
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  // Function for handling logout
  const logout = async () => {
    try {
      // Fetch logout route
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        setUser(null);
        window.location.reload(); // Refresh the page
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    // drawer: root container
    <div className="drawer fixed z-50">
      {/* Signup Modal*/}
      <Signup />
      {/* Login Modal */}
      <Login />
      {/* Account Management Modal */}
      <dialog
        id="account_modal"
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
          <div className="modal-action flex flex-col w-full">
            <form className="w-full" onSubmit={handleSubmit}>
              <div>
                <h4 className="font-bold text-xl">Full Name</h4>
                <div className="flex justify-between mb-2">
                  <div>
                    <label className="input input-bordered flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        name="fname"
                        className="grow"
                        value={formData.fname}
                        onChange={handleInputChange}
                      />
                    </label>
                    <p className="text-gray-400">First Name</p>
                  </div>
                  <div>
                    <label className="input input-bordered flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        name="lname"
                        className="grow"
                        value={formData.lname}
                        onChange={handleInputChange}
                      />
                    </label>
                    <p className="text-gray-400">Last Name</p>
                  </div>
                </div>
                <div className="pb-2">
                  <h4 className="font-bold text-xl">Email</h4>
                  <label className="input input-bordered flex items-center gap-2 mb-4">
                    <input
                      type="text"
                      name="email"
                      className="grow"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="pb-2">
                  <h4 className="font-bold text-xl">Password</h4>
                  <label className="input input-bordered flex items-center gap-2 mb-4">
                    <input
                      type="password"
                      name="password"
                      className="grow"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="btn bg-ttu-red text-white w-1/2"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

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
          <Link href="/">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center pt-5 bg-ttu-red h-28 w-24 z-50">
              <Image
                src="/DoubleT.png"
                alt="TTU DoubleT"
                width={100}
                height={100}
                style={{ width: "85%", height: "90%" }}
              />
            </div>
          </Link>
          <div className="absolute h-fit w-fit right-1 md:right-1 lg:right-16 2xl:right-52">
            {loading ? (
              // Render loading while waiting for data fetch
              <div className="text-white text-bold">
                <span className="loading loading-spinner loading-xs mx-2"></span>
                Loading...
              </div>
            ) : user ? (
              // If not loading, and user is not null, render user component
              <div className="dropdown dropdown-bottom dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn bg-transparent hover:bg-gray-700 border-0 w-fit px-2 flex items-center space-x-2"
                >
                  <Image
                    src="/user-avatar-light.svg"
                    alt="User profile picture"
                    width={50}
                    height={50}
                    style={{ filter: "invert(100%)" }}
                  />
                  <span className="text-white text-xl">
                    {user.lname}, {user.fname}
                  </span>
                </div>
                <ul
                  tabIndex={0}
                  className="text-white dropdown-content menu bg-gray-900 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a 
                    className="hover:bg-gray-600" 
                    onClick={() => {
                      const modal = document.getElementById("account_modal");
                      if (modal) {
                        (modal as HTMLDialogElement).showModal();
                      }
                    }} >Edit Profile</a>
                  </li>
                  <li>
                    <a className="hover:bg-gray-600" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              // Else, not loading, and user is null, render login and signup buttons
              // Login & Signup Buttons
              <>
                <button
                  className="btn btn-ghost hover:bg-transparent h-auto cursor-pointer text-ttu-red text-2xl font-bold p-10 hidden md:flex"
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
                  className="btn btn-ghost hover:bg-transparent h-auto cursor-pointer text-ttu-red text-2xl font-bold p-10 hidden md:flex"
                  onClick={() => {
                    const modal = document.getElementById("signup_modal");
                    if (modal) {
                      (modal as HTMLDialogElement).showModal();
                    }
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* drawer-side: side bar container */}
      <div className="drawer-side h-screen overflow-auto">
        {/* drawer-overlay: a dark overlay that covers the screen when drawer is open */}
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        {/* list for links in side bar */}
        <ul className="flex flex-col items-start text-left pt-40 pl-6 lg:pl-15 2xl:pl-20 bg-ttu-red h-full w-full md:w-1/2 overflow-hidden">
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
            <button
              className="btn btn-ghost hover:bg-transparent h-auto cursor-pointer text-white text-2xl font-bold p2 active:text-black"
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
              className="btn btn-ghost hover:bg-transparent h-auto cursor-pointer text-white text-2xl font-bold p-2 active:text-black"
              onClick={() => {
                const modal = document.getElementById("signup_modal");
                if (modal) {
                  (modal as HTMLDialogElement).showModal();
                }
              }}
            >
              Sign Up
            </button>
          </div>
          <li className="pl-10 p-2 sm:pb-5 2xl:p-10">
            <Link
              href="/"
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
