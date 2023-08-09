import { Row, Col, Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import Tabledata from "../Tabledata/Tabledata";

function Dashboard(props) {
  return (
    <div>
      <Layout className="site-layout">
        <Content
          id="content-box"
          style={{
            margin: "60px",
            background: "#fff",
            minHeight: "400px",
            padding: "30px 30px",
          }}
        >
          <Row>
            <Col span={6}>
              <div style={{ fontSize: "14px" }}>Welcome {props.user}</div>
            </Col>
          </Row>
          <Row>
            <Col span={20} offset={2}>
              {props.user === "Admin" && (
                <Tabledata button={"Add Device"} useraction={"Add"} />
              )}
              {props.user === "UserB" && (
                <Tabledata button={"Forward Devices"} useraction={"Use"} />
              )}
              {props.user === "UserC" && (
                <Tabledata button={"Cleared Device"} useraction={"Clear"} />
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default Dashboard;
