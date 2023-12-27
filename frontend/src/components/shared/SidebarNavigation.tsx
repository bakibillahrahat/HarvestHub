"use client";

import { api, sessionData } from "@/api/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineCube } from "react-icons/hi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdOutlineDashboard } from "react-icons/md";
import { RiProductHuntLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const SidebarNavigation = () => {
  const router = useRouter();
  const path = usePathname();
  const [data, setData] = useState<Object>({});
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
      })
      .catch((error): any => {
        console.log(error);
      });
  });
  const sessionKill = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Link href={`/admin/`}>
            <div className="text-left font-bold">
              <span className="text-green-500">Harvest </span>Hub
            </div>
          </Link>
          {/* <button className="p-1 rounded-lg bg-ray-50 hover:bg-gray-100">
            <IoIosArrowBack />
          </button> */}
        </div>
        <ul className="flex-1 px-3 mt-5">
          <Link
            href={`/admin/`}
            className="flex text-base hover:bg-green-100 text-gray-500  w-full rounded-md hover:text-green-500 py-3 px-2"
          >
            <div className="mr-2 ml-1 text-xl">
              <MdOutlineDashboard />
            </div>
            <div className="ml-1">Dashboard</div>
          </Link>
          <Link
            href={`/admin/users`}
            className="flex text-base hover:bg-green-100 text-gray-500  w-full rounded-md hover:text-green-500 py-3 px-2"
          >
            <div className="mr-2 ml-1 text-xl">
              <FaRegUserCircle />
            </div>
            <div className="ml-1">Users</div>
          </Link>
          <Link
            href={`/admin/products`}
            className="flex text-base hover:bg-green-100 text-gray-500  w-full rounded-md hover:text-green-500 py-3 px-2"
          >
            <div className="mr-2 ml-1 text-xl">
              <RiProductHuntLine />
            </div>
            <div className="ml-1">Products</div>
          </Link>
          <Link
            href={`/admin/orders`}
            className="flex text-base hover:bg-green-100 text-gray-500  w-full rounded-md hover:text-green-500 py-3 px-2"
          >
            <div className="mr-2 ml-1 text-xl">
              <HiOutlineCube />
            </div>
            <div className="ml-1">Orders</div>
          </Link>
          <Link
            href={`/admin/billings`}
            className="flex text-base hover:bg-green-100 text-gray-500  w-full rounded-md hover:text-green-500 py-3 px-2"
          >
            <div className="mr-2 ml-1 text-xl">
              <LiaFileInvoiceDollarSolid />
            </div>
            <div className="ml-1">Billings</div>
          </Link>
        </ul>
        <Link href={`/admin/profile`}>
          <div className="border-t flex p-3 border-b">
            <button className="w-10 h-10 rounded-md bg-green-200 m-2">
              AD
            </button>
            <div className={`leading-4 m-2`}>
              <h4 className="semibold">{data.name}</h4>
              <span className="text-xs text-gray-600">{data.email}</span>
            </div>
          </div>
        </Link>
        <div className="p-3 m-auto">
          <button className="mx-auto flex" onClick={sessionKill}>
            <div className="p-2 text-xl font-semibold text-green-500 rounded-md bg-gray-100">
              <RiLogoutBoxLine />
            </div>

            <h4 className="m-2">Logout</h4>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default SidebarNavigation;
