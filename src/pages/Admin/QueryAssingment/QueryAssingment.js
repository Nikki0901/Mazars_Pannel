import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useParams, Link, Redirect } from "react-router-dom";
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

function QueryAssingment(props) {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();
  const { id } = useParams();

  const [taxLeaderDisplay, setTaxLeaderDisplay] = useState([]);
  const [teamID, setTeamID] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [query, setQuery] = useState(true);

  const [expectedDate, setExpectedDate] = useState("");

  const [hideQuery, setHideQuery] = useState({
    name: "",
    timeline: "",
    date_allocation: "",
    expdeliverydate: "",
  });

  const userId = window.localStorage.getItem("adminkey");
  const tlkey = window.localStorage.getItem("tlkey");

  const [queryData, setQuerData] = useState({
    queryNo: "",
    timelines: "",
    custId: "",
  });

  const { queryNo, timelines, custId } = queryData;

  useEffect(() => {
    getTaxLeader();
    getQueryData();
  }, []);

  const getTaxLeader = () => {
    axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setTaxLeaderDisplay(res.data.result);
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
        // expectedDeliveryDate(res.data.result[0].Timelines);
      }
    });
  };

  useEffect(() => {
    getQuery();
  }, [queryNo]);

  const getQuery = () => {
    axios
      .get(`${baseUrl}/tl/CheckIfAssigned?assignno=${queryNo}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setQuery(false);
          setHideQuery({
            name: res.data.meta[0].name,
            timeline: res.data.meta[0].timeline,
            date_allocation: res.data.meta[0].date_allocation,
            expdeliverydate: res.data.meta[0].expdeliverydate,
          });
        }
      });
  };

  const handleChange = (e) => {
    console.log("val-", e.target.value);
    setTeamID(e.target.value);
    var value = taxLeaderDisplay.filter(function (item) {
      return item.id == e.target.value;
    });
    console.log(value[0].name);
    setTeamName(value[0].name);
  };

  const onSubmit = (value) => {
    console.log("value :", value);
    var expdeliverydate = value.p_expdeldate.replace(
      /(\d\d)\/(\d\d)\/(\d{4})/,
      "$3-$1-$2"
    );

    let formData = new FormData();
    formData.append("who", teamID);
    formData.append("id", id);
    formData.append("user", JSON.parse(userId));
    formData.append("type", "admin");
    formData.append("types", "tl");
    formData.append("name", teamName);
    formData.append("timeline", value.p_timelines);
    formData.append("expdeliverydate", value.p_expdeldate);
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
          alert.success("assigned!");
          getQuery();
          props.history.push({
            pathname: `/admin/queriestab`,
            index: 1,
          });
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  const expectedDeliveryDate = (key) => {
    console.log("timlines : ", key);

    const d = new Date();

    if (key == "Urgent, (4-5 Working Days)") {
      const d2 = new Date(d.getTime() + 432000000);
      const new_date =
        d2.getFullYear() + "-" + (d2.getMonth() + 1) + "-" + d2.getDate();
      // d2.getDate() + "/" + (d2.getMonth() + 1) + "/" + d2.getFullYear();

      console.log("Urgent:", new_date);
      setExpectedDate(new_date);
    } else if (key == "Regular (10-12 Working Days)") {
      const d2 = new Date(d.getTime() + 1296000000);
      const new_date =
        d2.getFullYear() + "-" + (d2.getMonth() + 1) + "-" + d2.getDate();
      console.log("regular:", new_date);
      setExpectedDate(new_date);
    }
  };

  console.log("expectedDate",expectedDate)
  
  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <Link
                to={{
                  pathname: `/admin/queriestab`,
                  index: 1,
                }}
              >
                <button class="btn btn-success ml-3">
                  <i class="fas fa-arrow-left mr-2"></i>
                  Go Back
                </button>
              </Link>
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
            <div class="col-md-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Query No.</th>
                      <th scope="col">Team Leaders</th>
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
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">-select-</option>
                            {taxLeaderDisplay.map((p, index) => (
                              <option key={index} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </td>

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
                            // defaultValue={expectedDate}
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
                            class="form-control"
                            value={hideQuery.timeline}
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            ref={register}
                            name="p_expdeldate"
                            class="form-control"
                            value={hideQuery.expdeliverydate}
                            disabled
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
        </CardHeader>
      </Card>
    </Layout>
  );
}

export default QueryAssingment;

// <Card>
//         <CardHeader>
//           <Row>
//             <Col md="4">
//               <button
//                 class="btn btn-success ml-3"
//                 onClick={() => history.goBack()}
//               >
//                 <i class="fas fa-arrow-left mr-2"></i>
//                 Go Back
//               </button>
//             </Col>
//             <Col md="8">
//               <h4>Add Assignment Stages (Max 5)</h4>
//             </Col>
//           </Row>
//         </CardHeader>
//         <CardHeader></CardHeader>
//       </Card>

// d2.getDate() + "/" + (d2.getMonth() + 1) + "/" + d2.getFullYear();
// <Link
//   to={{
//     pathname: `/admin/queriestab`,
//     index: 1,
//   }}
// />;

// <Redirect
//   to={{
//     pathname: `/admin/queriestab`,
//     index: 1,
//   }}
// />;
