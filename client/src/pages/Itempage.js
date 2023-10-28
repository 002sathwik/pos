import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Modal, Button, Table, Input, Select, message } from "antd";

const Itempage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setpopupMOdal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getAllItems = async () => {
    // Add the "async" keyword here
    try {
      const { data } = await axios.get("/api/items/get-item");
      setItemsData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);
  const handleDelete = async (record) => {
    try {
      const url = `/api/items/delete-item/${record._id}`; // Include the item ID in the URL
      await axios.delete(url);
      message.success("Item deleted");
      getAllItems();
    } catch (error) {
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  //Table data
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="incredecre">
          <EditOutlined
            className="mx-3"
            onClick={() => {
              setEditItem(record);
              setpopupMOdal(true);
            }}
          />
          <DeleteOutlined
            className="mx-3"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];
  //handeling submit taking ibput from form
  const handelSubmit = async (values) => {
    if (editItem === null) {
      try {
        await axios.post("/api/items/add-item", values);
        message.success("Item Added");
        getAllItems();
        setpopupMOdal(false);
      } catch (error) {
        message.error("Something Went Wrong");
        console.log(error);
      }
    } else {
      try {
        const url = `/api/items/edit-item/${editItem._id}`; // Include itemId in the URL
        await axios.put(url, values);
        message.success("Item Updated");
        getAllItems();
        setpopupMOdal(false);
      } catch (error) {
        message.error("Something Went Wrong");
        console.log(error);
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>ITEM_LIST</h1>
        <Button type="primary" onClick={() => setpopupMOdal(true)}>
          ADD-ITEM
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered className="Billtable" />
      {popupModal && (
        <Modal
          title={`${editItem !== null ? "EDIT-ITEM" : "ADD_NEW_ITEM"}`}
          visible={popupModal}
          onCancel={() => {
            setEditItem(null);
            setpopupMOdal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handelSubmit}
          >
            <Form.Item name="name" label="NAME">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="PRICE">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="IMAGE_URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="CATEGORY">
              <Select>
                <Select.Option value="drinks">DRINKS</Select.Option>
                <Select.Option value="chinies">CHINIES</Select.Option>
                <Select.Option value="northsouth">NORTHSOUTH</Select.Option>
                <Select.Option value="Chats">CHATS</Select.Option>
                <Select.Option value="SnacksBevegers">SNACKS@BEVEGRES</Select.Option>
                <Select.Option value="IceCream">ICE-CREAM</Select.Option>
              </Select>
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

export default Itempage;
