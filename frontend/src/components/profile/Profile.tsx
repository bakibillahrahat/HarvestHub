"use client";

import { api, imgPath, sessionData } from "@/api/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import avater from "../../../../backend/upload/avater";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [path, setPath] = useState("");
  const [data, setData] = useState({ key: String });

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
        setData(data);
        const path = data?.avater.toString();
        setPath(path);
        console.log(path);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border shadow-sm w-4/12 p-10">
        <button className="text-green-500">
          <FaEdit />
        </button>
        <Image
          src={""}
          alt={"avater"}
          height={40}
          width={40}
          className="mx-auto"
        />
        <div className="text-gray-400 my-2 mx-auto text-center font-semibold">
          @{data?.username}
        </div>
        <div className="text-gray-600 p-3 border-t text-center font-medium">
          <div>
            <span>Name: </span>
            {data?.name}
          </div>
          <div>
            <span>Email: </span>
            {data?.email}
          </div>
          <div>
            <span>Phone: </span>
            {data?.phone}
          </div>
          <div>
            <span>Address: </span>
            {data?.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
