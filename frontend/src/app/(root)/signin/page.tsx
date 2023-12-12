import SignIn from "@/app/components/SignIn";
import { NextPage } from "next";
import React from "react";
import Head from "next/head";


const SigninPage: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <title>Harvest Hub | Sign In</title>
      <SignIn />
    </div>
  );
};

export default SigninPage;
