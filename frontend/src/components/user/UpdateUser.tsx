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
import { api } from "@/api/api";

const UpdateUser: React.FC<{ pdata: any }> = ({ pdata }) => {
  const [success, setSuccess] = useState<String>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();


  const id = pdata?.id;
  const authLogic = handleSubmit((data) => {
    const userData = new FormData();
    userData.append("name", data.name);
    userData.append("email", data.email);
    userData.append("phone", data.phone);
    userData.append("address", data.address);
    console.log(userData);
    const token = sessionStorage.getItem("token")?.toString();
    // console.log(id)
    api
      .put(`/user/edituser/${id}`, JSON.stringify(userData), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    setSuccess("Registration Successfull.");
    console.log(errors);
  });
  return (
    <div className="w-[3/5] p-5">
      <div className="py-10">
        <h2 className="text-3xl font-bold text-green-500 mb-2">Add User</h2>
        <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
        <form className="flex flex-wrap items-center" onSubmit={authLogic}>
          <div>
            <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
              <FaRegUser className="text-gray-400 m-2" />
              <input
                type="text"
                placeholder={pdata?.name}
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
                placeholder={pdata?.email}
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
                placeholder={pdata?.phone}
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
            <div className="text-red-500 text-sm ml-2">
              {errors.phone?.message?.toString()}
            </div>
          </div>
          <div>
            {" "}
            <div className="bg-gray-100 w-56 m-2 p-2 flex items-center mb-3">
              <MdLockOutline className="text-gray-400 m-2" />
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                placeholder={pdata?.address}
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
            Sign Up
          </button>
        </form>
      </div>
      <div className="mx-auto text-green-500 txt-sm">{success}</div>
    </div>
  );
};

export default UpdateUser;
