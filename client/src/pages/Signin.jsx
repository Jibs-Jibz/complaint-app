import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../firebase";

const Signin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required").email(),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, event) => {
      try {
        setIsLoading(true); // set isLoading state to true
        await auth.signInWithEmailAndPassword(values.email, values.password);
        navigate("/student");
      } catch (error) {
        console.error(error);
        // Handle sign-in errors here
        if (error.code === "auth/wrong-password") {
          setLoginError("Incorrect Password");
        } else {
          setLoginError(
            "An error occurred while signing in. Please try again later."
          );
        }
      } finally {
        setIsLoading(false); // set isLoading state back to false
      }
    },
  });
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className=" flex flex-col gap-4 w-full max-w-sm rounded-lg bg-white shadow-lg p-8">
          <div className="text-center">
            <img src={logo} className="w-24 mx-auto mb-8" alt="" />
            <h1 className="text-3xl font-bold mb-4">Sign In</h1>
          </div>
          <Formik {...formik}>
            <form
              className=" flex flex-col gap-4 "
              onSubmit={formik.handleSubmit}
            >
              <label className="mb-6 text-oou-blue font-bold text-xl">
                Email
                <input
                  className="appearance-none border border-gray-400 rounded-lg py-3 px-4 w-full leading-tight focus:outline-none focus:border-oou-blue"
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </label>
              <label className="mb-6 text-oou-blue font-bold text-xl">
                Password
                <input
                  className="appearance-none border border-gray-400 rounded-lg py-3 px-4 w-full leading-tight focus:outline-none focus:border-oou-blue"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
              </label>
              {loginError ? (
                <div className="text-red-500">{loginError}</div>
              ) : null}
              <div className="flex justify-between items-center mb-6">
                <button className="text-oou-blue text-sm font-bold" href="#">
                  Forgot password?
                </button>
                <button
                  className="bg-oou-blue text-white py-3 px-6 rounded-lg font-bold"
                  type="submit"
                  disabled={isLoading} // disable the button when loading
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <div className="w-6 h-6 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
          </Formik>
          <div className="text-center text-sm font-bold">
            <p>Don’t have an account?</p>
            <Link className="text-oou-blue" to="/sign-up">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signin;
