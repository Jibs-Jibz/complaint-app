import React, { useState } from "react";
import ManageUsers from "./ManageUsers";
import "./SuperAdmin.css";

import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import EditUserInfoForm from "./EditUserInfoForm";

function SuperAdmin() {
  const [activeTab, setActiveTab] = useState("manageUsers");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="py-28">
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
        <div className=" py-12 px-8 ">
          <ul className="flex flex-row py-4 px-6 lg:px-32 items-center gap-12 justify-center rounded-3xl shadow-md ">
            <li className="">
              <button
                className={` border-none rounded font-semibold text-oou-blue ${
                  activeTab === "manageUsers"
                    ? " bg-oou-purple font-semibold text-white rounded-4xl py-2 px-3 "
                    : ""
                }`}
                onClick={() => handleTabChange("manageUsers")}
              >
                Manage Users
              </button>
            </li>
            <li className="">
              <button
                className={` border-none font-semibold rounded-none text-oou-blue ${
                  activeTab === "editUserInfoForm"
                    ? " bg-oou-purple text-white font-semibold rounded-3xl py-2 px-3 "
                    : ""
                }`}
                onClick={() => handleTabChange("editUserInfoForm")}
              >
                Edit User
              </button>
            </li>
          </ul>

          <div className="mt-10  ">
            {activeTab === "manageUsers" && <ManageUsers />}
            {activeTab === "editUserInfoForm" && <EditUserInfoForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdmin;
