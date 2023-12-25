"use client";

import api from "@/api/api";
import { error } from "console";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [token, setToken] = useState("");
  const router = useRouter();
  const path = usePathname();
  const id = path.split("/")[2];
  useEffect(() => {
    const token = sessionStorage.getItem("token")?.toString();
    api
      .get(`/admin/me/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        // router.push("/sign-in");
      });
  });
  return (
    <div>
      <h1>Hello, world</h1>
    </div>
  );
};

export default DashboardPage;
