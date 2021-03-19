import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useParams ,useHistory} from "react-router-dom";
import { useAlert } from "react-alert";
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

function QueryAssingment() {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();

  const { id } = useParams();
  const history = useHistory();

  const [taxProfessionDisplay, setTaxProfessionDisplay] = useState([]);
  const [hideQuery, setHideQuery] = useState({
    name: "",
    timeline: "",
    date_allocation: "",
    expdeliverydate: "",
  });

  const [query, setQuery] = useState(true);
  const userId = window.localStorage.getItem("tlkey");
  const tpkey = window.localStorage.getItem("tpkey");

  const [queryData, setQuerData] = useState({
    queryNo: "",
    timelines: "",
    custId: "",
  });

  const { queryNo, timelines, custId } = queryData;

  useEffect(() => {
    getTaxProfession();
    getQueryData();
  }, []);

  const getTaxProfession = () => {
    axios
      .get(`${baseUrl}/tp/getTaxProfessional?tl_id=${JSON.parse(userId)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTaxProfessionDisplay(res.data.result);
        }
      });
  };

  const getQueryData = () => {
    axios.get(`${baseUrl}/tl/GetQueryDetails?id=${id}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setQuerData({
          queryNo: res.data.result[0].assign_no,
          timelines: res.data.result[0].Timelines,
          custId: res.data.result[0].customer_id,
        });
      }
    });
  };

  useEffect(() => {
    getQuery();
  }, [queryNo]);

  const getQuery = () => {
    axios
      .get(`${baseUrl}/tl/TlCheckIfAssigned?assignno=${queryNo}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setQuery(false);
          // setHideQuery(res.data.meta);
          setHideQuery({
            name: res.data.meta[0].name,
            timeline: res.data.meta[0].timeline,
            date_allocation: res.data.meta[0].date_allocation,
            expdeliverydate: res.data.meta[0].expdeliverydate,
          });
        }
      });
  };

  const onSubmit = (value) => {
    console.log("value :", value);
    // var date = value.p_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
    var expdeliverydate = value.p_expdeldate.replace(
      /(\d\d)\/(\d\d)\/(\d{4})/,
      "$3-$1-$2"
    );

    let formData = new FormData();
    formData.append("who", JSON.parse(tpkey));
    formData.append("id", id);
    formData.append("user", JSON.parse(userId));
    formData.append("type", "tl");
    formData.append("types", "tp");
    formData.append("name", value.p_taxprof);
    // formData.append("date", date);
    formData.append("timeline", value.p_timelines);
    formData.append("expdeliverydate", expdeliverydate);
    formData.append("assignNo", queryNo);
    formData.append("customer_id", custId);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/AddQueryAssignment`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("assigned  !");
          getQuery();
          reset();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  console.log(hideQuery);

  return (
    <Layout TLDashboard="TLDashboard">
       <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button
                class="btn btn-success ml-3"
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </Col>
            <Col md="4">
              <div style={{ textAlign: "center" }}>
                <h2>Query Allocation</h2>
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
        <div class="row mt-3">
        <div class="col-xl-12 col-lg-12 col-md-12">
         
          <div class="col-md-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Query No.</th>
                    <th scope="col">Tax Professional</th>
                    {/* <th scope="col">Date of Allocation</th> */}
                    <th scope="col">Expected Timeline</th>
                    <th scope="col">Exp. Delivery Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {query ? (
                    <tr>
                      <th scope="row">{queryNo}</th>
                      <td>
                        <select
                          class="form-control"
                          name="p_taxprof"
                          ref={register}
                        >
                          <option value="">--select--</option>
                          {taxProfessionDisplay.map((p, index) => (
                            <option key={index} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      {/* <td>
                        <input type="date" ref={register} name="p_date" />
                      </td> */}
                      <td>
                        <input
                          type="text"
                          ref={register}
                          name="p_timelines"
                          value={timelines}
                          class="form-control"
                        />
                      </td>
                      <td>
                        <input
                         type="date" 
                         ref={register} 
                         name="p_expdeldate" 
                         class="form-control"
                         />
                      </td>

                      <td>
                        <button type="submit" class="btn btn-success">
                          Assign
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <th scope="row">{queryNo}</th>
                      <td>
                        <select class="form-control w-75 p-0" disabled>
                          <option>{hideQuery.name}</option>
                        </select>
                      </td>
                      
                      <td>
                        <input
                          type="text"
                          ref={register}
                          name="p_timelines"
                          value={hideQuery.timeline}
                          disabled
                          class="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          ref={register}
                          name="p_expdeldate"
                          value={hideQuery.expdeliverydate}
                          disabled
                          class="form-control"
                        />
                      </td>

                      <td>
                        <button class="btn btn-success" disabled>
                          Assigned
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
        </CardHeader>
        </Card>
     
    </Layout>
  );
}

export default QueryAssingment;

const taxprof = [
  {
    id: "1",
    name: "harry",
  },
  {
    id: "2",
    name: "martin",
  },
  {
    id: "3",
    name: "mayur",
  },
];
