import { useForm, useFieldArray } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useAlert } from "react-alert";
import { Form, Input, Button, Space, Select } from "antd";

// const Schema = yup.object().shape({
//   p_sought: yup.string().required("required sought"),
//   p_opinion: yup.string().required("required expert"),
// });

function Questionnaire(props) {
  const alert = useAlert();
  const { Option } = Select;
  const { handleSubmit, register, errors, reset, control } = useForm();

  const [selectedData, setSelectedData] = useState("");
  const [multipleFiles, setMultipleFiles] = useState("");

  // const [id, setId] = useState('');
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);

  const { append, remove, fields } = useFieldArray({
    control,
    name: "specific",
  });

  const userId = window.localStorage.getItem("userid");
  const category = window.localStorage.getItem("category");
  const userNameId = window.localStorage.getItem("name");

  //alert msg
  const Msg = () => {
    return (
      <>
        <p style={{ fontSize: "12px" }}>Query successfully added!</p>
      </>
    );
  };



  function handleChange(value) {
    console.log(`selected ${value}`);
    setSelectedData(value);
    console.log("setSelectedData :", selectedData);
  }

  const onSubmit = (value) => {
    console.log("value :", value);
    setMultipleFiles(value.p_document1);

    let formData = new FormData();
    for (var i = 0; i < value.upload.length; i++) {
      console.log("pics", value.upload[i].pics[0]);

      let a = value.upload[i].pics[0];
      formData.append("upload_1", a);
    }

    formData.append("fact", value.p_fact);
    formData.append("specific", JSON.stringify(value.specific));
    formData.append("purpose", value.p_purpose);
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
    formData.append("assessment_year", selectedData);

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
          alert.success(<Msg />);
          props.history.push("/customer/dashboard");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  const SuccessMesg = () => {
    return (
      <>
        <Modal isOpen={modal} toggle={toggle} size="sm">
          <ModalHeader toggle={toggle}></ModalHeader>

          <div
            style={{
              textAlign: "center",
              paddingTop: "5px",
              fontWeight: "bold",
              background: "green",
            }}
          >
            <h2>User ID</h2>
          </div>

          <ModalBody>
            <br />
            <div class="modal-body">
              <h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>
                {JSON.parse(userNameId)}
              </h1>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Header id={JSON.parse(userNameId)} />
      <div className="container">
        {SuccessMesg()}
        <div className="form">
          <div className="heading">
            <h2>Basic Questionnaire</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Facts of the case</label>
                  <textarea
                    className="form-control"
                    id="textarea"
                    rows="6"
                    name="p_fact"
                    ref={register}
                  ></textarea>
                </div>
              </div>

              <div className="col-md-6">
                <div className="question_query mb-2">
                  <label className="form-label">
                    Specific Questions for advisory
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
                        <div className="question_query_field mb-2" key={index}>
                          <input
                            type="text"
                            className="form-control"
                            ref={register}
                            name={`specific[${index}].query`}
                            placeholder="Specify your query"
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
                <ImageUploads register={register} control={control} />
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Purpose for which Opinion is sought
                  </label>
                  <select
                    className="form-select form-control"
                    name="p_purpose"
                    aria-label="Default select example"
                    ref={register}
                  >
                    <option value="">--select--</option>
                    {Opinion.map((p, i) => (
                      <option key={i} value={p.sought}>
                        {p.sought}
                      </option>
                    ))}
                  </select>
                </div>
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
                    mode="tags"
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    allowClear
                  >
                    {assessment_year.map((p, i) => (
                      <Option key={p.year}>{p.year}</Option>
                    ))}
                  </Select>
                </div>
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
                      // value="1"
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
                      // value="1"
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
                      // value="1"
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
                      defaultChecked
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
                    />
                    <label>Regular (10-12 Working Days)</label>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Questionnaire;

const Opinion = [
  { sought: "Assessment" },
  { sought: "Appeal" },
  { sought: "Filing before any Court" },
  { sought: "Filing before any Authority" },
  { sought: "Others" },
];

const assessment_year = [
  {
    year: "2010-11",
  },
  {
    year: "2011-12",
  },
  {
    year: "2012-13",
  },
  {
    year: "2013-14",
  },
  {
    year: "2014-15",
  },
  {
    year: "2015-16",
  },
  {
    year: "2016-17",
  },
  {
    year: "2017-18",
  },
  {
    year: "2018-19",
  },
  {
    year: "2019-20",
  },
  {
    year: "2020-21",
  },
  {
    year: "2021-22",
  },
  {
    year: "2022-23",
  },
  {
    year: "2023-24",
  },
  {
    year: "2024-25",
  },
  {
    year: "2025-26",
  },
  {
    year: "2026-27",
  },
  {
    year: "2027-28",
  },
];


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
            className="form-control-file"
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

//   const onSubmit = (value) => {
//     console.log("value :", value);

//     let formData = new FormData();
//     formData.append("draft_report", value.p_draft[0]);

//     axios.post(`${baseUrl}/customers/PostQuestion`, formData, {
//       headers: {
//         'content-type': 'multipart/form-data'
//       }
//     }).then(response => {
//       console.log(response.data)
//       alert.success("draft Report uploaded !");
//     });

// };

// let reader = new FileReader();
// reader.readAsDataURL(value.p_document[0]);

// reader.onload = (e) => {
// console.log(e.target.result)
// files = e.target.result
// }

{
  /* <div className="mb-3">
            <label className="form-label"> Specific Questions</label>
            <input
              type="text"
              className="form-control"
              name="p_specific"
              ref={register}
              placeholder="Enter Purpose"
            />
            </div> */
}

// function onFileUpload(event) {
//   event.preventDefault();
//   // Get the file Id
//   let id = event.target.id;
//   // Create an instance of FileReader API
//   let file_reader = new FileReader();
//   // Get the actual file itself
//   let file = event.target.files[0];
//   file_reader.onload = () => {
//   // After uploading the file
//   // appending the file to our state array
//   // set the object keys and values accordingly
//     setFiles([...files, { file_id: id, uploaded_file: file_reader.result }]);
//   };
//  // reading the actual uploaded file
//   file_reader.readAsDataURL(file);
// }

// const file = data.image[0];
//     const storageRef = app.storage().ref();
//     const fileRef = storageRef.child(file.name);
//     fileRef.put(file).then(() => {
//       console.log("Uploaded a file");
//     });

{
  /* <div className="mb-3">
                <div className="question_query mb-2">
                  <label className="form-label">
                    Specific Query (ies) for advisory
                  </label>
                  <div
                    className="btn btn-primary"
                    onClick={() => append({ query: "" })}
                  >
                    +
                  </div>
                </div>

                {fields.map((item, index) => (
                  <div className="question_query_field mb-2" key={index}>
                    <input
                      type="text"
                      className="form-control"
                      ref={register}
                      name={`users[${index}].query`}
                      placeholder="Specify your query"
                    />
                    <div
                      className="btn btn-primary ml-2"
                      onClick={() => remove(index)}
                    >
                      -
                    </div>
                  </div>
                ))}
              </div> */
}

//   <div className="form-check">
//   <input
//     className="form-check-input"
//     type="radio"
//     name="p_format"
//     ref={register}
//     value="Softcopy - Word/ Pdf"
//     defaultChecked
//   />
//   <label>Softcopy - Word/ Pdf</label>
// </div>
// <div className="form-check">
//   <input
//     className="form-check-input"
//     type="radio"
//     name="p_format"
//     ref={register}
//     value="SoftCopy- Digitally Signed"
//   />

//   <label>SoftCopy- Digitally Signed</label>
// </div>
// <div className="form-check">
//   <input
//     className="form-check-input"
//     type="radio"
//     name="p_format"
//     ref={register}
//     value="Printout- Physically Signed"
//   />

//   <label>Printout- Physically Signed</label>
// </div>
