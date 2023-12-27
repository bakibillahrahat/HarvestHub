"use client";

import { api, protector } from "@/api/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import AddUser from "./AddUser";
import { MdCancel } from "react-icons/md";
import UpdateUser from "./UpdateUser";

const Users = () => {
  const [addUser, setAddUser] = useState(false);
  const [addUpdate, SetAddUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({ key: String });

  const [data, setData] = useState({ key: String });
  const [key, setKey] = useState({ key: String });
  const token = sessionStorage.getItem("token")?.toString();
  protector();
  useEffect(() => {
    api
      .get(`/user/viewusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        const keyData = data[0];
        setData(data);
        setKey(keyData);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleDelete = (data: any) => {
    const id = data?.id.toString();
    api
      .delete(`user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("User Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(id);
  };

  const handleUpdate = (data: any) => {
    setUpdateData(data);
    SetAddUpdate(true);
  };

  return (
    <div className="relative overflow-x-auto h-full">
      <div className="w-full h-[100px] mb-5">
        <button
          className="mt-10 ml-32 bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setAddUser(true)}
        >
          Add User
        </button>
      </div>
      <div className="W-[800px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {Object.keys(key).map((d) => (
                <th scope="col" className="px-6 py-3">
                  {d}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.values(data).map((d, i) => (
              <tr className="odd:bg-white even:bg-gray-50" key={i}>
                {Object.values(d).map((k) => (
                  <td className="px-6 py-4">{k}</td>
                ))}
                <td className="px-6 py-4 text-white flex space-between">
                  <button
                    className="rounded-md p-2 bg-blue-400"
                    onClick={() => handleUpdate(d)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 rounded-md p-2"
                    onClick={() => handleDelete(d)}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addUser ? (
        <div className="bg-white rounded-2xl shadow-2xl w-[700px] max-w-4xl mx-auto -mt-[100px] z-10">
          <button
            className="text-red-400 text-2xl mt-5 ml-5"
            onClick={() => setAddUser(false)}
          >
            <MdCancel />
          </button>
          <AddUser />
        </div>
      ) : null}
      {addUpdate ? (
        <div className="bg-white rounded-2xl shadow-2xl w-[700px] max-w-4xl mx-auto -mt-[100px] z-10">
          <button
            className="text-red-400 text-2xl mt-5 ml-5"
            onClick={() => SetAddUpdate(false)}
          >
            <MdCancel />
          </button>
          <UpdateUser pdata={updateData} />
        </div>
      ) : null}
    </div>
  );
};

export default Users;
