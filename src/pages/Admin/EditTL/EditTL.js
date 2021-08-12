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
import { Form, Input, Button } from "antd";
import Select from "react-select";
import Alerts from "../../../common/Alerts";

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
  const [mcategory, setmcategory] = useState([]);
  const [mdata, setmdata] = useState([]);
  const [mdataName, setMdataname] = useState([]);
  const [numExist, setNumExist] = useState(null)
  const [phone, setPhone] = useState('');
  const [numAvail, setNumAvail] = useState(null)
  const [indNumError, setIndNumError] = useState(null)

  const [email, setEmail] = useState('');
  const [valiEmail, setValiemail] = useState(null)
  const [invalid, setInvalid] = useState(null)
  const [wEmail, setWemail] = useState();
  const [display, setDisplay] = useState(false);
  const [subData, subCategeryData] = useState([])
  const [custCate, setCustcate] = useState([])
  const [mcatname, setmcatname] = useState([]);
  const [error, setError] = useState()
  const [error2, setError2] = useState();
  const [custCate2, setCustcate2] = useState([])
  var kk = []
  var vv = []
  const options = tax.map(d => ({
    "value": d.id,
    "label": d.details
  }))
  const options2 = tax2.map(v => ({
    "value": v.id,
    "label": v.details
  }))

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
    });
  };
  console.log("value -", value.name);
  const data1 = value.name;
  const data2 = value.email;
  const data3 = value.phone;
  const data4 = value.allpcat_id;
  const data5 = value.allcat_id;

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
    var categeryList = []
    var categeryName = []
    subData.map((i) => {
      categeryList.push(i.value)
      categeryName.push(i.label)
    })
    console.log("subData", subData)
    if (custCate.length < 1) {
      setError("Please select at least one value")
    }
    else if (subData.length < 1) {

      setError2("Please select at least one value")
    }
    else if (invalid || wEmail || indNumError) {
      setDisplay(false)
    }

    else {
      setDisplay(true)
      let formData = new FormData();
      formData.append("email", value.email);
      formData.append("name", value.name);
      formData.append("phone", value.phone);
      formData.append("cat_id", categeryList)

      formData.append("pcat_id", mcategory)
      formData.append("allpcat_id", mcatname)
      formData.append("allcat_id", categeryName)
      formData.append("id", id);

      axios({
        method: "POST",
        url: `${baseUrl}/tl/updateTeamLeader`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {

            var variable = "Team Leader Updated Successfully"
            Alerts.SuccessNormal(variable)
            history.goBack();
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }

  };


  // Phone onChange 
  const phoneHandler = (e) => {

    if (isNaN(e.target.value)) {
      setIndNumError("")
      setNumAvail("");
      setNumExist('Please enter number only')
      e.target.value = ""
      setPhone("")
    }
    else {
      setNumAvail("");
      setNumExist("");
      setPhone(e.target.value)
    }
  };

  // Phone Validation function 
  const phoneValidation = () => {
    console.log(phone.length)
    if (phone.length > 10) {
      console.log(phone.length)
      setNumAvail("")
      setNumExist("")
      setIndNumError("Maximum 10 value should be enter")
    }
    else if (phone.length < 10) {
      console.log(phone.length)
      setNumAvail("")
      setNumExist("")
      setIndNumError("Minimum 10 value should be enter")
    }
    else if (phone.length > 15) {
      setNumAvail("")
      setNumExist("")
      setIndNumError("Maximum 15 value should be enter")
    }

    else {
      setIndNumError("")

      let formData = new FormData();
      formData.append("phone", phone);
      formData.append("type", 2);
      axios({
        method: "POST",
        url: `${baseUrl}/customers/validateregistration`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            // setValiphone(response.data.result)
            console.log(response.data.result)
            setNumExist('')
            setNumAvail(response.data.result);

          }
          else if (response.data.code === 0) {
            console.log(response.data.result)
            setNumAvail('')
            setNumExist(response.data.result)

            console.log("mobile" + setNumExist)
          }

        })
        .catch((error) => {
          // console.log("erroror - ", error);
        });
    }
  }


  // Sub Category Function
  const subCategory = (e) => {
    subCategeryData(e)
    setCustcate2(e)
    setError2("")
  }


  // Category Function
  const category = (v) => {
    setError("")
    setCustcate(v)
    v.map((val) => {
      vv.push(val.value)
      setmcategory(val.value)
      setmcatname(val.label)
      setStore(val.value)
    })


    if (vv.length > 0) {
      if (vv.includes("1") && vv.includes("2")) {
        console.log("hdd")
      }
      else if (vv.includes("1")) {

        for (let i = 0; i < subData.length; i++) {
          if (subData[i].value < 9) {
            kk.push(subData[i])
          }
        }
        subCategeryData(kk)
      }
      else if (vv.includes("2")) {

        for (let i = 0; i < subData.length; i++) {
          if (subData[i].value > 8) {
            kk.push(subData[i])
          }
        }
        subCategeryData(kk)
      }
    }

    else if (vv.length === 0) {
      subCategeryData("")
    }

  }


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
                  }}
                  onFinish={onFinish}
                >
                  {console.log("categoryData", data1)}
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
                          <Input
                            onChange={(e) => phoneHandler(e)}
                            onBlur={phoneValidation} />
                        </Form.Item>
                      </div>
                      {indNumError ? <p className="declined">{indNumError}</p> : <>
                        {
                          numAvail ?
                            <p className="completed"> {numAvail}
                            </p>
                            :
                            <p className="declined">{numExist}</p>
                        }
                      </>}

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
                        <label>Category</label>
                        <div class="form-group">
                          <Form.Item name="category">
                            <Select isMulti options={options}
                              defaultInputValue={data4} onChange={category}
                            >
                            </Select>

                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Sub Category</label>
                        <Form.Item name="sub_category">
                          <Select isMulti options={options2}
                            onChange={subCategory} value={subData} defaultInputValue={data5} value={subData}>
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

