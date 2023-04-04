import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Step 1: Get the existing users data from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Step 2: Check if the user already exists
    const userExists = users.find((user) => user.email === formData.email);

    if (userExists) {
      alert("User already exists, please sign in instead.");
      return;
    }

    // Step 3: Add the new user to the users array
    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    users.push(newUser);

    // Step 4: Update the users data in localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Step 5: Reset the form data
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Step 6: Redirect the user to the login page
    navigate("/");
  };

  // Step 7: Redirect the user to the login page if they are already logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate("/");
    return null;
  }
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-2xl flex flex-col gap-4 rounded-lg bg-white shadow-lg p-8">
          <div className=" flex flex-col items-center justify-center ">
            <img src={logo} className="w-24 " alt="" />
            <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
          </div>
          <div className="text-xl">
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
              action=""
            >
              <div className="flex flex-col gap-2">
                <label
                  className="text-oou-blue font-bold text-xl"
                  htmlFor="firstname"
                >
                  First Name
                </label>
                <input
                  className="appearance-none border border-gray-400 rounded-lg py-3 px-4 w-full leading-tight focus:outline-none focus:border-oou-blue"
                  placeholder="Ajibola"
                  type="firstName"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-oou-blue font-bold text-xl"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none border border-gray-400 rounded-lg py-3 px-4 w-full leading-tight focus:outline-none focus:border-oou-blue"
                  placeholder="Osunkoya"
                  type="lastName"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-oou-blue font-bold text-xl"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  className="appearance-none border border-gray-400 rounded-lg py-3 px-4 w-full leading-tight focus:outline-none focus:border-oou-blue"
                  placeholder="osunkoyajibola@gmail.com"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-oou-blue font-bold text-xl"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  className="appearance-none border border-gray-400 rounded-lg py-3 px-4 w-full leading-tight focus:outline-none focus:border-oou-blue"
                  placeholder="********"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-oou-blue font-bold text-xl"
                  htmlFor="confirm-password"
                >
                  Confirm Password:
                </label>
                <input
                  className="appearance-none border border-gray-400 rounded-lg py-3 px-4 w-full leading-tight focus:outline-none focus:border-oou-blue"
                  placeholder="********"
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <button
                className="bg-oou-blue py-5 text-white text-xl rounded-2xl"
                type="submit"
              >
                Sign up
              </button>
            </form>
          </div>
          <div className="flex flex-row gap-2 justify-between items-center text-xl font-bold">
            <p className="text-center text-sm font-bold">
              Already have an account?
            </p>
            <Link className="text-oou-blue text-right" to="/">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-white"></div>
    </div>
  );
};

export default Signup;
