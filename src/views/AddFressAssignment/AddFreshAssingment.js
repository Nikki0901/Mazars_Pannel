import { useForm, useFieldArray } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useAlert } from "react-alert";
import Select from "react-select";
import { Spinner } from "reactstrap";
import Alerts from "../../common/Alerts";
import Swal from "sweetalert2";
import { purpose, assessment_year } from "./data";
import Layout from "../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { useHistory } from "react-router-dom";



function AddFreshAssingment(props) {
  const alert = useAlert();
  const history = useHistory();
  const { handleSubmit, register, errors, reset, control } = useForm({
    defaultValues: {
      users: [{ query: "" }],
    },
  });

  const { append, remove, fields } = useFieldArray({
    control,
    name: "users",
  });
  const userId = window.localStorage.getItem("userid");
  const category = window.localStorage.getItem("category");
  const userNameId = window.localStorage.getItem("name");

  const [selectedOption, setSelectedOption] = useState([]);
  const [purposeOption, setPurposeOption] = useState([]);
  const [custError, setcustError] = useState([])

  const [load, setLoad] = useState(false);
  const [selectError, setSelectError] = useState()


  const valiFun = (e) => {
    setcustError("")
  }
  const purPoseQuery = (e) => {
    setSelectError("")
    setPurposeOption(e)

  }


  const onSubmit = (value) => {
    console.log("value :", value);
    if (setPurposeOption == '') {
      setSelectError("mandatory")
    }
    if (selectedOption == '') {
      setSelectError("mandatory")
    }
    else {
      setSelectError("")
    }
    const a = value.p_fact;
    const b = value.p_case_name;
    if (a == '') {
      setcustError("mandatory");
    }

    else {
      setcustError(" ");
      setLoad(true);
      let formData = new FormData();

      var uploadImg = value.upload;
      if (uploadImg) {
        for (var i = 0; i < uploadImg.length; i++) {
          console.log("pics", value.upload[i].pics[0]);
          let a = value.upload[i].pics[0];
          formData.append("upload_1[]", a);
        }
      }

      formData.append("fact", value.p_fact);
      formData.append("specific", JSON.stringify(value.users));
      formData.append("timelines", value.p_timelines);
      formData.append("user", JSON.parse(userId));
      formData.append("cid", JSON.parse(category));
      formData.append("softcopy_word", Number(value.p_format_word));
      formData.append(
        "softcopy_digitally_assigned",
        Number(value.p_format_digital)
      );
      formData.append(
        "printout_physically_assigned",
        Number(value.p_format_physically)
      );
      formData.append("case_name", value.p_case_name);
      formData.append("assessment_year", JSON.stringify(selectedOption));
      formData.append("purpose", JSON.stringify(purposeOption));


      axios
        .post(`${baseUrl}/customers/PostQuestion`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            reset();

            var message = response.data.message
            if (message == "") {
              Swal.fire(
                "Success",
                `Query successfully added.`,
                "success"
              )
            } else if (message.invalid) {
              Swal.fire({
                title: 'Error !',
                html: `<p class="text-danger">${message.invalid}</p>`,
              })
            } else if (message.faill && message.success) {
              Swal.fire({
                title: 'Success',
                html: `<p class="text-danger">${message.faill}</p> <br/> <p>${message.success}</p> `,
                icon: 'success',
              })
            } else if (message.success) {
              Swal.fire({
                title: 'Success',
                html: `<p>${message.success}</p>`,
                icon: 'success',
              })
            }
            else if (message.faill) {
              Swal.fire({
                title: 'Error !',
                html: `<p class="text-danger">${message.faill}</p>`,
                icon: 'error',
              })
            }

            props.history.push("/customer/dashboard");
          } else {
            setLoad(false);
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }
  };




  return (
    <>
      <Layout custDashboard="custDashboard" custUserId={userId}>
        <Card>
          <CardHeader>
            <Row>
              <Col md="4">
                <button class="btn btn-success" onClick={() => history.goBack()}>
                  <i class="fas fa-arrow-left mr-2"></i>
                  Go Back
                </button>
              </Col>
              <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
                <p style={{ fontSize: "20px" }}>Add Fresh Query</p>
              </Col>
            </Row>
          </CardHeader>
          <div className="container">

            <div class="col-xl-8 col-lg-8 col-md-12 py-4">
              {load ? (
                <Spinner size="sm" color="primary" />
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Facts of the case <span className="declined">*</span></label>
                        <textarea
                          className="form-control"
                          id="textarea"
                          rows="6"
                          name="p_fact"
                          onChange={valiFun}
                          ref={register}
                        ></textarea>
                        <p style={{ "color": "red" }}>{custError}</p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="question_query mb-2">
                        <label className="form-label">
                          Specific Questions for advisory <span className="declined">*</span>
                        </label>
                        <div
                          className="btn btn-primary"
                          onClick={() => append({ query: "" })}
                        >
                          +
                        </div>
                      </div>

                      {fields.length > 0 &&
                        fields.map((item, index) => (
                          <div>
                            {fields.length < 5 ? (
                              <div
                                className="question_query_field mb-2"
                                key={index}
                              >
                                <input
                                  type="text"
                                  className="form-control"
                                  ref={register}
                                  name={`users[${index}].query`}
                                  placeholder="Specify your query"
                                  defaultValue={`${item.query}`}
                                />
                                <div
                                  className="btn btn-primary ml-2"
                                  onClick={() => remove(index)}
                                >
                                  -
                                </div>
                              </div>
                            ) : null}
                          </div>
                        ))}
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Case name</label>
                        <input
                          type="text"
                          name="p_case_name"
                          ref={register}

                          className="form-control"
                        />

                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Assessment year</label>
                        <Select
                          closeMenuOnSelect={false}
                          onChange={setSelectedOption}
                          isMulti
                          options={assessment_year}
                        />

                      </div>
                    </div>

                    <div className="col-md-6">
                      <ImageUploads register={register} control={control} />
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Format in which Opinion is required
                        </label>
                        <br />
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="p_format_word"
                            ref={register}
                            defaultChecked
                          />
                          <label className="form-check-label">
                            Softcopy - Word/ Pdf
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="p_format_digital"
                            ref={register}

                          />
                          <label className="form-check-label">
                            SoftCopy- Digitally Signed
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="p_format_physically"
                            ref={register}

                          />
                          <label className="form-check-label">
                            Printout- Physically Signed
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Timelines within which Opinion is Required
                        </label>
                        <br />
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="p_timelines"
                            ref={register}
                            value="Urgent, (4-5 Working Days)"

                          />
                          <label>Urgent, (4-5 Working Days)</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="p_timelines"
                            ref={register}
                            value="Regular (10-12 Working Days)"
                            defaultChecked
                          />
                          <label>Regular (10-12 Working Days)</label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Purpose for which Opinion is sought <span className="declined">*</span>
                        </label>
                        <Select
                          closeMenuOnSelect={false}
                          onChange={purPoseQuery}
                          isMulti
                          options={purpose}
                        />
                        <p style={{ "color": "red" }}>{selectError}</p>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <span className="declined">*Mandatory</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </Card>
      </Layout>
    </>
  );
}

export default AddFreshAssingment;



const ImageUploads = ({ register, control }) => {
  const { append, fields, remove } = useFieldArray({
    control,
    name: "upload",
  });
  return (
    <>
      <div className="question_query mb-2">
        <label className="form-label">Upload Your Document</label>
        <div className="btn btn-primary" onClick={() => append({ pics: "" })}>
          +
        </div>
      </div>

      {fields.map((item, index) => (
        <div className="question_query_field mb-2" key={index}>
          <input
            type="file"
            name={`upload[${index}].pics`}
            ref={register()}
            className="form-control-file manage_file"
            defaultValue={item.pics}
          />
          <div className="btn btn-primary ml-2" onClick={() => remove(index)}>
            -
          </div>
        </div>
      ))}
    </>
  );
};




// import React, { useState, useEffect } from "react";
// import Layout from "../../components/Layout/Layout";
// import { useHistory } from "react-router-dom";
// import { useForm, useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";
// import { baseUrl, ImageUrl } from "../../config/config";
// import * as yup from "yup";
// import { useAlert } from "react-alert";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Row,
//   Col,
//   Table,
// } from "reactstrap";
// import Select from "react-select";
// import { Spinner } from "reactstrap";
// import Alerts from "../../common/Alerts";
// import Swal from "sweetalert2";
// import classNames from "classnames";
// import { purpose ,assessment_year } from "./data";




// const Schema = yup.object().shape({
//   p_fact: yup.string().required("mandatory"),
//   p_case_name: yup.string().required("mandatory"),
// });


// function AddFreshAssingment(props) {
//   const alert = useAlert();
//   const history = useHistory();
//   const [load, setLoad] = useState(false);

//   const { handleSubmit, register, errors, reset, control } = useForm({
//     resolver: yupResolver(Schema),
//     defaultValues: {
//       users: [{ query: "" }],
//     },
//   });

//   const { append, remove, fields } = useFieldArray({
//     control,
//     name: "users",
//   });

//   const userId = window.localStorage.getItem("userid");
//   const category = window.localStorage.getItem("category");
//   const [selectedOption, setSelectedOption] = useState([]);
//   const [purposeOption, setPurposeOption] = useState([]);


//   const onSubmit = (value) => {
//     console.log("value :", value);
//     setLoad(true);

//     let formData = new FormData();

//     var uploadImg = value.upload;
//     if (uploadImg) {
//       for (var i = 0; i < uploadImg.length; i++) {
//         let a = value.upload[i].pics[0];
//         formData.append("upload_1[]", a);
//       }
//     }

//     formData.append("fact", value.p_fact);
//     formData.append("specific", JSON.stringify(value.users));
//     formData.append("timelines", value.p_timelines);
//     formData.append("user", JSON.parse(userId));
//     formData.append("cid", JSON.parse(category));
//     formData.append("softcopy_word", Number(value.p_format_word));
//     formData.append(
//       "softcopy_digitally_assigned",
//       Number(value.p_format_digital)
//     );
//     formData.append(
//       "printout_physically_assigned",
//       Number(value.p_format_physically)
//     );
//     formData.append("case_name", value.p_case_name);
//     formData.append("assessment_year", JSON.stringify(selectedOption));
//     formData.append("purpose", JSON.stringify(purposeOption));

//     axios
//       .post(`${baseUrl}/customers/PostQuestion`, formData, {
//         headers: {
//           "content-type": "multipart/form-data",
//         },
//       })
//       .then(function (response) {
//         console.log("res-", response);
//         console.log("msg-", response.data.message[0]);
//         if (response.data.code === 1) {
//           reset();

//           // var msg = response.data.message
//           // var variable = "Query Successfully Added"
//           // Alerts.SuccessMsg(variable, msg)

//           var message = response.data.message
//           if (message == "") {
//             Swal.fire(
//               "Success",
//               `Query successfully added.`,
//               "success"
//             )
//           } else if (message.invalid) {
//             Swal.fire({
//               title: 'Error !',
//               html: `<p class="text-danger">${message.invalid}</p>`,
//             })
//           } else if (message.faill && message.success) {
//             Swal.fire({
//               title: 'Success',
//               html: `<p class="text-danger">${message.faill}</p> <br/> <p>${message.success}</p> `,
//               icon: 'success',
//             })
//           } else if (message.success) {
//             Swal.fire({
//               title: 'Success',
//               html: `<p>${message.success}</p>`,
//               icon: 'success',
//             })
//           }
//           else if (message.faill) {
//             Swal.fire({
//               title: 'Error !',
//               html: `<p class="text-danger">${message.faill}</p>`,
//               icon: 'error',
//             })
//           }

//           props.history.push("/customer/queries");
//         } else {
//           setLoad(false);
//         }
//       })
//       .catch((error) => {
//         console.log("erroror - ", error);
//       });
//   };


//   return (
//     <Layout custDashboard="custDashboard" custUserId={userId}>
      // <Card>
      //   <CardHeader>
      //     <Row>
      //       <Col md="4">
      //         <button class="btn btn-success" onClick={() => history.goBack()}>
      //           <i class="fas fa-arrow-left mr-2"></i>
      //           Go Back
      //         </button>
      //       </Col>
      //       <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
      //         <p style={{ fontSize: "20px" }}>Add Fresh Query</p>
      //       </Col>
      //     </Row>
      //   </CardHeader>

//         <CardHeader>
//           <div class="col-xl-8 col-lg-8 col-md-12 py-4">
//             {load ? (
//               <Spinner size="sm" color="primary" />
//             ) : (
//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">Facts of the case</label>
//                       <textarea
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_fact,
//                         })}
//                         id="textarea"
//                         rows="6"
//                         name="p_fact"
//                         ref={register}
//                       ></textarea>
//                       {errors.p_fact && (
//                         <div className="invalid-feedback">
//                           {errors.p_fact.message}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="question_query mb-2">
//                       <label className="form-label">
//                         Specific Questions for advisory
//                       </label>
//                       <div
//                         className="btn btn-primary"
//                         onClick={() => append({ query: "" })}
//                       >
//                         +
//                       </div>
//                     </div>

//                     {fields.map((item, index) => (
//                       <div className="question_query_field mb-2" key={index}>
//                         <input
//                           type="text"
//                           className="form-control"
//                           ref={register}
//                           name={`users[${index}].query`}
//                           placeholder="Specify your query"
//                           defaultValue={`${item.query}`}
//                         />
//                         <div
//                           className="btn btn-primary ml-2"
//                           onClick={() => remove(index)}
//                         >
//                           -
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">Case name</label>
//                       <input
//                         type="text"
//                         name="p_case_name"
//                         ref={register}
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_case_name,
//                         })}
//                       />
//                       {errors.p_case_name && (
//                         <div className="invalid-feedback">
//                           {errors.p_case_name.message}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">Assessment year</label>
//                       <Select
//                         closeMenuOnSelect={false}
//                         onChange={setSelectedOption}
//                         isMulti
//                         options={assessment_year}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <ImageUploads register={register} control={control} />
//                   </div>

//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">
//                         Format in which Opinion is required
//                       </label>
//                       <br />
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           name="p_format_word"
//                           ref={register}
//                           defaultChecked
//                         />
//                         <label className="form-check-label">
//                           Softcopy - Word/ Pdf
//                         </label>
//                       </div>
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           name="p_format_digital"
//                           ref={register}
//                         />
//                         <label className="form-check-label">
//                           SoftCopy- Digitally Signed
//                         </label>
//                       </div>
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           name="p_format_physically"
//                           ref={register}
//                         />
//                         <label className="form-check-label">
//                           Printout- Physically Signed
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">
//                         Timelines within which Opinion is Required
//                       </label>
//                       <br />
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="p_timelines"
//                           ref={register}
//                           value="Urgent, (4-5 Working Days)"
//                         />
//                         <label>Urgent, (4-5 Working Days)</label>
//                       </div>
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="p_timelines"
//                           ref={register}
//                           value="Regular (10-12 Working Days)"
//                           defaultChecked
//                         />
//                         <label>Regular (10-12 Working Days)</label>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">
//                         Purpose for which Opinion is sought
//                       </label>
//                       <Select
//                         closeMenuOnSelect={false}
//                         onChange={setPurposeOption}
//                         isMulti
//                         options={purpose}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                   Submit
//                 </button>
//               </form>
//             )}
//           </div>
//         </CardHeader>
//       </Card>
//     </Layout>
//   );
// }

// export default AddFreshAssingment;


// const ImageUploads = ({ register, control }) => {
//   const { append, fields, remove } = useFieldArray({
//     control,
//     name: "upload",
//   });
//   return (
//     <>
//       <div className="question_query mb-2">
//         <label className="form-label">Upload Your Document</label>
//         <div className="btn btn-primary" onClick={() => append({ pics: "" })}>
//           +
//         </div>
//       </div>

//       {fields.map((item, index) => (
//         <div className="question_query_field mb-2" key={index}>
//           <input
//             type="file"
//             name={`upload[${index}].pics`}
//             ref={register()}
//             className="form-control-file manage_file"
//             defaultValue={item.pics}
//           />
//           <div className="btn btn-primary ml-2" onClick={() => remove(index)}>
//             -
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };




