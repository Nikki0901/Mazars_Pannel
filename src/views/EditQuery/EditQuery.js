import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useHistory, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { baseUrl } from "../../config/config";
import * as yup from "yup";
import { useAlert } from "react-alert";
import { Card, CardHeader, Row, Col } from "reactstrap";
import { Spinner } from "reactstrap";
import Select from "react-select";
import Loader from "react-loader-spinner";

function EditQuery(props) {
  // const { Option } = Select;
  const alert = useAlert();
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const { handleSubmit, register, errors, reset, control, setValue } = useForm({
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

  // const [selectedData, setSelectedData] = useState("");
  const [queryDocs, setQueryDocs] = useState([]);
  const [load, setLoad] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [purposeOption, setPurposeOption] = useState([]);

  useEffect(() => {
    getQuery();
  }, []);

  const getQuery = () => {
    axios.get(`${baseUrl}/customers/getQueryDetails?id=${id}`).then((res) => {
      console.log(res);
      console.log("result", res.data.result[0]);
      console.log("result", res.data.result[0].purpose_opinion);

      // var purposeItem = res.data.result[0].purpose_opinion;
      // console.log("purposeItem-", typeof purposeItem);

      if (res) {
        // setLoad(true);

        var specific = res.data.result[0].specific_query;
        if (specific == "undefined") {
        } else var sepData = JSON.parse(specific);
        reset({
          users: sepData,
        });

        var value = res.data.result[0].assessment_year;
        var purposeItem = res.data.result[0].purpose_opinion;

        console.log("assem", value);
        try {
          var myObj = JSON.parse(value);
          var myPurpose = JSON.parse(purposeItem);

          setSelectedOption(myObj);
          setPurposeOption(myPurpose);
        } catch (e) {
          return false;
        }

        console.log("purpose", purpose);
        console.log("purpose[0]", purpose[0]);
        setValue("fact_case", res.data.result[0].fact_case);
        setValue("case_name", res.data.result[0].case_name);
        setValue("p_Softcopy_word", Boolean(+res.data.result[0].softcopy_word));
        setValue(
          "p_Softcopy_digital",
          Boolean(+res.data.result[0].softcopy_digitally_assigned)
        );
        setValue(
          "p_Softcopy_physical",
          Boolean(+res.data.result[0].printout_physically_assigned)
        );
        setValue("p_timelines", res.data.result[0].Timelines);
        setQueryDocs(res.data.queries_document);
      }
      setLoading(false);
    });
  };

  const onSubmit = (value) => {
    console.log("value", value);
    setLoading(true);
    let formData = new FormData();

    var uploadImg = value.upload;
    if (uploadImg) {
      for (var i = 0; i < uploadImg.length; i++) {
        console.log("pics", value.upload[i].pics[0]);

        let a = value.upload[i].pics[0];
        formData.append("upload_1[]", a);
      }
    }
    formData.append("fact", value.fact_case);
    formData.append("specific", JSON.stringify(value.specific));
    formData.append("timelines", value.p_timelines);
    formData.append("user", JSON.parse(userId));
    formData.append("id", id);
    formData.append("cid", JSON.parse(category));
    formData.append("softcopy_word", Number(value.p_Softcopy_word));
    formData.append(
      "softcopy_digitally_assigned",
      Number(value.p_Softcopy_digital)
    );
    formData.append(
      "printout_physically_assigned",
      Number(value.p_Softcopy_physical)
    );
    formData.append("case_name", value.case_name);
    formData.append("assessment_year", JSON.stringify(selectedOption));
    formData.append("purpose", JSON.stringify(purposeOption));

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
        } else {
          setLoading(false);
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

        {loading ? (
          <div style={{display: 'flex', justifyContent: 'center'}}><Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /></div>
        ) : (
          <CardHeader>
          <div class="col-xl-8 col-lg-8 col-md-12 py-4">
            {load ? (
              <Spinner size="sm" color="primary" />
            ) : (
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
                          name={`specific[${index}].query`}
                          defaultValue={`${item.query}`}
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
                        closeMenuOnSelect={false}
                        onChange={setSelectedOption}
                        value={selectedOption}
                        isMulti
                        options={assessment_year}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <ImageUploads register={register} control={control} />
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
                          name="p_Softcopy_word"
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
                          name="p_Softcopy_digital"
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
                          name="p_Softcopy_physical"
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
                          disabled
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
                          disabled
                        />
                        <label>Regular (10-12 Working Days)</label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Display Documents</label>
                      <br />

                      <>
                        <div>
                          <table class="table table-bordered">
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">View</th>
                            </tr>
                            {queryDocs.map((p, i) => (
                              <tr>
                                <td>{i + 1}</td>
                                <td>
                                  <a
                                    href={`http://65.0.220.156/mazarapi/assets/image/${p.name}`}
                                    target="_blank"
                                  >
                                    <i
                                      class="fa fa-photo"
                                      style={{ width: "50", height: "20" }}
                                    ></i>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </table>
                        </div>
                      </>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Purpose for which Opinion is sought
                      </label>
                      <Select
                        closeMenuOnSelect={false}
                        onChange={setPurposeOption}
                        value={purposeOption}
                        isMulti
                        options={purpose}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            )}
          </div>
        </CardHeader>
        )}
      </Card>
    </Layout>
  );
}

export default EditQuery;

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

const assessment_year = [
  {
    value: "2010-11",
    label: "2010-11",
  },
  {
    value: "2011-12",
    label: "2011-12",
  },
  {
    value: "2012-13",
    label: "2012-13",
  },
  {
    value: "2013-14",
    label: "2013-14",
  },
  {
    value: "2014-15",
    label: "2014-15",
  },
  {
    value: "2015-16",
    label: "2015-16",
  },
  {
    value: "2016-17",
    label: "2016-17",
  },
  {
    value: "2017-18",
    label: "2017-18",
  },
  {
    value: "2018-19",
    label: "2018-19",
  },
  {
    value: "2019-20",
    label: "2019-20",
  },
  {
    value: "2020-21",
    label: "2020-21",
  },
  {
    value: "2021-22",
    label: "2021-22",
  },
  {
    value: "2022-23",
    label: "2022-23",
  },
  {
    value: "2023-24",
    label: "2023-24",
  },
  {
    value: "2024-25",
    label: "2024-25",
  },
  {
    value: "2025-26",
    label: "2025-26",
  },
  {
    value: "2026-27",
    label: "2026-27",
  },
  {
    value: "2027-28",
    label: "2027-28",
  },
];

const purpose = [
  { value: "Assessment", label: "Assessment" },
  { value: "Appeal", label: "Appeal" },
  { value: "Filing before any Court", label: "Filing before any Court" },
  {
    value: "Filing before any Authority",
    label: "Filing before any Authority",
  },
  { value: "Others", label: "Others" },
];

// console.log("value :", value);

// console.log("arr", arr);
// const [user, setUser] = useState({
//   fact: "",
//   case_assement: "",
//   p_Softcopy_word: "",
//   p_Softcopy_digital: "",
//   p_Softcopy_physical: "",
// });
// const {
//   fact,
//   case_assement,
//   p_Softcopy_word,
//   p_Softcopy_digital,
//   p_Softcopy_physical,
// } = user;
{
  /* <SelectComponent
                        assessmentYear={assessmentYear}
                        updateValue={updateValue}
                      /> */
}
