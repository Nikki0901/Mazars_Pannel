import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import Swal from 'sweetalert2';
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { Card, CardHeader } from "reactstrap";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import Mandatory from "../../../components/Common/Mandatory";

const Schema = yup.object().shape({
  p_name: yup.string().required("required name"),
  p_email: yup.string().email("invalid email").required("required email"),
  p_phone: yup
    .string()
    .required("required phone no")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(20, "max 20 digits"),

});


function AddNew() {
  const alert = useAlert();
  const history = useHistory();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const userid = window.localStorage.getItem("adminkey");
  const [error, setError] = useState()
  const [error2, setError2] = useState();
  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [nn, setNn] = useState([])
  const [mcatname, setmcatname] = useState([]);
  const [mcategory, setmcategory] = useState([]);
  const [store, setStore] = useState([]);
  const [subData, subCategeryData] = useState([])
  const [custCate, setCustcate] = useState([])
  const [custCate2, setCustcate2] = useState([])
  const [numExist, setNumExist] = useState(null)
  const [phone, setPhone] = useState('');
  const [numAvail, setNumAvail] = useState(null)
  const [categoryData, setCategoryData] = useState([])
  const [indNumError, setIndNumError] = useState(null)
  const [postValue, setPostName] = useState([]);
  const [email, setEmail] = useState('');
  const [valiEmail, setValiemail] = useState(null)
  const [invalid, setInvalid] = useState(null)
  const [wEmail, setWemail] = useState();
  const [display, setDisplay] = useState(false);
  const [teamleader, setTeamLeader] = useState([]);
  const [tl, setTl] = useState([])
  const [post1, setPost1] = useState([])
  const [post_na, setPost_na] = useState()
  var kk = []
  var vv = []
  var post_name;
  const options = tax.map(d => (
    {
      "value": d.id,
      "label": d.details
    }))

  const options2 = tax2.map(v => ({
    "value": v.id,
    "label": v.details
  }))
<<<<<<< HEAD
 
const teamleader1 = teamleader.map(v => (
  console.log(v), {
  "value" : v.id,
  "label" : v.name
}))
=======

  const teamleader1 = teamleader.map(v => (
    console.log(v), {
      "value": v.id,
      "label": v.name
    }))
>>>>>>> 95548708321125ef3638685eec24d125059fe546
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

  // OnSubmit Function
  const onSubmit = (value) => {
    console.log("tealId" , tl)
       var categeryList = []
     var categeryName = []
     var categeryName = []
     var kk = []
    
     var parentCategoryName = []
     subData.map((i) => {
       categeryList.push(i.value)
       categeryName.push(i.label)
     })
    //  categoryData.map((i) => {
    //    kk.push(i.value)
    //    parentCategoryName.push(i.label)
    //  })
    
     console.log("subData", categoryData.label)
     if (custCate.length < 1) {
       setError("Please select at least one value")
     }
     else if (subData.length < 1) {

       setError2("Please select at least one value")
     }
     else if (invalid || wEmail || indNumError) {
       setDisplay(false)
     }

     else {  console.log("value :", value);
    
         let formData = new FormData();
         formData.append("email", post1.email)
         formData.append("post_name", post1.post)
         formData.append("personal_email", value.p_email);
         formData.append("name", value.p_name);
         formData.append("phone", value.p_phone);
         formData.append("pcat_id", categoryData.value);
         formData.append("cat_id", categeryList);
         formData.append("type", "tp");
         formData.append("tp_id", tl);
         formData.append("allpcat_id", categoryData.label)
         formData.append("allcat_id", categeryName)
         formData.append("tlpost", post_na)
    
         axios({
           method: "POST",
           url: `${baseUrl}/tp/AddTaxProfessional`,
           data: formData,
         })
           .then(function (response) {
             console.log("res-", response);
             if (response.data.code === 1) {
    
               var variable = "Tax Professional Created Successfully"
        
              Swal.fire({
                "title" : "success", 
                "html" : "Tax Professional Created Successfully",
                "icon" : "success"
              })
    
               history.goBack();
             }
           })
           .catch((error) => {
             console.log("erroror - ", error);
           });
       };
      }
 

<<<<<<< HEAD
  // Sub Category Function
  const subCategory = (e) => {
    subCategeryData(e)
    setCustcate2(e)
    setError2("")
  }


  // Category Function
  const category = (v) => {

=======
  // OnSubmit Function
  const onSubmit = (value) => {
    console.log("tealId", tl)
    var categeryList = []
    var categeryName = []
    var categeryName = []
    var kk = []

    var parentCategoryName = []
    subData.map((i) => {
      categeryList.push(i.value)
      categeryName.push(i.label)
    })
    categoryData.map((i) => {
      kk.push(i.value)
      parentCategoryName.push(i.label)
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
      console.log("value :", value);

      let formData = new FormData();
      formData.append("email", post1.email)
      formData.append("post_name", post1.post)
      formData.append("personal_email", value.p_email);
      formData.append("name", value.p_name);
      formData.append("phone", value.p_phone);
      formData.append("pcat_id", kk);
      formData.append("cat_id", categeryList);
      formData.append("type", "tp");
      formData.append("tp_id", tl);
      formData.append("allpcat_id", parentCategoryName)
      formData.append("allcat_id", categeryName)
      formData.append("tlpost", post_na)

      axios({
        method: "POST",
        url: `${baseUrl}/tp/AddTaxProfessional`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {

            var variable = "Tax Professional Created Successfully"

            Swal.fire({
              "title": "success",
              "html": "Tax Professional Created Successfully",
              "icon": "success"
            })

            history.goBack();
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    };
  }
  // const onSubmit = (value) => {
  //   var categeryList = []
  //   var categeryName = []
  //   var categeryName = []
  //   var kk = []
  //   var parentCategoryName = []
  //   subData.map((i) => {
  //     categeryList.push(i.value)
  //     categeryName.push(i.label)
  //   })
  //   categoryData.map((i) => {
  //     kk.push(i.value)
  //     parentCategoryName.push(i.label)
  //   })
  //   console.log("subData", subData)
  //   if (custCate.length < 1) {
  //     setError("Please select at least one value")
  //   }
  //   else if (subData.length < 1) {

  //     setError2("Please select at least one value")
  //   }
  //   else if (invalid || wEmail || indNumError) {
  //     setDisplay(false)
  //   }

  //   else {
  //     setDisplay(true)
  //     let formData = new FormData();

  //     formData.append("email", value.p_email);
  //     formData.append("name", value.p_name);
  //     formData.append("phone", value.p_phone);

  //     formData.append("type", "tl");

  //     formData.append("cat_id", categeryList)
  //     formData.append("post_name", postValue.post)
  //     formData.append("post_email", postValue.tlemail)

  //     formData.append("pcat_id", kk)
  //     formData.append("allpcat_id", parentCategoryName)
  //     formData.append("allcat_id", categeryName)



  //     axios({
  //       method: "POST",
  //       url: `${baseUrl}/tl/AddTeamLead`,
  //       data: formData,
  //     })

  //       .then(function (response) {

  //         if (response.data.code === 1) {
  //           Swal.fire({
  //             "title": "Success",
  //             "html": "TL created successfully",
  //             "icon": "success"
  //           })

  //           history.goBack();
  //         }
  //         if (response.data.code === 0) {
  //           response.data.message.map((i) => {

  //           })
  //         }

  //       })
  //       .catch((error) => {

  //       });
  //   }

  // };

  // Sub Category Function
  const subCategory = (e) => {
    subCategeryData(e)
    setCustcate2(e)
    setError2("")
  }


  // Category Function
  const category = (v) => {

>>>>>>> 95548708321125ef3638685eec24d125059fe546
    setCategoryData(v)
    setNn((oldData) => {
      return [...oldData, mcategory]
    })
    setError("")
    setCustcate(v)
<<<<<<< HEAD
    setStore(v.value)
    vv.push(v.value);
    setmcategory(v.value)
    setmcatname((oldData) => {
      return [...oldData, v.label]
    })
    // v.map((val) => {
    //   vv.push(val.value)
    //   setmcategory(val.value);
    //   setmcatname((oldData) => {
    //     return [...oldData, val.label]
    //   })
    //   setStore(val.value)
    // })


    if (vv.length > 0) {
      if (vv.includes("1") && vv.includes("2")) {
        console.log("hdd")
      }
      else if (vv.includes("1")) {

        for (let i = 0; i < subData.length; i++) {
          if (subData[i].value < 9) {
            kk.push(subData[i])
          }
=======
    v.map((val) => {
      vv.push(val.value)
      setmcategory(val.value);
      setmcatname((oldData) => {
        return [...oldData, val.label]
      })
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
      setIndNumError("Maximum 10 digit should be enter")
    }
    else if (phone.length < 10) {
      console.log(phone.length)
      setNumAvail("")
      setNumExist("")
      setIndNumError("Minimum 10 digit should be enter")
    }
    else if (phone.length > 15) {
      setNumAvail("")
      setNumExist("")
      setIndNumError("Maximum 15 digit should be enter")
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

  //eamil onchange
  const emailHandler = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value.length)
    if (e.target.value.length < 1) {
      setWemail("")
    }
  };


  //email validaation with api
  const emailValidation = (key) => {

    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(validRegex)) {
      setWemail("");
      let formData = new FormData();
      formData.append("email", email);
      formData.append("type", 1);

      axios({
        method: "POST",
        url: `${baseUrl}/customers/validateregistration`,
        data: formData,
      })
        .then(function (response) {
          console.log("resEmail-", response);
          if (response.data.code === 1) {
            setValiemail(response.data.result)
            setInvalid('')
          } else if (response.data.code === 0) {
            setInvalid(response.data.result)
            setValiemail('')
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }
    else {
      setWemail("invalid email")
    }

  }

  // Tl Function 
  const tlFun = (e) => {
    var a;
    console.log("id", e)
    teamleader.filter((p) => {

      if (p.id == e) {
        console.log(p.post_name)

        setTl(p.id)
        setPost_na(p.post_name)
      }
    })
    console.log(post_na)
    let formData = new FormData()
    formData.append("post", post_na)
    axios({
      method: "POST",
      url: `${baseUrl}/admin/addTpPost?post=${post_na}`,
      data: formData
    })
      .then(function (response) {
        if (response.data.code === 1) {
          setPost1(response.data.result)
        }
        else if (response.data.code === 0) {
          console.log(response.data.result)
>>>>>>> 95548708321125ef3638685eec24d125059fe546
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
      setIndNumError("Maximum 10 digit should be enter")
    }
    else if (phone.length < 10) {
      console.log(phone.length)
      setNumAvail("")
      setNumExist("")
      setIndNumError("Minimum 10 digit should be enter")
    }
    else if (phone.length > 15) {
      setNumAvail("")
      setNumExist("")
      setIndNumError("Maximum 15 digit should be enter")
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
<<<<<<< HEAD
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

  //eamil onchange
  const emailHandler = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value.length)
    if (e.target.value.length < 1) {
      setWemail("")
    }
  };
=======
      .catch((error) => {
        console.log("erroror - ", error);
      });
  }

>>>>>>> 95548708321125ef3638685eec24d125059fe546


  //email validaation with api
  const emailValidation = (key) => {

    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(validRegex)) {
      setWemail("");
      let formData = new FormData();
      formData.append("email", email);
      formData.append("type", 1);

      axios({
        method: "POST",
        url: `${baseUrl}/customers/validateregistration`,
        data: formData,
      })
        .then(function (response) {
          console.log("resEmail-", response);
          if (response.data.code === 1) {
            setValiemail(response.data.result)
            setInvalid('')
          } else if (response.data.code === 0) {
            setInvalid(response.data.result)
            setValiemail('')
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }
    else {
      setWemail("invalid email")
    }

  }

  // Tl Function 
  const tlFun = (e) => {
    var a ;
  console.log("id", e)
  teamleader.filter((p) => {

    if(p.id == e){
   console.log(p.post_name)
     
     setTl(p.id)
     setPost_na(p.post_name)
     a = p.post_name
     console.log("aa", a)
    }
  })
 console.log(post_na)
    let formData = new FormData()
    formData.append("post", a)
    axios({
      method  :"POST",
      url  : `${baseUrl}/admin/addTpPost?post=${a}`,
      data : formData
    })
    .then(function (response) {
      if(response.data.code === 1){
        setPost1(response.data.result)
      }
      else if(response.data.code === 0){
        console.log(response.data.result)
      }
    } )
    .catch((error) => {
      console.log("erroror - ", error);
    });
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
            <h4>Add New Tax Professionals</h4>
            </div>
          </div>
        </CardHeader>

        <CardHeader>
          <div class="row mt-3">
            <div class="col-lg-2 col-xl-2 col-md-12"></div>
            <div class="col-lg-8 col-xl-8 col-md-12">
              <form onSubmit={handleSubmit(onSubmit)}>
<<<<<<< HEAD
            
                <div class="row">
                  <div class="col-md-6">
                  <div class="form-group">
                    <label>Select teamleader</label>
                    {/* <Select 
                    onChange={tlFun} options = {teamleader1}>

                    </Select> */}
                       <select
                         name="p_teamleader"
                         className={classNames("form-control", {
                           "is-invalid": errors.p_teamleader,
                         })}
                         onChange = {(e) => tlFun(e.target.value)}
                         ref={register}
                       >
                         <option value="">--select--</option>
                         {teamleader.map((p) =>
                          (
                            console.log("pp", p.id),
                           <option key={p.Id} value={p.id}>
                             {p.name}
                           </option>
                         ))}
                       </select>
                       {errors.p_teamleader && (
                         <div className="invalid-feedback">
                           {errors.p_teamleader.message}
                         </div>
                       )} 
                     
                    </div>
                  
                  </div>

                  <div class="col-md-6">
                  <div class="form-group">
                      <label>Email <span className="declined">*</span></label>
                      <input
                        type="email"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_email || wEmail || invalid,
                        })}
                        name="p_email"
                        ref={register}
                        onChange={(e) => emailHandler(e)}
                        onBlur={emailValidation}
                      />
                      {
                        wEmail ? <p className="declined">{wEmail}</p> : <>
                          {valiEmail ?
                            <p className="completed">
                              {valiEmail}
                            </p>
                            :
                            <p className="declined">{invalid}</p>}
                        </>
                      }
=======

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Select teamleader</label>

                      <select
                        name="p_teamleader"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_teamleader,
                        })}
                        onChange={(e) => tlFun(e.target.value)}
                        ref={register}
                      >
                        <option value="">--select--</option>
                        {teamleader.map((p) =>
                        (
                          console.log("pp", p.id),
                          <option key={p.Id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                      {errors.p_teamleader && (
                        <div className="invalid-feedback">
                          {errors.p_teamleader.message}
                        </div>
                      )}

>>>>>>> 95548708321125ef3638685eec24d125059fe546
                    </div>

                  </div>
<<<<<<< HEAD
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Post Name</label>
                      <input
                        type="text"
                        name="post_name"
                        disabled
                        className={classNames("form-control", {
                          "is-invalid": errors.post_name,
                        })}
                        ref={register}
                        value={post1.post}

                      />

=======

                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Email <span className="declined">*</span></label>
                      <input
                        type="email"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_email || wEmail || invalid,
                        })}
                        name="p_email"
                        ref={register}
                        onChange={(e) => emailHandler(e)}
                        onBlur={emailValidation}
                      />
                      {
                        wEmail ? <p className="declined">{wEmail}</p> : <>
                          {valiEmail ?
                            <p className="completed">
                              {valiEmail}
                            </p>
                            :
                            <p className="declined">{invalid}</p>}
                        </>
                      }
>>>>>>> 95548708321125ef3638685eec24d125059fe546
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
<<<<<<< HEAD
                      <label>Post Email</label>
                      <input
                        type="text"
                        name="post_email"
                        ref={register}
                        value={post1.email}
                        disabled
                        className={classNames("form-control", {
                          "is-invalid": errors.post_email,
                        })}
=======
                      <label>Post Name</label>
                      <input
                        type="text"
                        name="post_name"
                        disabled
                        className={classNames("form-control", {
                          "is-invalid": errors.post_name,
                        })}
                        ref={register}
                        value={post1.post}

>>>>>>> 95548708321125ef3638685eec24d125059fe546
                      />

                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
<<<<<<< HEAD
                      <label>Name <span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_name,
                        })}
                        name="p_name"
                        ref={register}
=======
                      <label>Post Email</label>
                      <input
                        type="text"
                        name="post_email"
                        ref={register}
                        value={post1.email}
                        disabled
                        className={classNames("form-control", {
                          "is-invalid": errors.post_email,
                        })}
>>>>>>> 95548708321125ef3638685eec24d125059fe546
                      />

                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
<<<<<<< HEAD
                      <label>Phone Number <span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_phone || indNumError,
                        })}
                        name="p_phone"
                        ref={register}
                        onChange={(e) => phoneHandler(e)}
                        onBlur={phoneValidation}
                      />
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
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Category <span className="declined">*</span></label>
                      <Select  options={options}
=======
                      <label>Name <span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_name,
                        })}
                        name="p_name"
                        ref={register}
                      />

                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Phone Number <span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_phone || indNumError,
                        })}
                        name="p_phone"
                        ref={register}
                        onChange={(e) => phoneHandler(e)}
                        onBlur={phoneValidation}
                      />
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
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Category <span className="declined">*</span></label>
                      <Select isMulti options={options}
