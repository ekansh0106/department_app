import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/modules/auth/authActions";

function Logout() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(logout());
    navigate(`/login`);
  }, []);

  return <h5>User Logged out</h5>;
}

export default Logout;
