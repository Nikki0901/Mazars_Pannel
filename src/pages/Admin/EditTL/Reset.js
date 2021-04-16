import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Select, Form, Input, Button } from "antd";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { baseUrl } from "../../../config/config";
import { values } from "lodash";

function Reset({ uid }) {
  const { Option } = Select;
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState(null);

  const [value, setValue] = useState({});



  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    sub_category: "",
  });

  const { name, email, phone, category, sub_category } = user;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setStore2(value);
  };

  useEffect(() => {
    const getTeamLeader = () => {
      axios.get(`${baseUrl}/tl/getTeamLeader?id=226`).then((res) => {
        console.log(res);
    
          setValue(res.data.result[0])
          // setUser({
          //   name: res.data.result[0].name,
          //   email: res.data.result[0].email,
          //   phone: res.data.result[0].phone,
          //   category: res.data.result[0].parent_id,
          //   sub_category: res.data.result[0].cat_name,
          // });
       
      });
    };

    getTeamLeader();
  }, [uid]);



  console.log("value",value.name)

const data = value.name

console.log("data",data)

  useEffect(() => {
    const getSubCategory = () => {
      axios
        .get(`${baseUrl}/customers/getCategory?pid=${store2}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setTax2(res.data.result);
          }
        });
    };
    getSubCategory();
  }, [store2]);

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <div class="container">
        <Form name="nest-messages" onFinish={onFinish}>
          <p></p>
          <Form.Item name={["query", "name"]} label=" name">
            <Input defaultValue={data}/>
          </Form.Item>
          <Form.Item name={["query", "email"]} label="email ">
            <Input defaultValue="mysite"/>
          </Form.Item>

          <Form.Item name={["query", "phone"]} label="phone">
            <Input defaultValue="mysite"/>
          </Form.Item>

          <Form.Item name={["query", "pcat_1"]} label="Category">
            <Select allowClear defaultValue={data} onChange={handleChange}>
              <Option value="1">Direct</Option>
              <Option value="2">InDirect</Option>
            </Select>
          </Form.Item>

          <Form.Item name={["query", "cat_1"]} label="Sub-category">
            <Select allowClear defaultValue={data}>
              <Option value="">--Select Sub-Category--</Option>
              {tax2.map((p, index) => (
                <Option key={index} value={p.id}>
                  {p.details}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Reset;

// <Option value="3">Assessment</Option>
// <Option value="4">others</Option>
