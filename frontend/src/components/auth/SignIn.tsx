"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

import api from "@/api/api";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  // const api = process.env.API?.toString() + "/auth/signin";

  const authLogic = handleSubmit((data) => {
    if (Object.keys(errors).length === 0) {
      setEmail(data.email);
      setPassword(data.password);

      const authData = { email: data.email, password: data.password };
      // authData.append("email", data.email);
      // authData.append("password", data.password);

      api
        .post("/auth/signin", JSON.stringify(authData), {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response.data);
          sessionStorage.setItem("token", response.data);
          router.push("/dashboard");
        })
        .catch((error) => console.log(error));
    }
    if (data.remember === true) {
      const authD = { email: data.email, password: data.password };
      localStorage.setItem("cookies", JSON.stringify(authD));
    } else if (data.remember === false) {
      localStorage.clear();
    }
    // console.log(data);
  });

  return (
    <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
      {/* Sign In page */}
      <div className="w-3/5 p-5">
        <div className="text-left font-bold">
          <span className="text-green-500">Harvest </span>Hub
        </div>
        <div className="py-10">
          <Link href={"/"} className="flex text-green-500 text-lg mb-1">
            <IoIosArrowBack className="m-1" />
            Back
          </Link>
          <h2 className="text-3xl font-bold text-green-500 mb-2">
            Sign in to Account
          </h2>
          <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
          <form onSubmit={authLogic} method="post">
            <div className="flex flex-col items-center">
              <div className={`bg-gray-100 w-64 p-2 flex items-center mb-3 $`}>
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please provide valid email!",
                    },
                  })}
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`bg-gray-100 outline-none text-sm flex-1`}
                  value={
                    JSON.parse(localStorage.getItem("cookies"))
                      ? JSON.parse(
                          localStorage.getItem("cookies")
                        ).email.toString()
                      : null
                  }
                />
              </div>
              <div className="text-red-500 text-sm">
                {errors.email?.message?.toString()}
              </div>

              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  {...register("password", {
                    required: "Password is required.",
                    pattern: {
                      value:
                        /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,60}$/,
                      message:
                        "Password should contain capital letter, small letter, number & special char",
                    },
                  })}
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`bg-gray-100 outline-none text-sm flex-1 `}
                  value={
                    JSON.parse(localStorage.getItem("cookies"))
                      ? JSON.parse(
                          localStorage.getItem("cookies")
                        ).password.toString()
                      : null
                  }
                />
              </div>
              <div className="text-red-500 text-sm">
                {errors.password?.message?.toString()}
              </div>

              <div className="flex justify-between w-64 mb-5">
                <label htmlFor="" className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-1"
                    {...register("remember")}
                  />
                  Remember Me
                </label>
                <Link href="#" className="text-xs">
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                className="border-2 border-green-500 cursor-pointer rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Sign Up Page */}
      <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
        <h2 className="text-2xl font-bold mb-2">Don't Have Account!</h2>
        <div className="border-2 w-10 text-white inline-block mb-2"></div>
        <p className="mb-10">
          Fill up personal information and start journey with us.
        </p>
        <Link
          href="/sign-up"
          className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500 transition-colors duration-75"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
