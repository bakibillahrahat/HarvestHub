import SidebarNavigation from "@/components/shared/SidebarNavigation";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-white">
        <div className="flex">
          <SidebarNavigation />
          <div className="col-span-4 flex flex-col w-full">
            {/* <Header /> */}
            <div className="">{children}</div>
            {/* <Footer/> */}
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
