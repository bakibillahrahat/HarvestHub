"use client";
import { SignIn } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("token")?.toString();
    const id = sessionStorage.getItem("token")?.toString();
    if(token){
      router.push(`/admin/${id}`)
    }else{
      router.push('/sign-in')
    }
  });
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignIn />
    </div>
  );
}
