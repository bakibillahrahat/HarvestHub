import SignIn from "@/app/components/SignIn";
import SignUp from "@/app/components/SignUp";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <SignIn />
      </div>
    </main>
  );
}
