import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

const NotFound = () => {
  const auth = useSelector((state) => state.Auth);
  return (
    <div>
      <Result
        style={{
          height: "100vh",
          overflow: "auto",
        }}
        key={404}
        status="404"
        title="Not Found 404"
        subTitle="Page not found"
        extra={
          <Button type="primary">
            {auth.user.dept ? (
              <Link
                to={auth.user.dept}
                style={{ textDecoration: "none" }}
                onClick={() => window.target.href}
              >
                Back To Dashboard
              </Link>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                Back To Login
              </Link>
            )}
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
