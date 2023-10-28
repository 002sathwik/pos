import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { EyeOutlined } from "@ant-design/icons";
import { Form, Modal, Button, Table, Input, message } from "antd";

const BillPage = () => {
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    try {
      const { data } = await axios.get("/api/bills/get-bills");
      setBillsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "userId" },
    { title: "Customer Name", dataIndex: "customerName" },
    { title: "Mobile", dataIndex: "mobile" },
    { title: "Subtotal", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="incredecre">
          <EyeOutlined
            className="mx-3"
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async (values) => {
    try {
      const url = `/api/bills/edit-bill/${selectedBill._id}`;
      await axios.put(url, values);
      message.success("Bill Updated");
      getAllBills();
      setPopupModal(false);
    } catch (error) {
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>BILL_LIST</h1>
      </div>
      <Table
        columns={columns}
        dataSource={billsData}
        bordered
        className="Billtable"
      />
      {popupModal && (
        <Modal
          title={ "INVOICE" }
          visible={popupModal}
          onCancel={() => {
            setSelectedBill(null);
            setPopupModal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={selectedBill}
            onFinish={handleSubmit}
          >
            <Form.Item name="customerName" label="Customer Name">
              <Input />
            </Form.Item>
            <Form.Item name="mobile" label="Mobile">
              <Input />
            </Form.Item>
            <Form.Item name="totalAmount" label="Total Amount">
              <Input />
            </Form.Item>
            <Form.Item name="subTotal" label="Subtotal">
              <Input />
            </Form.Item>
            <Form.Item name="tax" label="Tax">
              <Input />
            </Form.Item>
            <Form.Item name="paymentmode" label="Payment Mode">
              <Input />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillPage;
