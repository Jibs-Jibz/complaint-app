import React, { useState } from "react";

const LodgeComplaint = ({ handleCloseModal }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentYear: "",
    phone: "",
    matricNo: "",
    reportTo: "",
    title: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataInstance = new FormData(document.querySelector("form"));

    const firstName = formDataInstance.get("firstName");
    const lastName = formDataInstance.get("lastName");
    const email = formDataInstance.get("email");
    const studentYear = formDataInstance.get("studentYear");
    const phone = formDataInstance.get("phone");
    const matricNo = formDataInstance.get("matricNo");
    const reportTo = formDataInstance.get("reportTo");
    const title = formDataInstance.get("title");
    const description = formDataInstance.get("description");

    fetch("/complaintsData.json")
      .then((response) => response.json())
      .then((data) => {
        const newComplaint = {
          id: data.complaints.length + 1,
          firstName: firstName,
          lastName: lastName,
          email: email,
          studentYear: studentYear,
          phone: phone,
          matricNo: matricNo,
          reportTo: reportTo,
          title: title,
          description: description,
          status: "pending",
        };
        const updatedComplaints = [...data.complaints, newComplaint];
        const updatedData = { ...data, complaints: updatedComplaints };
        fetch("/complaintsData.json", {
          method: "PUT",
          body: JSON.stringify(updatedData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              studentYear: "",
              phone: "",
              matricNo: "",
              reportTo: "",
              title: "",
              description: "",
            });
          })
          .catch((error) => {
            setIsSubmitting(false);
            setSubmitError(true);
          });
      })
      .catch((error) => {
        setIsSubmitting(false);
        setSubmitError(true);
      });
    handleCloseModal();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={handleCloseModal}
            >
              <svg
                className="h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M18.293 5.293a1 1 0 011.414 1.414L6.414 19.414a1 1 0 01-1.414-1.414L18.293 5.293z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M5.707 5.293a1 1 0 00-1.414 1.414L17.586 19.414a1 1 0 001.414-1.414L5.707 5.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex flex-col justify-center self-center sm:flex sm:items-start">
              <div className=" flex flex-col gap-8 py-8 justify-center self-center mt-3 text-center sm:mt-0 sm:text-left">
                <h3
                  className="text-black text-center text-2xl font-bold"
                  id="modal-headline"
                >
                  Lodge a complaint
                </h3>
                <div className="flex flex-col gap-12  ">
                  <form onSubmit={handleSubmit}>
                    <div className=" flex flex-col flex-wrap  ">
                      <div className="flex flex-row flex-wrap gap-3 justify-between">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            autoComplete="given-name"
                            onChange={handleChange}
                            required
                            className="mt-1 p-1 border border-oou-purple rounded-sm focus:outline-none focus:ring-2 focus:ring-oou-blue focus:border-transparent"
                            value={formData.firstName}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last Name
                          </label>
                          <input
                            value={formData.lastName}
                            type="text"
                            name="lastName"
                            id="lastName"
                            autoComplete="family-name"
                            onChange={handleChange}
                            required
                            className="mt-1 p-1 border border-oou-purple rounded-sm focus:outline-none focus:ring-2 focus:ring-oou-blue focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-between">
                        <div className="w-3/4 pr-5">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email Address
                          </label>
                          <input
                            value={formData.email}
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            onChange={handleChange}
                            required
                            className="mt-1 p-1 border border-oou-purple rounded-sm w-full"
                          />
                        </div>
                        <div className="w-1/4">
                          <label
                            htmlFor="studentYear"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Student Year
                          </label>
                          <input
                            value={formData.studentYear}
                            type="text"
                            name="studentYear"
                            id="studentYear"
                            onChange={handleChange}
                            required
                            className="mt-1 p-1 border border-oou-purple rounded-sm w-full"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-between">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone Number
                          </label>
                          <input
                            value={formData.phone}
                            type="text"
                            name="phone"
                            id="phone"
                            onChange={handleChange}
                            required
                            className="mt-1 p-1 border border-oou-purple rounded-sm focus:outline-none focus:ring-2 focus:ring-oou-blue focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="matricNo"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Matriculation Number
                          </label>
                          <input
                            value={formData.matricNo}
                            type="text"
                            name="matricNo"
                            id="matricNo"
                            onChange={handleChange}
                            required
                            className="mt-1 p-1 border border-oou-purple rounded-sm focus:outline-none focus:ring-2 focus:ring-oou-blue focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row gap-4 justify-between">
                        <div className=" w-3/4 flex flex-col ">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Title
                          </label>
                          <input
                            value={formData.title}
                            type="text"
                            name="title"
                            id="title"
                            onChange={handleChange}
                            required
                            className="mt-1 p-1 border border-oou-purple rounded-sm focus:outline-none focus:ring-2 focus:ring-oou-blue focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="reportTo"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Report To
                          </label>
                          <select
                            value={formData.reportTo}
                            id="reportTo"
                            name="reportTo"
                            className="mt-1 p-1 border border-oou-purple rounded-sm focus:outline-none focus:ring-2 focus:ring-oou-blue focus:border-transparent"
                            onChange={handleChange}
                          >
                            <option value="A">Mr A</option>
                            <option value="B">Mr B</option>
                            <option value="C">Mr C</option>
                            <option value="D">Mr D</option>
                            <option value="E">Mr E</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="complaintDesc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Complaint Description
                      </label>
                      <textarea
                        value={formData.description}
                        type="text"
                        name="description"
                        id="description"
                        autoComplete="none"
                        onChange={handleChange}
                        required
                        className="mt-1 p-1 border border-oou-purple rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-oou-blue focus:border-transparent"
                        // value={formData.description}
                      ></textarea>
                    </div>
                    {isSubmitting && (
                      <p className="text-blue-500">Sending complaint...</p>
                    )}
                    {submitSuccess && (
                      <p className="text-green-500">
                        Complaint submitted successfully!
                      </p>
                    )}
                    {submitError && (
                      <p className="text-red-500">
                        Error submitting complaint. Please try again later.
                      </p>
                    )}
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#130FC2",
                        color: "#fff",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.25rem",
                        transition: "all 0.3s ease",
                      }}
                      hover={{
                        backgroundColor: "#fff",
                        color: "#8B008B",
                        border: "1px solid #8B008B",
                      }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LodgeComplaint;
