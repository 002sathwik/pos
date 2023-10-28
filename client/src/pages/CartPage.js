import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { PlusCircleOutlined } from "@ant-design/icons";
import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Table,  Form, Input, Select,message } from "antd";
import  axios from 'axios';
import {useNavigate}  from "react-router-dom";

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setbillPopup] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.rootReducer);

  //handel incremnet button
  const HandelIncrement = (record) => {
    dispatch({
      type: "UPDATE_ITEM",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };
  const HandelDecrement = (record) => {
    if (record.quantity > 1) {
      dispatch({
        type: "DELETE_ITEM",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

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
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        //HANDLING INCREMENT ADN DECREMNET OF PERTICULAR ITEM
        <div>
          <PlusCircleOutlined
            className="mx-3 incredecre"
            //CLICK FUNCTION TARGENTING UP
            onClick={() => HandelIncrement(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3 incredecre"
            onClick={() => HandelDecrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          className="incredecre"
          onClick={() =>
            dispatch({
              type: "DELTE_FROM_CART",
              payload: record,
            })
          }
        />
      ),
    },
  ];
  //   iteratioin for counting product and quantity
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);
  const navigate = useNavigate();
  //handel submit

const handelSubmit = async (value) => {
  try {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (!authData || !authData._id) {
      throw new Error("User information not found in localStorage.");
    }

    // Clean the mobile number to remove spaces and convert it to a number
    const cleanedMobile = value.mobile.replace(/\s/g, ''); // Remove spaces
    const mobileNumber = parseInt(cleanedMobile, 10); // Convert to number

    if (isNaN(mobileNumber)) {
      throw new Error("Invalid mobile number.");
    }

    const newObject = {
      ...value,
      cartItems,
      subTotal,
      tax: Number(((subTotal / 100) * 10).toFixed(2)),
      totalAmount: Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2)),
      userId: authData._id,
      mobile: mobileNumber, // Assign the cleaned mobile number
    };

    console.log(newObject);

    await axios.post('/api/bills/add-bills', newObject);
    message.success("Bill Generated");
    navigate('/bills');
  } catch (error) {
    message.error("Something Went Wrong");
    console.error(error);
  }
};
  return (
    <DefaultLayout>
      <h1>CART_ITEMS</h1>
      <Table columns={columns} dataSource={cartItems} bordered />
      <div className="d-flex  flex-column align-items-end">
        <hr />
        <h3>
          SUBTOTAL: $<b>{subTotal}</b>/-
        </h3>
        <Button
          type="primary"
          onClick={() => {
            setbillPopup(true);
          }}
        >
          Create Invoice
        </Button>
      </div>
      <Modal
        title="Final Invoice"
        visible={billPopup}
        onCancel={() => setbillPopup(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handelSubmit}>
          <Form.Item name="customerName" label=" Customer NAME">
            <Input />
          </Form.Item>
          <Form.Item name="mobile" label="ContactNumber">
            <Input />
          </Form.Item>

          <Form.Item name="paymentmode" label="Payment Mode">
            <Select>
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="Card">Card</Select.Option>
              <Select.Option value="QRPayment">QR Payment</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-it">
            <h5>
              Sub Total :$<b>{subTotal}</b>/-
            </h5>
            <h4>TAX
              <b>{((subTotal/100)*10).toFixed(2)}</b>
            </h4>
             <h3>
              GRAND TOTAL :<b>
                {Number(subTotal)+Number(((subTotal/100)*10).toFixed(2))}
              </b>
             </h3>
          </div>

          <div className="d-flex justify-content-between">
            <Button type="primary" htmlType="submit">
               Genrate Bill
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;
