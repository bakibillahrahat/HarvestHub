import SignUp from "@/app/components/SignUp";
import { NextPage } from "next";
import React from "react";

const SignUpPage: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <title>Harvest Hub | Sign Up</title>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
