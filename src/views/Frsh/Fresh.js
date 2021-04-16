import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Card, CardHeader, Row, Col } from "reactstrap";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { yearOption } from "./field";
function Fresh() {
  const [specific, setSpecific] = useState([]);
  const userId = window.localStorage.getItem("userid");

  const { register, control, handleSubmit, reset } = useForm();

  useEffect(() => {
    getQuery();
  }, []);

  const getQuery = () => {
    axios.get(`${baseUrl}/customers/getQueryDetails?id=141`).then((res) => {
      console.log(res);
      console.log("result", res.data.result[0].purpose_opinion);
    });
  };

  const onSubmit = (data) => console.log("data", data);

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6">
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={[yearOption[0], yearOption[1]]}
                  isMulti
                  options={yearOption}
                />
              </div>
            </div>
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
            <input type="submit" />
          </form>
        </CardHeader>
      </Card>
    </Layout>
  );
}

export default Fresh;
