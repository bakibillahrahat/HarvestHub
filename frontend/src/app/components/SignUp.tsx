import Link from "next/link";
import React from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

const SignUp = () => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
      {/* Sign Up Page */}
      <div className="w-2/5 bg-green-500 text-white rounded-tl-2xl rounded-bl-2xl py-36 px-12">
        <h2 className="text-2xl font-bold mb-2">Already Have Account!</h2>
        <div className="border-2 w-10 text-white inline-block mb-2"></div>
        <p className="mb-10">
          Fill up personal email and password for login the system.
        </p>
        <Link
          href="/signin"
          className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500 transition-colors duration-75"
        >
          Sign In
        </Link>
      </div>

      {/* Sign Up page */}
      <div className="w-3/5 p-5">
        <div className="text-left font-bold">
          <span className="text-green-500">Harvest </span>Hub
        </div>
        <div className="py-10">
          <h2 className="text-3xl font-bold text-green-500 mb-2">
            Sign in to Account
          </h2>
          <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
          <div className="flex flex-wrap items-center">
            <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
              <FaRegUser className="text-gray-400 m-2" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
            <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
              <FaRegUserCircle className="text-gray-400 m-2" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
            <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
              <FaRegEnvelope className="text-gray-400 m-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
            <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
              <FaRegEnvelope className="text-gray-400 m-2" />
              <input
                type="number"
                name="phone"
                placeholder="Phone Number: +880"
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
            <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
              <MdLockOutline className="text-gray-400 m-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
            <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
              <MdLockOutline className="text-gray-400 m-2" />
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
            <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
              <MdLockOutline className="text-gray-400 m-2" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
            <div className="bg-gray-100 w-56 m-2 p-2 flex items-center flex-around">
              <FaUser className="text-gray-400 m-2" />
              <input
                type="file"
                name="avatar"
                className="block bg-gray-100 border-gray-400 outline-none text-sm flex-1"
              />
            </div>

            <input
              type="button"
              value="Sign Up"
              className="border-2 border-green-500 cursor-pointer rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
