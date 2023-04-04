import React from "react";

import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import AdminComplaintTable from "../components/AdminComplaintTable";

const Admin = () => {
  return (
    <div className="py-8">
      <div className="bg-slate-200 container mx-auto flex flex-col gap-8">
        <nav className="container mx-auto fixed top-0 left-0 right-0 z-50 py-4 px-6 lg:px-32 items-center justify-between flex flex-row bg-slate-200 shadow-md">
          <div>
            <img src={logo} className="w-24" alt="" />
          </div>
          <div className="flex flex-row text-lg lg:text-xl font-bold gap-4">
            <a href="#" className="text-gray-600 hover:text-oou-purple">
              Notifications
            </a>

            <Link to="/" className="text-gray-600 hover:text-oou-purple">
              Logout
            </Link>
          </div>
        </nav>

        <header className="inside-page mx-auto mt-36 flex justify-center bg-img">
          <div className="flex flex-col justify-center text-center items-center gap-12 self-center ">
            <h2 className=" text-3xl font-bold leading-tight">
              Hello,&nbsp;
              <span className="text-oou-blue text-5xl">Admin 1</span>
            </h2>
            <p className=" text-3xl font-bold leading-tight">
              Welcome to the Complaint Management System,{" "}
            </p>
          </div>
        </header>

        <main className=" mt-20 flex flex-col gap-8">
          <h2 className="flex flex-row justify-center text-3xl font-bold leading-tight">
            Previous Complaint
          </h2>
          <AdminComplaintTable />
        </main>
      </div>
    </div>
  );
};

export default Admin;
