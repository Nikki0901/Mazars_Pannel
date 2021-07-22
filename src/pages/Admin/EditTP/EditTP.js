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
import { Select, Form, Input, Button } from "antd";
import TaxProffesionalService from "../../../config/services/TaxProffesional";
import Alerts from "../../../common/Alerts";


function EditTP() {
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
  const [teamleader, setTeamLeader] = useState([]);

  useEffect(() => {
    getTutorial(id);
  }, [id]);

  const getTutorial = (id) => {
    TaxProffesionalService.get(id)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 1) {
          setValue(res.data.result[0]);
          setStore(res.data.result[0].pcat_id);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const getTeamLeader = () => {
      axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTeamLeader(res.data.result);
        }
      });
    };
    getTeamLeader();
  }, []);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setStore(value);
  };

  // console.log("value -", value.name);
  const data1 = value.name;
  const data2 = value.email;
  const data3 = value.phone;
  const data4 = value.pcat_id;
  const data5 = value.cat_id;
  const data6 = value.tl_id;

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
    formData.append("tp_id", value.select_teamleader);

    axios({
      method: "POST",
      url: `${baseUrl}/tp/updateTP`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          var variable = "Tax Professional Updated Successfully"
          Alerts.SuccessNormal(variable)
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
              <h4>Edit Tax Professional</h4>
            </div>
          </div>
        </CardHeader>

        {!data1 ? (
          <CardHeader>loading ...</CardHeader>
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
                    select_teamleader: `${data6}`,
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
                        <label>Email</label>
                        <Form.Item name="email">
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Select teamleader</label>
                        <Form.Item name="select_teamleader">
                          <Select>
                            <Option value="">--select--</Option>
                            {teamleader.map((p, index) => (
                              <Option key={p.Id} value={p.id}>
                                {p.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Category</label>
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

export default EditTP;


// useEffect(() => {
//   const getTaxProfessional = () => {
//     axios.get(`${baseUrl}/tp/getTaxProfessional?id=${id}`).then((res) => {
//       console.log(res);
//       if (res.data.code === 1) {
//         setUser({
//           name: res.data.result[0].name,
//           email: res.data.result[0].email,
//           phone: res.data.result[0].phone,
//         });
//       }
//     });
//   };

//   getTaxProfessional();
// }, [id]);
