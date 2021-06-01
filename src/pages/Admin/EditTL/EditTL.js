import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Tooltip,
} from "reactstrap";
import Reset from "./Reset";
import { Select, Form, Input, Button } from "antd";
import Loader from "react-loader-spinner";

function EditTL() {
  const { Option } = Select;
  const { id } = useParams();
  const history = useHistory();
  const alert = useAlert();

  const userid = window.localStorage.getItem("adminkey");

  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);

  const [store, setStore] = useState("");
  const [store2, setStore2] = useState(null);
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setStore(value);
  };

  useEffect(() => {
    getTeamLeader();
  }, [id]);

  const getTeamLeader = () => {
    axios.get(`${baseUrl}/tl/getTeamLeader?id=${id}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
      setValue(res.data.result[0]);
      setStore(res.data.result[0].pcat_id);
      }
      setLoading(false);
    });
  };
  console.log("value -", value.name);
  const data1 = value.name;
  const data2 = value.email;
  const data3 = value.phone;
  const data4 = value.pcat_id;
  const data5 = value.cat_id;

  useEffect(() => {
    const getCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax(res.data.result);
        }
      });
    };

    getCategory();
  }, []);

  useEffect(() => {
    const getSubCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=${store}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax2(res.data.result);
        }
      });
    };
    getSubCategory();
  }, [store]);



  const onFinish = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("email", value.email);
    formData.append("name", value.name);
    formData.append("phone", value.phone);
    formData.append("pcat_id", value.category);
    formData.append("cat_id", value.sub_category);
    formData.append("id", id);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/updateTeamLeader`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("TL updated  !");
          history.goBack();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };



  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <div class="col-md-12 d-flex">
            <div>
              <button
                class="btn btn-success ml-3"
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </div>
            <div class="text-center ml-5">
              <h4>Edit Team Leader</h4>
            </div>
          </div>
        </CardHeader>

        {loading ? (
          <div style={{display: 'flex', justifyContent: 'center'}}><Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /></div>
        ) : (
          <CardHeader>
            <div class="row mt-3">
              <div class="col-lg-2 col-xl-2 col-md-12"></div>
              <div class="col-lg-8 col-xl-8 col-md-12">
                <Form
                  name="basic"
                  initialValues={{
                    name: `${data1}`,
                    email: `${data2}`,
                    phone: `${data3}`,
                    category: `${data4}`,
                    sub_category: `${data5}`,
                  }}
                  onFinish={onFinish}
                >
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Name</label>
                        <Form.Item name="name">
                          <Input />
                        </Form.Item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Phone Number</label>
                        <Form.Item name="phone">
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Category</label>
                        <div class="form-group">
                          <Form.Item name="category">
                            <Select onChange={handleChange}>
                              <Option value="">--Select Category--</Option>
                              {tax.map((p, index) => (
                                <Option key={index} value={p.id}>
                                  {p.details}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Sub Category</label>
                        <Form.Item name="sub_category">
                          <Select>
                            <Option value="">--Select Sub-Category--</Option>
                            {tax2.map((p, index) => (
                              <Option key={index} value={p.id}>
                                {p.details}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Email</label>
                        <Form.Item name="email">
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Update
                          </Button>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </CardHeader>
        )}
      </Card>
    </Layout>
  );
}

export default EditTL;

// setValue("p_name", res.data.result[0].name);
// setValue("p_email", res.data.result[0].email);
// setUser({
//   name: res.data.result[0].name,
//   email: res.data.result[0].email,
//   phone: res.data.result[0].phone,
//   category: res.data.result[0].parent_id,
//   sub_category: res.data.result[0].cat_name,
// });
// const [user, setUser] = useState({
//   name: "",
//   email: "",
//   phone: "",
//   category: "",
//   sub_category: "",
// });

// const { name, email, phone, category, sub_category } = user;
{
  /* <div class="row mt-3">
            <div class="col-lg-2 col-xl-2 col-md-12"></div>
            <div class="col-lg-8 col-xl-8 col-md-12">
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          class="form-control"
                          name="p_name"
                          ref={register}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          class="form-control"
                          name="p_phone"
                          ref={register}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Category</label>

                        <select
                          className="form-control"
                          name="p_tax"
                          ref={register}
                          value={store}
                          onChange={(e) => setStore(e.target.value)}
                        >
                          <option value="">--Select Category--</option>
                          {tax.map((p, index) => (
                            <option key={index} value={p.id}>
                              {p.details}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Sub Category</label>
                        <select
                          className="form-select form-control"
                          name="p_tax2"
                          ref={register}
                          onChange={(e) => setStore2(e.target.value)}
                        >
                          <option value="">--Select Sub-Category--</option>
                          {tax2.map((p, index) => (
                            <option key={index} value={p.id}>
                              {p.details}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          class="form-control"
                          name="p_email"
                          ref={register}
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div> */
}

// const [interest, setInterest] = useState("Direct Tax");

// const [selectedOption, setSelectedOption] = useState([]);
// const [tax, setTax] = useState([]);
// const [tax2, setTax2] = useState([]);

// const [store, setStore] = useState("");
// const [store2, setStore2] = useState(null);

// useEffect(() => {
//   getTeamLeader();
// }, []);

// const getTeamLeader = () => {
//   axios.get(`${baseUrl}/tl/getTeamLeader?id=${id}`).then((res) => {
//     console.log(res);
//     console.log(res.data.result[0]);
//     if (res.data.code === 1) {
//       // setSelectedOption(res.data.result);
//       // setInterest(res.data.result[0].parent_id)
//       // reset(res.data.result[0]);

//       setValue("p_name", res.data.result[0].name);
//       setValue("p_email", res.data.result[0].email);
//       setValue("p_phone", res.data.result[0].phone);
//       setValue("p_tax", res.data.result[0].parent_id);
//       setValue("p_tax2", res.data.result[0].cat_name);
//     }
//   });
// };
