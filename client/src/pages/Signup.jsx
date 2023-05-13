import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../firebase";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .required("First Name is required"),
      lastName: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .required("Last Name is required"),
      email: Yup.string().required("Email is required").email(),
      password: Yup.string()
        .min(8, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password")]),
    }),
    onSubmit: async (values) => {
      try {
        const { firstName, lastName, email, password } = values;
        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await userCredential.user.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });
        // User is signed up and user document has been created in Firestore
        alert("Thanks for signing up, now press okay to go to the SignIn page");
        window.location.href = "/";
      } catch (error) {
        console.error(error);
        if (error.code === "auth/email-already-in-use") {
          alert("User already exists");
          window.location.href = "/"; // Take them to the sign-in page
        }
      }
    },
  });

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-2xl flex flex-col gap-4 rounded-lg bg-white shadow-lg p-8">
          <div className=" flex flex-col items-center justify-center ">
            <img src={logo} className="w-24 " alt="" />
            <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
          </div>
          <Formik {...formik}>
            <form
              className="flex flex-col gap-6"
              onSubmit={formik.handleSubmit}
            >
              <label className="flex flex-col gap-2 text-oou-blue font-bold text-xl">
                First Name
                <input
                  className=" appearance-none border border-gray-400 rounded-lg py-3 px-4 w-full leading-tight focus:outline-none focus:border-oou-blue"
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500">{formik.errors.firstName}</div>
                ) : null}
              </label>
              <label className="flex flex-col gap-2 text-oou-blue font-bold text-xl">
                Last Name
                <input
                  className=" appearance-none border border-gray-400 rounded-lg py-3 px-4 w-full leading-tight focus:outline-none focus:border-oou-blue"
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500">{formik.errors.lastName}</div>
                ) : null}
              </label>
              <label className="flex flex-col gap-2 text-oou-blue font-bold text-xl">
                Email
                <input
                  className=" appearance-none border border-gray-400 rounded-lg py-3 px-4 w-full leading-tight focus:outline-none focus:border-oou-blue"
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </label>
              <label className="flex flex-col gap-2 text-oou-blue font-bold text-xl">
                Password
                <input
                  className=" appearance-none border border-gray-400 rounded-lg py-3 px-4 w-full leading-tight focus:outline-none focus:border-oou-blue"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
              </label>
              <label className="flex flex-col gap-2 text-oou-blue font-bold text-xl">
                Confirm Password
                <input
                  className=" appearance-none border border-gray-400 rounded-lg py-3 px-4 w-full leading-tight focus:outline-none focus:border-oou-blue"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  {...formik.getFieldProps("confirmPassword")}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-500">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </label>

              <button
                className="bg-oou-blue py-5 text-white text-xl rounded-2xl relative"
                type="submit"
              >
                {formik.isSubmitting && (
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4zm4-7.291A7.962 7.962 0 0120 12h-4c0 3.042-1.135 5.824-3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                )}
                {!formik.isSubmitting && "Sign up"}
              </button>
            </form>
          </Formik>
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