export default EditTL;




// import React, { useState, useEffect } from "react";
// import Layout from "../../../components/Layout/Layout";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from "axios";
// import { baseUrl } from "../../../config/config";
// import { useAlert } from "react-alert";
// import { useParams, useHistory } from "react-router-dom";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Row,
//   Col,
//   Table,
//   Tooltip,
// } from "reactstrap";
// import Reset from "./Reset";
// import { Select, Form, Input, Button } from "antd";
// import Alerts from "../../../common/Alerts";

// function EditTL() {
//   const { Option } = Select;
//   const { id } = useParams();
//   const history = useHistory();
//   const alert = useAlert();

//   const userid = window.localStorage.getItem("adminkey");

//   const [tax, setTax] = useState([]);
//   const [tax2, setTax2] = useState([]);

//   const [store, setStore] = useState("");
//   const [store2, setStore2] = useState(null);
//   const [value, setValue] = useState({});

//   const handleChange = (value) => {
//     console.log(`selected ${value}`);
//     setStore(value);
//   };

//   useEffect(() => {
//     getTeamLeader();
//   }, [id]);

//   const getTeamLeader = () => {
//     axios.get(`${baseUrl}/tl/getTeamLeader?id=${id}`).then((res) => {
//       console.log(res);
//       if (res.data.code === 1) {
//       setValue(res.data.result[0]);
//       setStore(res.data.result[0].pcat_id);
//       }
//     });
//   };
//   console.log("value -", value.name);
//   const data1 = value.name;
//   const data2 = value.email;
//   const data3 = value.phone;
//   const data4 = value.pcat_id;
//   const data5 = value.cat_id;

//   useEffect(() => {
//     const getCategory = () => {
//       axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
//         console.log(res);
//         if (res.data.code === 1) {
//           setTax(res.data.result);
//         }
//       });
//     };

//     getCategory();
//   }, []);

//   useEffect(() => {
//     const getSubCategory = () => {
//       axios.get(`${baseUrl}/customers/getCategory?pid=${store}`).then((res) => {
//         console.log(res);
//         if (res.data.code === 1) {
//           setTax2(res.data.result);
//         }
//       });
//     };
//     getSubCategory();
//   }, [store]);



//   const onFinish = (value) => {
//     console.log("value :", value);

//     let formData = new FormData();
//     formData.append("email", value.email);
//     formData.append("name", value.name);
//     formData.append("phone", value.phone);
//     formData.append("pcat_id", value.category);
//     formData.append("cat_id", value.sub_category);
//     formData.append("id", id);

//     axios({
//       method: "POST",
//       url: `${baseUrl}/tl/updateTeamLeader`,
//       data: formData,
//     })
//       .then(function (response) {
//         console.log("res-", response);
//         if (response.data.code === 1) {

//           var variable = "Team Leader Updated Successfully"
//           Alerts.SuccessNormal(variable)
//           history.goBack();
//         }
//       })
//       .catch((error) => {
//         console.log("erroror - ", error);
//       });
//   };



//   return (
//     <Layout adminDashboard="adminDashboard" adminUserId={userid}>
//       <Card>
//         <CardHeader>
//           <div class="col-md-12 d-flex">
//             <div>
//               <button
//                 class="btn btn-success ml-3"
//                 onClick={() => history.goBack()}
//               >
//                 <i class="fas fa-arrow-left mr-2"></i>
//                 Go Back
//               </button>
//             </div>
//             <div class="text-center ml-5">
//               <h4>Edit Team Leader</h4>
//             </div>
//           </div>
//         </CardHeader>

//         {!data1 ? (
//           <CardHeader>loading ...</CardHeader>
//         ) : (
//           <CardHeader>
//             <div class="row mt-3">
//               <div class="col-lg-2 col-xl-2 col-md-12"></div>
//               <div class="col-lg-8 col-xl-8 col-md-12">
//                 <Form
//                   name="basic"
//                   initialValues={{
//                     name: `${data1}`,
//                     email: `${data2}`,
//                     phone: `${data3}`,
//                     category: `${data4}`,
//                     sub_category: `${data5}`,
//                   }}
//                   onFinish={onFinish}
//                 >
//                   <div class="row">
//                     <div class="col-md-6">
//                       <div class="form-group">
//                         <label>Name</label>
//                         <Form.Item name="name">
//                           <Input />
//                         </Form.Item>
//                       </div>
//                     </div>

//                     <div class="col-md-6">
//                       <div class="form-group">
//                         <label>Phone Number</label>
//                         <Form.Item name="phone">
//                           <Input />
//                         </Form.Item>
//                       </div>
//                     </div>
//                   </div>

//                   <div class="row">
//                     <div class="col-md-6">
//                       <div class="form-group">
//                         <label>Category</label>
//                         <div class="form-group">
//                           <Form.Item name="category">
//                             <Select onChange={handleChange}>
//                               <Option value="">--Select Category--</Option>
//                               {tax.map((p, index) => (
//                                 <Option key={index} value={p.id}>
//                                   {p.details}
//                                 </Option>
//                               ))}
//                             </Select>
//                           </Form.Item>
//                         </div>
//                       </div>
//                     </div>

//                     <div class="col-md-6">
//                       <div class="form-group">
//                         <label>Sub Category</label>
//                         <Form.Item name="sub_category">
//                           <Select>
//                             <Option value="">--Select Sub-Category--</Option>
//                             {tax2.map((p, index) => (
//                               <Option key={index} value={p.id}>
//                                 {p.details}
//                               </Option>
//                             ))}
//                           </Select>
//                         </Form.Item>
//                       </div>
//                     </div>
//                   </div>

//                   <div class="row">
//                     <div class="col-md-12">
//                       <div class="form-group">
//                         <label>Email</label>
//                         <Form.Item name="email">
//                           <Input />
//                         </Form.Item>
//                       </div>
//                     </div>
//                   </div>

//                   <div class="row">
//                     <div class="col-md-6">
//                       <div class="form-group">
//                         <Form.Item>
//                           <Button type="primary" htmlType="submit">
//                             Update
//                           </Button>
//                         </Form.Item>
//                       </div>
//                     </div>
//                   </div>
//                 </Form>
//               </div>
//             </div>
//           </CardHeader>
//         )}
//       </Card>
//     </Layout>
//   );
// }

// export default EditTL;
