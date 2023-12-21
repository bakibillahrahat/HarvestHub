"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<boolean>(false);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!name) {
      errors.name = "Name is required";
    } else if (!username) {
      errors.username = "Username is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }else if(!phone){
      errors.phone = "Phone number is required!";
    }else if(!address){
      errors.address = "Address is required!";
    }
    
    if (!password) {
      errors.password = "Password is required";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "At least one Capital Letter";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "At least one Small Letter";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "At least one Number";
    }
    if (!confirmPassword) {
      errors.confirmpassword = "Confirm Password is required";
    }
    if (password !== confirmPassword) {
      errors.confirmpassword = "Password & confirm-Password not Matched";
    }

    return errors;
  };

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
          <form className="flex flex-wrap items-center">
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
                type="text"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
