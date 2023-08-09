import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import DeptA from "./Pages/DeptA/DeptA";
import DeptB from "./Pages/DeptB/DeptB";
import DeptC from "./Pages/DeptC/DeptC";
import Logout from "./Pages/Login/Logout";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./notfound";

const Routers = () => {
  const auth = useSelector((state) => state.Auth);
  console.log("auth.user.dept", auth.user.dept);

  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route element={<PrivateRoute isLogged={auth.isAuthenticated} />}>
        {auth.user.dept === "deptA" && (
          <Route exact path="/deptA" element={<DeptA />} />
        )}
        {auth.user.dept === "deptB" && (
          <Route exact path="/deptB" element={<DeptB />} />
        )}
        {auth.user.dept === "deptC" && (
          <Route exact path="/deptC" element={<DeptC />} />
        )}
      </Route>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route exact path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
