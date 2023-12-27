"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import {api} from "@/api/api";
const SignUp = () => {
  const [success, setSuccess] = useState<String>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const pass = watch("password");

  const authLogic = handleSubmit((data) => {
    const userData = new FormData();
    userData.append("name", data.name);
    userData.append("username", data.username);
    userData.append("email", data.email);
    userData.append("password", data.password);
    userData.append("phone", data.phone);
    userData.append("address", data.address);
    userData.append("avater", data.avatar[0]);

    api
      .post("/auth/signup", userData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    setSuccess("Registration Successfull.")
    console.log(errors);
  });

  return (
    <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
      {/* Sign Up Page */}
      <div className="w-2/5 bg-green-500 text-white rounded-tl-2xl rounded-bl-2xl py-36 px-12">
        <Link href={"/"} className="flex text-white text-lg mb-1 -ml-1 -mt-4">
          <IoIosArrowBack className="m-1" />
          Back
        </Link>
        <h2 className="text-2xl font-bold mb-2">Already Have Account!</h2>
        <div className="border-2 w-10 text-white inline-block mb-2"></div>
        <p className="mb-10">
          Fill up personal email and password for login the system.
        </p>
        <Link
          href="/sign-in"
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
          <form className="flex flex-wrap items-center" onSubmit={authLogic}>
            <div>
              <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
                <FaRegUser className="text-gray-400 m-2" />
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              <div className="text-red-500 text-sm ml-2">
                {errors.name?.message?.toString()}
              </div>
            </div>
            <div>
              <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
                <FaRegUserCircle className="text-gray-400 m-2" />
                <input
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  placeholder="Username"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>
              <div className="text-red-500 text-sm ml-2">
                {errors.username?.message?.toString()}
              </div>
            </div>
            <div>
              <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please provide valid email!",
                    },
                  })}
                  placeholder="Email"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>
              <div className="text-red-500 text-sm ml-2">
                {errors.email?.message?.toString()}
              </div>
            </div>
            <div>
              <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="text"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  placeholder="Phone Number: +880"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>
              <div className="text-red-500 text-sm ml-2">
                {errors.phone?.message?.toString()}
              </div>
            </div>
            <div>
              <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required.",
                    pattern: {
                      value:
                        /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,60}$/,
                      message:
                        "Password should contain capital letter, small letter, number & special char",
                    },
                  })}
                  placeholder="Password"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>
              <div className="text-red-500 text-sm ml-2">
                {errors.password?.message?.toString()}
              </div>
            </div>
            <div>
              <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  type="password"
                  {...register("confirmpassword", {
                    required: "Confirm-password is required!",
                    validate: (value) =>
                      value === pass || "The passwords do not match",
                  })}
                  placeholder="Confirm Password"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>
              <div className="text-red-500 text-sm ml-2">
                {errors.confirmpassword?.message?.toString()}
              </div>
            </div>
            <div>
              {" "}
              <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  placeholder="Address"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>
              <div className="text-red-500 text-sm ml-2">
                {errors.address?.message?.toString()}
              </div>
            </div>
            <div>
              <div className="bg-gray-100 w-56 m-2 p-2 flex items-center flex-around">
                <FaUser className="text-gray-400 m-2" />
                <input
                  type="file"
                  {...register("avatar", {
                    validate: {
                      acceptedFormats: (files) =>
                        ["image/jpeg", "image/png", "image/gif"].includes(
                          files[0]?.type
                        ) || "Only PNG, JPEG e GIF",
                      lessThan10MB: (files) =>
                        files[0]?.size < 8000000 || "Max 8Mb",
                    },
                  })}
                  className="block bg-gray-100 border-gray-400 outline-none text-sm flex-1"
                />
              </div>
              <div className="text-red-500 text-sm ml-2">
                {errors.avatar?.message?.toString()}
              </div>
            </div>

            <button
              type="submit"
              className="mx-auto mt-2 border-2 border-green-500 cursor-pointer rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="mx-auto text-green-500 txt-sm">{success}</div>
      </div>
    </div>
  );
};

export default SignUp;
