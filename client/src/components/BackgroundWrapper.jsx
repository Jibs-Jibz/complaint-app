import React from "react";
import backgroundImage from "../assets/oou-bg.png";

const BackgroundWrapper = ({ children }) => {
  return (
    <div
      className="bg-oou-bg bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(
      184.69deg,
      rgba(0, 0, 0, 0.47) 49.24%,
      rgba(19, 15, 194, 0.47) 58.12%
    ), url(${backgroundImage})`,
        minHeight: "100vh", // add this line
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;
