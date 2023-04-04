import { React, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import backgroundImage from "../assets/oou-bg.png";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Submit the form data to your backend API or perform other actions
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-sm rounded-lg bg-white shadow-lg p-8">
          <div className="text-center">
            <img src={logo} className="w-24 mx-auto mb-8" alt="" />
            <h1 className="text-3xl font-bold mb-4">Sign In</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="text-oou-blue font-bold text-xl"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="appearance-none border border-gray-400 rounded-lg py-3 px-4 w-full leading-tight focus:outline-none focus:border-oou-blue"
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-oou-blue font-bold text-xl"
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
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <a className="text-oou-blue text-sm font-bold" href="#">
                Forgot password?
              </a>
              <Link
                className="bg-oou-blue text-white py-3 px-6 rounded-lg font-bold"
                // type="submit"
                to="/student"
              >
                Sign In
              </Link>
            </div>
            <div className="text-center text-sm font-bold">
              <p>Don’t have an account?</p>
              <Link className="text-oou-blue" to="/sign-up">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signin;
