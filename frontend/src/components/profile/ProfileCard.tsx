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
import { api,sessionData } from "@/api/api";

const ProfileCard = () => {
  const [success, setSuccess] = useState<String>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const authLogic = handleSubmit((data) => {
    const userData = new FormData();
    userData.append("name", data.name);
    userData.append("email", data.email);
    userData.append("phone", data.phone);
    userData.append("address", data.address);

    // console.og

    const token = sessionStorage.getItem("token")?.toString();
    const sData = sessionData(token);
    const id = sData?.sub;
    api
      .put(`/admin/editinfo/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    setSuccess("Registration Successfull.");
    console.log(errors);
  });

  return (
    <div className="text-gray-600 p-3 border-t text-center font-medium">
      <form onSubmit={authLogic}>
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
        <button
          type="submit"
          className="mx-auto mt-2 border-2 border-green-500 cursor-pointer rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileCard;
