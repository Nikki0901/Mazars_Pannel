import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useHistory,useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { baseUrl } from "../../config/config";
import * as yup from "yup";
import { useAlert } from "react-alert";
import { Select } from "antd";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";


  // const defaultValues = {
  //   firstName: "bill",
  //   lastName: "luo",
  //   email: "test@test.com",
  //   isDeveloper: true
  // }


function EditQuery(props) {
  const { Option } = Select;
  const alert = useAlert();
  const history = useHistory();
  const { id } = useParams();
  const { handleSubmit, register, errors, reset, control } = useForm();

  const { append, remove, fields } = useFieldArray(
    {
    control,
    name: "users",
  },
);

  const userId = window.localStorage.getItem("userid");
  const category = window.localStorage.getItem("category");

  const [selectedData, setSelectedData] = useState([]);
  const [assessment_year, setAssementYear] = useState(null);

  const [user, setUser] = useState({
    fact: "",
    case_assement: "",
    p_Softcopy_word: "",
    p_Softcopy_digital: "",
    p_Softcopy_physical: "",
  });
  const { fact, case_assement, p_Softcopy_word,  p_Softcopy_physical } = user;




  useEffect(() => {
    getQuery();
  }, []);

  const getQuery = () => {
    axios.get(`${baseUrl}/customers/getQueryDetails?id=${id}`).then((res) => {
      console.log(res);  
      console.log("result",res.data.result[0]);  
      console.log("result",res.data.result[0].assessment_year);  
      setAssementYear(res.data.result[0].assessment_year)
      reset(res.data.result[0])    
      // setUser({
      //   fact:res.data.result[0]
      // })
    });
  };

console.log(assessment_year)

  function handleChange(value) {
    console.log(`selected ${value}`);
    setSelectedData(value);
    console.log("setSelectedData :", selectedData);
  }




  const onSubmit = (value) => {
    console.log("value",value);

    let formData = new FormData();

    formData.append("fact", value.fact_case);
    formData.append("specific", JSON.stringify(value.specific));
    formData.append("upload_1", value.p_document1[0]);
    formData.append("upload_2", value.p_document2[0]);
    formData.append("upload_3", value.p_document3[0]);                    
    formData.append("purpose", value.purpose_opinion);
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
    formData.append("case_name", value.case_name);
    formData.append("assessment_year", value.selectedData);
    formData.append("id", id);

    axios
      .post(`${baseUrl}/customers/PostEditQuestion`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {         
          alert.success("updated");
          props.history.push("/customer/queries");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
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
              <p style={{ fontSize: "20px" }}>Update Query</p>
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
                      name="fact_case"
                      ref={register}
                      // defaultValue={fact.fact_case}
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
                    ))}
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Case name</label>
                    <input
                      type="text"
                      name="case_name"
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
                      // defaultValue={['a10',`${JSON.stringify(assessment_year)}`]}
                      allowClear
                    >
                      {cars.map((p, i) => (
                        <Option key={p.year}>{p.year}</Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
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
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Purpose for which Opinion is sought
                    </label>
                    <select
                      className="form-select form-control"
                      name="purpose_opinion"
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
                        {...register("isDeveloper")}
                        // defaultValue={defaultValues.isDeveloper}
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
                        value="Urgent,(4-5 Working Days)"
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


export default EditQuery;

const Opinion = [
  { sought: "Assessment" },
  { sought: "Appeal" },
  { sought: "Filing before any Court" },
  { sought: "Filing before any Authority" },
  { sought: "Others" },  
];
const cars = [
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
