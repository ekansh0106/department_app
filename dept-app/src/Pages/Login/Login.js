import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input, Layout, Card, Select } from "antd";
import { login } from "../../store/modules/auth/authActions";
// import { logout } from "../../store/modules/auth/authActions";
const { Content } = Layout;

function Login() {
  const auth = useSelector((state) => state.Auth);
  const error = useSelector((state) => state.Error);
  const dispatch = useDispatch();
  // const [login_error, setLoginError] = useState("");
  const [showError, setshowError] = useState(false);
  let navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(logout());
  // }, []);
  useEffect(() => {
    if (showError) {
      if (error.message !== null) {
        // setLoginError(error.message);
        document.getElementById("loginerror").style.opacity = "100";
        document.getElementById("loginerror").innerHTML = `${error.message}`;
      }
    }
  }, [error]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (auth.user["username"] === "deptA") {
        navigate(`/deptA`);
      } else if (auth.user["username"] === "deptB") {
        navigate(`/deptB`);
      } else if (auth.user["username"] === "deptC") {
        navigate(`/deptC`);
      }
    }
  }, [auth]);

  const onFinish = (values) => {
    dispatch(login(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleUsernameClick = () => {
    document.getElementById("loginerror").style.opacity = "0";
    setshowError(false);
  };

  const handleonClick = () => {
    setshowError(true);
  };

  return (
    <Layout
      style={{
        // backgroundImage: `url(${"login-background.jpg"})`,
        // backgroundSize: "cover",
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
      }}
    >
      <Content style={{ margin: "10%", display: "flex" }}>
        <Card
          title="Sign In"
          style={{
            height: 350,
            width: 400,
            marginLeft: "30%",
          }}
        >
          <Form
            size="middle"
            name="basic"
            labelCol={{
              span: 6,
              margin: 4,
            }}
            wrapperCol={{
              span: 17,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input onClick={handleUsernameClick} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password onClick={handleUsernameClick} />
            </Form.Item>
            <Form.Item
              label="Select"
              name="select"
              rules={[
                {
                  required: true,
                  message: "Please select your department",
                },
              ]}
            >
              <Select>
                <Select.Option value="deptA">A</Select.Option>
                <Select.Option value="deptB">B</Select.Option>
                <Select.Option value="deptC">C</Select.Option>
              </Select>
            </Form.Item>
            <p
              id="loginerror"
              style={{ color: "red", opacity: "0", marginLeft: "27px" }}
            >
              error
            </p>
            <Form.Item
              wrapperCol={{
                offset: 17,
                span: 16,
              }}
            >
              <Button onClick={handleonClick} type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}

export default Login;
