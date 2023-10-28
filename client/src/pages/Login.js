import { React, useEffect } from "react";
import { Form, Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const handelSubmit = async (value) => {
    try {
      const res = await axios.post("/api/users/login", value);
      message.success("Login sucess");
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/");
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
          <h3 className="pos">LOGIN_PAGE</h3>
          <Form className="form" layout="vertical" onFinish={handelSubmit}>
            <Form.Item name="userid" label="USERID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="PASSWORD">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <>
                Not Registered! <Link to="/Register">SignUp</Link>
              </>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
