import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

const RootLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar openSidebar={openSidebar} />
      <div className="flex-1 flex flex-col h-full overflow-x-hidden">
        <Navbar setOpenSidebar={setOpenSidebar}/>
        <main className="flex-1 p-4 lg:p-8 bg-gray-100 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