>>>>>>> 95548708321125ef3638685eec24d125059fe546
                        className={error ? "customError" : ""}

                        onChange={category}>

                      </Select>


                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Sub Category <span className="declined">*</span></label>
                      <Select isMulti options={options2}
                        className={error2 ? "customError" : ""}
                        onChange={subCategory}
                        value={subData}>

                      </Select>

                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div class="col-lg-2 col-xl-2 col-md-12">

            </div>

            <Mandatory />
          </div>
        </CardHeader>
      </Card>
    </Layout>
  );
}

<<<<<<< HEAD
export default AddNew;
=======
export default AddNew;



// import React, { useState, useEffect } from "react";
// import Layout from "../../../components/Layout/Layout";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from "axios";
// import { baseUrl } from "../../../config/config";
// import { useAlert } from "react-alert";
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
// import { useHistory } from "react-router-dom";
// import classNames from "classnames";
// import Alerts from "../../../common/Alerts";

// const Schema = yup.object().shape({
//   p_name: yup.string().required("required name"),
//   p_email: yup.string().email("invalid email").required("required email"),
//   p_phone: yup
//     .string()
//     .required("required phone no")
//     .matches(/^[0-9]+$/, "Must be only digits")
//     .min(10, "Must be exactly 10 digits")
//     .max(20, "max 20 digits"),
//   p_tax: yup.string().required("required category"),
//   p_tax2: yup.string().required("required sub category"),
//   p_teamleader: yup.string().required("required sub teamleader"),
// });

