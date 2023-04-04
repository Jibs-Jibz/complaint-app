import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import complaintsData from "../../public/complaintsData.json";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ReportGenerator = () => {
  const generateReport = () => {
    const complaintsByCategory = {};
    const complaintsById = {};
    const complaintsByStatus = {};

    complaintsData.forEach((complaint) => {
      // count complaints by category
      if (complaint.category in complaintsByCategory) {
        complaintsByCategory[complaint.category]++;
      } else {
        complaintsByCategory[complaint.category] = 1;
      }

      // count complaints by id
      complaintsById[complaint.id] = complaint;

      // count complaints by status
      if (complaint.status in complaintsByStatus) {
        complaintsByStatus[complaint.status]++;
      } else {
        complaintsByStatus[complaint.status] = 1;
      }
    });

    const report = {
      content: [
        { text: "Complaints by Category", style: "header" },
        { text: "\n" },
        {
          ul: Object.entries(complaintsByCategory).map(([category, count]) => {
            return `${category}: ${count}`;
          }),
        },
        { text: "\n\n" },
        { text: "Complaints by ID", style: "header" },
        { text: "\n" },
        {
          ul: Object.entries(complaintsById).map(([id, complaint]) => {
            return `${id}: ${complaint.title} - ${complaint.category} - ${complaint.status}`;
          }),
        },
        { text: "\n\n" },
        { text: "Complaints by Status", style: "header" },
        { text: "\n" },
        {
          ul: Object.entries(complaintsByStatus).map(([status, count]) => {
            return `${status}: ${count}`;
          }),
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };

    pdfMake.createPdf(report).download("complaints_report.pdf");
  };

  return (
    <div>
      <button
        className=" bg-oou-blue font-bold text-white rounded-full py-4 px-8 hover:bg-oou-purple "
        onClick={generateReport}
      >
        Generate Report
      </button>
    </div>
  );
};

export default ReportGenerator;
