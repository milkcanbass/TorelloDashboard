import React from "react";
import ColumnArea from "../components/ColumnArea";
import Navbar from "./Navbar";

const DashBoard = () => {
  console.log("triggred1");
  return (
    <div>
      <Navbar />
      <ColumnArea />
    </div>
  );
};

export default DashBoard;
