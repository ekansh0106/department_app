import React from "react";
import Navbar from "../../Components/NavBar/NavBar";
import Dashboard from "../../Components/Dashboard/Dashboard";

function DeptB() {
  return (
    <div>
      <Navbar dept={"/deptB"} title={"Department B"} />
      <Dashboard user={"UserB"} />
    </div>
  );
}

export default DeptB;
