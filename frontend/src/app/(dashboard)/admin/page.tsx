"use client";

import { api, sessionData } from "@/api/api";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [token, setToken] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();
  const path = usePathname();

  const stoken = sessionStorage.getItem("token")
  if(stoken === null){
    redirect("/sign-in")
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token")?.toString();
    const sData = sessionData(token);
    const id = sData?.sub;
    api
      .get(`/admin/me/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
      })
      .catch((error) => {
        setErr(error.message);
      });
  });
  return (
    <div className="h-full">
      <h1>Hello, world</h1>
    </div>
  );
};

export default DashboardPage;
