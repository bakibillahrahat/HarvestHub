import axios from "axios";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export const api = axios.create({
  baseURL: "http://localhost:4000",
});

export const sessionData = (token:any) => {
  return jwt.decode(token);
};

export const imgPath = ():string => {
  const path =  "../../../../backend/upload";
  return path;
}

export const protector = () => {
  const stoken = sessionStorage.getItem("token")
  if(stoken === null){
    redirect("/sign-in")
  }
}