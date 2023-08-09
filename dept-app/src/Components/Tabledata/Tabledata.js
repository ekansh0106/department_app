import {
  Button,
  Table,
  Modal,
  Input,
  Form,
  Row,
  Col,
  message,
  InputNumber,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnB } from "../columns";
import {
  fetchDEPTA,
  deleteDEPTA,
} from "../../store/modules/deptA/deptAActions";
import {
  fetchDEPTB,
  forwardDEPTB,
} from "../../store/modules/deptB/deptBActions";
import {
  fetchDEPTC,
  forwardDEPTC,
} from "../../store/modules/deptC/deptCActions";

function Tabledata(props) {
  const dispatch = useDispatch();
  const device = useSelector((state) => state.DeptA);
  const deviceB = useSelector((state) => state.DeptB);
  const deviceC = useSelector((state) => state.DeptC);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState();
  const [dataSourceB, setDataSourceB] = useState();
  const [dataSourceC, setDataSourceC] = useState();

  // const [count, setCount] = useState();

  // const data = [];
  // for (let i = 1; i < 46; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edward King ${i}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${i}`,
  //   });
  // }

  useEffect(() => {
    props.useraction === "Add" && dispatch(fetchDEPTA());
    props.useraction === "Use" && dispatch(fetchDEPTB());
    props.useraction === "Clear" && dispatch(fetchDEPTC());
  }, []);

  useEffect(() => {
    setDataSource(
      device.devices.map((row) => ({
        key: row.device_name,
        device_name: row.device_name,
        device_type: row.device_type,
        current_location: row.current_location,
        total_cycles: row.total_cycles,
        cycles_left: row.cycles_left,
      }))
    );
    console.log("datasource", device.devices);
  }, [device.devices]);

  useEffect(() => {
    if (deviceB.devices) {
      setDataSourceB(
        deviceB.devices.map((row) => ({
          key: row.device_name,
          device_name: row.device_name,
          device_type: row.device_type,
          total_cycles: row.total_cycles,
          cycles_left: row.cycles_left,
        }))
      );
    }
    console.log("datasourceB", deviceB.devices);
  }, [deviceB.devices]);
  useEffect(() => {
    if (deviceC.devices) {
      setDataSourceC(
        deviceC.devices.map((row) => ({
          key: row.device_name,
          device_name: row.device_name,
          device_type: row.device_type,
          total_cycles: row.total_cycles,
          cycles_left: row.cycles_left,
        }))
      );
    }
    console.log("datasourceC", deviceC.devices);
  }, [deviceC.devices]);

  useEffect(() => {
    if (device.devicesError != null) {
      message.error(device.devicesError);
    }
  }, [device.devicesError]);

  const columns = [
    {
      title: "Name",
      dataIndex: "device_name",
    },
    {
      title: "Type",
      dataIndex: "device_type",
    },
    {
      title: "Current Location",
      dataIndex: "current_location",
    },
    {
      title: "Total Cycles",
      dataIndex: "total_cycles",
    },
    {
      title: "Cycles Left",
      dataIndex: "cycles_left",
    },

    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddStudent = () => {
    // const randomNumber = parseInt(Math.random() * 1000);
    setIsEditing(true);
    // const newStudent = {
    //   id: randomNumber,
    //   name: "Name " + randomNumber,
    //   email: randomNumber + "@gmail.com",
    //   address: "Address " + randomNumber,
    // };
    // setDataSource((pre) => {
    //   return [...pre, newStudent];
    // });
  };
  const onDeleteStudent = (record) => {
    Array.isArray(record)
      ? Modal.confirm({
          title: "Are you sure, you want to delete these records?",
          okText: "Yes",
          okType: "danger",
          onOk: () => {
            dispatch(deleteDEPTA(record));
            // setDataSource((pre) => {
            //   return pre.filter(
            //     (device) => !record.find((x1) => device.name === x1.name)
            //   );
            // });
            setSelectedRowKeys([]);
          },
        })
      : Modal.confirm({
          title: "Are you sure, you want to delete this student record?",
          okText: "Yes",
          okType: "danger",
          onOk: () => {
            dispatch(deleteDEPTA([record]));
            // setDataSource((pre) => {
            //   return pre.filter((device) => device.name !== record.name);
            // });
            console.log("record deleted", record);
          },
        });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  const handleAdd = () => {
    // console.log("count", count);
    // setCount(count + 1);
    // editingStudent["key"] = editingStudent["name"];
    console.log("editingStudent", editingStudent);
    dispatch(fetchDEPTA(editingStudent));
    // setDataSource((pre) => {
    //   return [...pre, editingStudent];
    // });
    resetEditing();
    // form.submit();
    form.resetFields();
  };
  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 500);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    // console.log(
    //   "map",
    //   newSelectedRowKeys.map((x) => x)
    // );
    // console.log(
    //   "filter",
    //   data.filter((x) => newSelectedRowKeys.find((x1) => x.key === x1))
    // );
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  // console.log("object", editingStudent);
  const [form] = Form.useForm();
  const ForwardToDeptC = () => {
    dispatch(forwardDEPTB(selectedRowKeys));
    setSelectedRowKeys([]);
  };
  const ForwardToDeptB = () => {
    dispatch(forwardDEPTC(selectedRowKeys));
    setSelectedRowKeys([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        {props.useraction === "Add" && (
          <>
            <Row
              style={{
                marginTop: "30px",
                marginBottom: "10px",
              }}
            >
              <Col span={12} offset={0}>
                <Button
                  type="primary"
                  onClick={start}
                  disabled={!hasSelected}
                  loading={loading}
                >
                  Reload
                </Button>
              </Col>

              <Col span={4} offset={4} style={{ textAlign: "right" }}>
                {selectedRowKeys.length > 1 && (
                  <Button
                    danger
                    style={{
                      marginLeft: 8,
                    }}
                    onClick={() => {
                      onDeleteStudent(
                        dataSource.filter((x) =>
                          selectedRowKeys.find((x1) => x.key === x1)
                        )
                      );
                    }}
                  >
                    {`Delete ${selectedRowKeys.length} devices`}
                  </Button>
                )}
              </Col>

              <Col span={4} offset={0} style={{ textAlign: "right" }}>
                <Button type="primary" onClick={onAddStudent}>
                  {props.button}
                </Button>
              </Col>
            </Row>

            <Table
              loading={device.isLoading}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={dataSource}
            ></Table>
            <Modal
              title="Enter details"
              visible={isEditing}
              footer={null}
              onCancel={() => {
                resetEditing();
                form.resetFields();
              }}
            >
              <Form form={form} onFinish={handleAdd}>
                <Form.Item
                  label="Enter Device Name"
                  name="Devicename"
                  rules={[
                    {
                      required: true,
                      message: "Please input Device Name!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setEditingStudent((pre) => {
                        return { ...pre, device_name: e.target.value };
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Enter Device type"
                  name="device type"
                  rules={[
                    {
                      required: true,
                      message: "Please input Device Type!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setEditingStudent((pre) => {
                        return { ...pre, device_type: e.target.value };
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Enter Total cycles"
                  name="cycles"
                  rules={[
                    {
                      type: "number",
                      required: true,
                      message: "Please input number of total cycles!",
                    },
                  ]}
                >
                  <InputNumber
                    onChange={(e) => {
                      console.log(e);
                      setEditingStudent((pre) => {
                        return {
                          ...pre,
                          total_cycles: e,
                          cycles_left: e,
                        };
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 20,
                    span: 4,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </>
        )}
        {props.useraction === "Use" && (
          <>
            <Row
              style={{
                marginTop: "30px",
                marginBottom: "10px",
              }}
            >
              <Col span={12} offset={0}>
                <Button
                  type="primary"
                  onClick={start}
                  disabled={!hasSelected}
                  loading={loading}
                >
                  Reload
                </Button>
              </Col>
              <Col span={4} offset={8} style={{ textAlign: "right" }}>
                {selectedRowKeys.length > 0 && (
                  <Button type="primary" onClick={ForwardToDeptC}>
                    {props.button}
                  </Button>
                )}
              </Col>
            </Row>
            <Table
              loading={deviceB.isLoading}
              rowSelection={rowSelection}
              columns={ColumnB}
              dataSource={dataSourceB}
            ></Table>
          </>
        )}
        {props.useraction === "Clear" && (
          <>
            <Row
              style={{
                marginTop: "30px",
                marginBottom: "10px",
              }}
            >
              <Col span={12} offset={0}>
                <Button
                  type="primary"
                  onClick={start}
                  disabled={!hasSelected}
                  loading={loading}
                >
                  Reload
                </Button>
              </Col>
              <Col span={4} offset={8} style={{ textAlign: "right" }}>
                {selectedRowKeys.length > 0 && (
                  <Button type="primary" onClick={ForwardToDeptB}>
                    {props.button}
                  </Button>
                )}
              </Col>
            </Row>
            <Table
              loading={deviceC.isLoading}
              rowSelection={rowSelection}
              columns={ColumnB}
              dataSource={dataSourceC}
            ></Table>
          </>
        )}
      </header>
    </div>
  );
}

export default Tabledata;
