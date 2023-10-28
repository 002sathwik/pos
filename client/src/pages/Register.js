import { React, useEffect } from "react";
import { Form, Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const handelSubmit = async (value) => {
    try {
      await axios.post("/api/users/register", value);
      message.success("Item Added");
      navigate("/Login");
    } catch (error) {
      message.error("Something Went Wrong");
      console.log(error);
    }
  };
  // recently loged in user  by this code stuf we we add location like3000/logni it will directly didirect to home page
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div>
        <div className="register">
          <h1 className="pos">POS</h1>
          <h3 className="pos">REGISTER_PAGE</h3>
          <Form className="form" layout="vertical" onFinish={handelSubmit}>
            <Form.Item name="name" label="USERNAME" className="ctc">
              <Input type="text" />
            </Form.Item>

            <Form.Item name="userid" label="USERID">
              <Input type="email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="PASSWORD"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <>
                Already Registered! <Link to="/Login">Login Here</Link>
              </>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
