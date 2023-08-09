import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import Routers from "./Routers";
import { Layout } from "antd";

function App() {
  const { Footer } = Layout;
  return (
    <>
      <div
        style={{ width: "100%", height: "100%" }}
        className="main-page_style"
      >
        <Routers />
        <Layout className="site-layout">
          <Footer style={{ textAlign: "center" }}>
            Departments Application
          </Footer>
        </Layout>
      </div>
    </>
  );
}

export default App;
