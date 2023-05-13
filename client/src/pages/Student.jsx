import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import LodgeComplaint from "../components/modal/LodgeComplaint";
import { nanoid } from "nanoid";
import StudentComplaintTable from "../components/StudentComplaintTable";

const Student = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    // perform logout logic here, e.g. clearing session storage, redirecting to login page, etc.
    navigate("/");
  };

  return (
    <div className="py-8">
      <div className="bg-slate-200 container mx-auto flex flex-col gap-8">
        <nav className="container mx-auto  py-4 px-6 lg:px-32 items-center justify-between flex flex-row bg-slate-200 shadow-md">
          <div>
            <img src={logo} className="w-24" alt="" />
          </div>
          <div className="flex flex-row text-lg lg:text-xl font-bold gap-4">
            <a href="#" className="text-gray-600 hover:text-oou-purple">
              Notifications
            </a>
            <a
              href="#"
              onClick={handleOpenModal}
              className="text-gray-600 hover:text-oou-purple"
            >
              Lodge Complaints
            </a>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </nav>

        <header className="inside-page mx-auto mt-36 flex justify-center bg-img">
          <div className="flex flex-col justify-center text-center items-center gap-12 self-center ">
            <h2 className=" flex flex-col text-3xl font-bold leading-tight">
              Welcome to the Complaint Management System,{" "}
              {/* <span className="text-oou-blue text-5xl">Ajibola Osunkoya</span> */}
            </h2>
            <p className=" max-w-[950px] text-lg">
              We're here to help you resolve your complaints quickly and easily.
              Simply lodge a complaint using the button below, and we'll do our
              best to address it as soon as possible.
            </p>
            <button
              className="bg-oou-purple text-white py-4 px-8 rounded-full shadow-md hover:bg-indigo-500 hover:text-white transition-all duration-300"
              onClick={handleOpenModal}
            >
              Lodge Complaint
            </button>
            {isModalOpen && (
              <LodgeComplaint handleCloseModal={handleCloseModal} />
            )}
          </div>
        </header>

        <main className=" mt-20 flex flex-col gap-8">
          <h2 className="flex flex-row justify-center text-3xl font-bold leading-tight">
            Previous Complaint
          </h2>
          <StudentComplaintTable />
        </main>
      </div>
    </div>
  );
};

export default Student;
