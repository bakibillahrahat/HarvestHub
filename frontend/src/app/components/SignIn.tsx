"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  // const router = useRouter();

  const validateForm = (): { email?: string; password?: string } => {
    const errors: { email?: string; password?: string } = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
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
    return errors;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    // validate form before submitting
    const errors: { email?: string; pass?: string } = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("http://localhost:3000/auth/signin", {
          email,
          password,
        });
        console.log("res: " + response.data);
        // sessionStorage.setItem("email", response.data);
        // router.push("/dashboard");
      } catch (err) {
        console.log("error22: " + err);
        setErrMsg("invalid login");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
      {/* Sign In page */}
      <div className="w-3/5 p-5">
        <div className="text-left font-bold">
          <span className="text-green-500">Harvest </span>Hub
        </div>
        <div className="py-10">
          <h2 className="text-3xl font-bold text-green-500 mb-2">
            Sign in to Account
          </h2>
          <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
          <form onSubmit={handleSubmit} method="post">
            <div className="flex flex-col items-center">
              <div
                className={`bg-gray-100 w-64 p-2 flex items-center mb-3 ${
                  formErrors.email ? "border-red-500" : "border-gray-100"
                }`}
              >
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`bg-gray-100 outline-none text-sm flex-1`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`bg-gray-100 outline-none text-sm flex-1 ${
                    formErrors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between w-64 mb-5">
                <label htmlFor="" className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="mr-1"
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
          {errMsg && (
            <div className="mx-auto text-center mt-7">
              <p
                id="outlined_error_help"
                className="mt-2 text-large text-red-600 dark:text-red-400"
              >
                <span className="font-medium">{errMsg.toUpperCase()}</span>
              </p>
            </div>
          )}
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
          href="/signup"
          className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500 transition-colors duration-75"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
