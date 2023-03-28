import React, { useState, useEffect } from "react";
import "./StudentComplaintTable.css"; // Import the CSS file for this component
import ComplaintModal from "./modal/ComplaintModal";

const StudentComplaintTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("complaintsData.json");
      const data = await response.json();
      setComplaints(data); // set the initial data as complaints
      setFilteredComplaints(data); // set the initial data as filtered complaints
    };
    fetchData();
  }, []);

  useEffect(() => {
    // update the filtered complaints whenever the selected option or search query changes
    const filtered = complaints.filter((complaint) => {
      const complaintDate = new Date(complaint.dateCreated);
      const currentDate = new Date();
      const daysDiff = Math.ceil(
        (currentDate.getTime() - complaintDate.getTime()) / (1000 * 3600 * 24)
      );
      const matchesSearch = complaint.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      switch (selectedOption) {
        case "7 Days":
          return matchesSearch && daysDiff <= 7;
        case "Past Month":
          return matchesSearch && daysDiff <= 30;
        case "Past 6 Months":
          return matchesSearch && daysDiff <= 180;
        case "Past Year":
          return matchesSearch && daysDiff <= 365;
        default:
          return matchesSearch;
      }
    });
    setFilteredComplaints(filtered);
  }, [complaints, selectedOption, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOptionChange = (e) => {
    if (e.target.value === "All") {
      setSelectedOption("");
      setFilteredComplaints(complaints);
    } else {
      setSelectedOption(e.target.value);
      const filtered = complaints.filter((complaint) => {
        const date = new Date(complaint.dateCreated);
        const daysAgo = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
        switch (e.target.value) {
          case "7 Days":
            return daysAgo <= 7;
          case "Past Month":
            return daysAgo <= 30;
          case "Past 6 Months":
            return daysAgo <= 180;
          case "Past Year":
            return daysAgo <= 365;
          default:
            return true;
        }
      });
      setFilteredComplaints(filtered);
    }
  };

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className=" flex flex-col gap-10 mx-auto container border-2 py-[50px] px-[15px] rounded-2xl border-[#D9D9D9] ">
        <div className=" flex flex-row gap-4 justify-between rounded-xl ">
          <div className=" w-full max-w-[816px] flex flex-row items-center pl-[10px] gap-2 text-xl border-2 rounded-xl border-[#D9D9D9] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#130FC2"
                d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"
              />
            </svg>
            <input
              type="text"
              className=" w-full pl-4 py-4 border-[#D9D9D9] rounded-xl "
              placeholder="Search for Complaint"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <select
            className="max-w-[180px] w-full flex flex-row px-6 py-4 border-[#D9D9D9] border-2 rounded-xl"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">All</option>
            <option value="7 Days">Last 7 days</option>
            <option value="Past Month">Past month</option>
            <option value="Past 6 Months">Past 6 months</option>
            <option value="Past Year">Past year</option>
          </select>
        </div>
        <section>
          <table>
            <thead style={{ backgroundColor: "#130FC2" }}>
              <tr style={{ borderRadius: "10px" }}>
                <th
                  style={{
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                  className="sn-col"
                >
                  S/N
                </th>
                <th className="title-com-col">Complaint Title</th>
                <th
                  style={{
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                  className="date-col"
                >
                  Date Created
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint, index) => (
                <tr
                  key={complaint.id}
                  onClick={() => {
                    setSelectedComplaint(complaint);
                    setShowModal(true);
                  }}
                  style={{
                    backgroundColor:
                      showModal && complaint.id === selectedComplaint.id
                        ? "#ababab"
                        : "",
                  }}
                >
                  <td className="sn-col">{index + 1}</td>
                  <td className="title-col">{complaint.title}</td>
                  <td>{complaint.dateCreated}</td>
                </tr>
              ))}
            </tbody>
            {showModal && (
              <ComplaintModal
                complaint={selectedComplaint}
                setShowModal={setShowModal}
              />
            )}
          </table>
        </section>

        <div>You have selected: {selectedOption ? selectedOption : "All"}</div>
      </div>
    </>
  );
};

export default StudentComplaintTable;