// function AddNew() {
//   const alert = useAlert();
//   const { handleSubmit, register, reset, errors } = useForm({
//     resolver: yupResolver(Schema),
//   });

//   const [teamleader, setTeamLeader] = useState([]);
//   const userid = window.localStorage.getItem("adminkey");

//   const history = useHistory();
//   const [tax, setTax] = useState([]);
//   const [tax2, setTax2] = useState([]);

//   const [store, setStore] = useState("");
//   const [store2, setStore2] = useState(null);

//   useEffect(() => {
//     const getTeamLeader = () => {
//       axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
//         console.log(res);
//         if (res.data.code === 1) {
//           setTeamLeader(res.data.result);
//         }
//       });
//     };
//     getTeamLeader();
//   }, []);

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


//   const onSubmit = (value) => {
//     console.log("value :", value);

//     let formData = new FormData();
//     formData.append("email", value.p_email);
//     formData.append("name", value.p_name);
//     formData.append("phone", value.p_phone);
//     formData.append("pcat_id", value.p_tax);
//     formData.append("cat_id", value.p_tax2);
//     formData.append("type", "tp");
//     formData.append("tp_id", value.p_teamleader);

//     axios({
//       method: "POST",
//       url: `${baseUrl}/tp/AddTaxProfessional`,
//       data: formData,
//     })
//       .then(function (response) {
//         console.log("res-", response);
//         if (response.data.code === 1) {

//           var variable = "Tax Professional Created Successfully"
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
//               <h4>Add New Tax Professionals</h4>
//             </div>
//           </div>
//         </CardHeader>

//         <CardHeader>
//           <div class="row mt-3">
//             <div class="col-lg-2 col-xl-2 col-md-12"></div>
//             <div class="col-lg-8 col-xl-8 col-md-12">
//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <div class="row">
//                   <div class="col-md-6">
//                     <div class="form-group">
//                       <label>Name</label>
//                       <input
//                         type="text"
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_name,
//                         })}
//                         name="p_name"
//                         ref={register}
//                       />
//                       {errors.p_name && (
//                         <div className="invalid-feedback">
//                           {errors.p_name.message}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div class="col-md-6">
//                     <div class="form-group">
//                       <label>Phone Number</label>
//                       <input
//                         type="text"
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_phone,
//                         })}
//                         name="p_phone"
//                         ref={register}
//                       />
//                       {errors.p_phone && (
//                         <div className="invalid-feedback">
//                           {errors.p_phone.message}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div class="col-md-6">
//                     <div class="form-group">
//                       <label>Email</label>
//                       <input
//                         type="email"
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_email,
//                         })}
//                         name="p_email"
//                         ref={register}
//                       />
//                       {errors.p_email && (
//                         <div className="invalid-feedback">
//                           {errors.p_email.message}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div class="col-md-6">
//                     <div class="form-group">
//                       <label>Select teamleader</label>
//                       <select
//                         name="p_teamleader"
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_teamleader,
//                         })}
//                         ref={register}
//                       >
//                         <option value="">--select--</option>
//                         {teamleader.map((p) => (
//                           <option key={p.Id} value={p.id}>
//                             {p.name}
//                           </option>
//                         ))}
//                       </select>
//                       {errors.p_teamleader && (
//                         <div className="invalid-feedback">
//                           {errors.p_teamleader.message}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div class="row">
//                   <div class="col-md-6">
//                     <div class="form-group">
//                       <label>Category</label>
//                       <select
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_tax,
//                         })}
//                         name="p_tax"
//                         ref={register}
//                         onChange={(e) => setStore(e.target.value)}
//                       >
//                         <option value="">--Select Category--</option>
//                         {tax.map((p, index) => (
//                           <option key={index} value={p.id}>
//                             {p.details}
//                           </option>
//                         ))}
//                       </select>
//                       {errors.p_tax && (
//                         <div className="invalid-feedback">
//                           {errors.p_tax.message}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div class="col-md-6">
//                     <div class="form-group">
//                       <label>Sub Category</label>
//                       <select
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_tax2,
//                         })}
//                         name="p_tax2"
//                         ref={register}
//                         onChange={(e) => setStore2(e.target.value)}
//                       >
//                         <option value="">--Select Sub-Category--</option>
//                         {tax2.map((p, index) => (
//                           <option key={index} value={p.id}>
//                             {p.details}
//                           </option>
//                         ))}
//                       </select>
//                       {errors.p_tax2 && (
//                         <div className="invalid-feedback">
//                           {errors.p_tax2.message}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         </CardHeader>
//       </Card>
//     </Layout>
//   );
// }

// export default AddNew;
>>>>>>> 95548708321125ef3638685eec24d125059fe546
