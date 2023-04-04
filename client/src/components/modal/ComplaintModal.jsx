import React, { useState } from "react";
import "./ComplaintModal.css";

const ComplaintModal = ({
  complaint,
  showModal,
  setShowModal,
  onHide,
  onStatusChange,
}) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [status, setStatus] = useState(complaint.status);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    onStatusChange(complaint.id, e.target.value);
  };
  return (
    <>
      <div className="complaint-modal" show={true} onHide={onHide}>
        <span className="close-button" onClick={handleCloseModal}>
          &times;
        </span>

        <div className="modal-content">
          <h2 className="modal-title ">{complaint.title}</h2>
          <div class="relative flex ">
            <label class=" modal-body-title font-semibold" for="status">
              Status:
            </label>
            <select
              id="status"
              value={status}
              onChange={handleStatusChange}
              class="form-select block w-26 pr-10 py-2 pl-3 text-base leading-6 border-slate-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            >
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className=" modal-body ">
            <p>
              <strong className=" modal-body-title ">Date Created:</strong>{" "}
              {complaint.dateCreated}
            </p>
            <p>
              <strong className=" modal-body-title ">Name:</strong>{" "}
              {complaint.firstName} {complaint.lastName}
            </p>
            <p>
              <strong className=" modal-body-title ">Email:</strong>{" "}
              {complaint.email}
            </p>
            <p>
              <strong className=" modal-body-title ">Student Year:</strong>{" "}
              {complaint.studentYear}
            </p>
            <p>
              <strong className=" modal-body-title ">Phone:</strong>{" "}
              {complaint.phone}
            </p>
            <p>
              <strong className=" modal-body-title ">Report To:</strong>{" "}
              {complaint.reportTo}
            </p>
            <p>
              <strong className=" modal-body-title ">Description:</strong>{" "}
              {complaint.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintModal;
