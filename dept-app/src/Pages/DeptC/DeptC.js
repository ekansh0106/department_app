import React from "react";
import Navbar from "../../Components/NavBar/NavBar";
import Dashboard from "../../Components/Dashboard/Dashboard";

function DeptC() {
  return (
    <div>
      <Navbar dept={"/deptC"} title={"Department C"} />
      <Dashboard user={"UserC"} />
    </div>
  );
}

export default DeptC;
