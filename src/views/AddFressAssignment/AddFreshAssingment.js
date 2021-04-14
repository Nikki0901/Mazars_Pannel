import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useHistory } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { baseUrl } from "../../config/config";
import * as yup from "yup";
import { useAlert } from "react-alert";
import { Form, Input, Button, Space, Select } from "antd";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import _ from "lodash";

function AddFreshAssingment(props) {
  const { Option } = Select;
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
  const [selectedData, setSelectedData] = useState("");

  function handleChange(value) {
    console.log(`selected ${value}`);
    setSelectedData(value);
    console.log("setSelectedData :", selectedData);
  }

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();

    var uploadImg = value.upload;
    for (var i = 0; i < uploadImg.length; i++) {
      console.log("pics", value.upload[i].pics[0]);
      let a = value.upload[i].pics[0];
      formData.append("upload_1[]", a);
    }

    formData.append("fact", value.p_fact);
    formData.append("specific", JSON.stringify(value.users));
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
          props.history.push("/customer/queries");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  const Msg = () => {
    return (
      <>
        <p style={{ fontSize: "12px" }}>Query successfully added!</p>
      </>
    );
  };

  return (
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

        <CardHeader>
          <div class="col-xl-8 col-lg-8 col-md-12 py-4">
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

                  {fields.map((item, index) => (
                    <div className="question_query_field mb-2" key={index}>
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
        </CardHeader>
      </Card>
    </Layout>
  );
}

export default AddFreshAssingment;

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


// console.log("arr",arr);

// for (let i = 0; i < multipleFiles.length; i++) {
//   formData.append('upload_1', multipleFiles[i]);
// }

{
  /* <div className="question_query mb-2">
                  <label className="form-label">
                    multiple upload
                  </label>
                  <div
                    className="btn btn-primary"
                    onClick={() => append({ img: "" })}
                  >
                    +
                  </div>
                </div>

                {fields.length > 0 &&
                  fields.map((item, i) => (
                    <div className="question_query_field mb-2" key={i}>
                      <input
                        type="text"
                        className="form-control"
                        ref={register}
                        name={`pics[${i}].img`}
                        placeholder="img"
                      />
                      <div
                        className="btn btn-primary ml-2"
                        onClick={() => remove(i)}
                      >
                        -
                      </div>
                    </div>
                  ))} */
}

// const children = [];
// for (let i = 1; i < 20; i++) {
//   children.push(
//     <Option key={i}>{i}</Option>
//   );
// }
{
  /* <select
                    className="form-select form-control"
                    name="p_assessment_year"
                    aria-label="Default select example"
                    ref={register}
                  >
                    <option value="">--select--</option>
                    <option value="2010">2010</option>
                   
                  </select> */
}

{
  /* <div className="mb-3">
                    <label className="form-label">Upload Your Document</label>
                    <input
                      type="file"
                      name="p_document1"
                      ref={register}
                      className="form-control-file"
                    />
                    <input
                      type="file"
                      name="p_document2"
                      ref={register}
                      className="form-control-file"
                    />
                    <input
                      type="file"
                      name="p_document3"
                      ref={register}
                      className="form-control-file"
                    />
                  </div> */
}
{
  /* <div className="card mb-4">
        {fields.map((item, index) => (
          <div className="form-row form-group" key={item.id}>
            <div className="col">
              <input
                type="file"
                name={`upload[${index}].pics`}
                ref={register()}
                className="form-control-file"
                defaultValue={item.pics}
              />
            </div>

            <div className="col">
              <button className="btn btn-danger" onClick={() => remove(index)}>
                -
              </button>
            </div>
          </div>
        ))}

        <button
          className="btn btn-primary"
          onClick={() =>
            append({
              pics: "",
            })
          }
        >
          +
        </button>
      </div>
   
    */
}
