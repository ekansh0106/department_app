import "./NavBar.css";
import { Layout, Menu, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
// import { useSelector } from "react-redux";

const { Header } = Layout;

function Navbar(props) {
  //   const auth = useSelector((state) => state.Auth);
  const [href, sethref] = useState(window.location.href.split("/")[3]);

  var handleMenu = (e) => {
    sethref(props.dept);
  };

  const items = [
    {
      label: "Settings",
      key: "sub1",
      icon: <UserOutlined />,
      children: [
        {
          label: "Basic Settings",
          key: null,
          type: "group",
          children: [
            {
              label: (
                <Link id="submenu" to="/logout">
                  Signout
                </Link>
              ),
              key: "setting:1",
            },
          ],
        },
      ],
    },
  ];

  return (
    <Layout>
      <Header
        className="header"
        style={{
          zIndex: 1,
          width: "100%",
          display: "flex",
          background: "#fff",
        }}
      >
        <Row style={{ width: "100%" }}>
          <Col span={2} style={{ textAlign: "center" }}>
            <Link to={props.dept}>
              <img
                style={{ width: "60px" }}
                className="logo"
                src={"dept-logo.png"}
                alt="DEPT"
              />
            </Link>
          </Col>
          <Col span={10}>
            <span style={{ fontSize: "20px" }}>{props.title}</span>
          </Col>
          <Col span={4} offset={8}>
            <Menu
              mode="horizontal"
              theme="light"
              defaultSelectedKeys={props.dept}
              selectedKeys={href}
              style={{ width: "100%", marginLeft: "30px" }}
              onClick={handleMenu}
              items={items}
            ></Menu>
          </Col>
        </Row>
      </Header>
    </Layout>
  );
}

export default Navbar;
