import React from "react";
import Navbar from "../../Components/NavBar/NavBar";
import Dashboard from "../../Components/Dashboard/Dashboard";

function DeptA() {
  return (
    <div>
      <Navbar dept={"/deptA"} title={"Department A"} />
      <Dashboard user={"Admin"} />
    </div>
  );
}

export default DeptA;
