import Image from "next/image";
import React from "react";

import { FaEdit } from "react-icons/fa";


const ProfileCad = () => {
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
        <form action=""></form>
      </div>
    </div>
  );
};

export default ProfileCad;
