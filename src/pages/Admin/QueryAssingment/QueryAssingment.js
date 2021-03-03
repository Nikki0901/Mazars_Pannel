import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";



function QueryAssingment() {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();
  const { id } = useParams();
  const [taxLeaderDisplay, setTaxLeaderDisplay] = useState([]);
  const [query, setQuery] = useState(true);

    const [hideQuery, setHideQuery] = useState({
    name:"",
    timeline:"",
    date_allocation:"",
    expdeliverydate:"",
  });

  
  const userId = window.localStorage.getItem("adminkey");
  const tlkey = window.localStorage.getItem("tlkey");

  const [queryData , setQuerData] = useState({
    queryNo: "",
    timelines: "",
    custId: "",
  })

  const { queryNo, timelines , custId } = queryData;

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
      }
    });
  };

  useEffect(() => {
    getQuery();
  }, [queryNo]);

  
  const getQuery = () => {
    axios.get(`${baseUrl}/tl/CheckIfAssigned?assignno=${queryNo}`).then((res) => {
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



  const onSubmit = (value) => {
    console.log("value :", value);
    var date = value.p_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
    var expdeliverydate = value.p_expdeldate.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");

    let formData = new FormData();
    formData.append("who", JSON.parse(tlkey));
    formData.append("id", id);
    formData.append("user", JSON.parse(userId));
    formData.append("type", "admin");
    formData.append("types", "tl");
    formData.append("name", value.p_taxprof);
    formData.append("date", date);
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
          alert.success("Query successfully assigned!");     
          getQuery()
          reset();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  // console.log(hideQuery)
  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>
      <div class="row mt-3">
        <div class="col-xl-12 col-lg-12 col-md-12">
          <div class="">
            <h2>Query Assignment</h2>
          </div>
          <br />
          <br />
          <div class="col-md-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Query No.</th>
                    <th scope="col">Team Leaders</th>
                    <th scope="col">Date of Allocation</th>
                    <th scope="col">Timeline</th>
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
                          class="form-control w-75 p-0"
                          name="p_taxprof"
                          ref={register}
                          // onChange={(e) => setTeamLeader(e.target.value)}
                        >
                          <option value="">-select-</option>
                          {taxLeaderDisplay.map((p, index) => (
                            <option key={index} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input type="date" ref={register} name="p_date" />
                      </td>
                      <td>
                        <input type="text" ref={register} name="p_timelines" defaultValue={timelines} />
                      </td>
                      <td>
                        <input type="date" ref={register} name="p_expdeldate" />
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
                          type="date"
                          id="date"
                          value={hideQuery.date_allocation}
                          disabled
                        />
                      </td>
                      <td>
                        <input type="text" ref={register} name="p_timelines"     
                         value={hideQuery.timeline}disabled/>
                      </td>
                      <td>
                        <input type="date" ref={register} name="p_expdeldate" 
                           value={hideQuery.expdeliverydate} disabled/>
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
    </Layout>
  );
}

export default QueryAssingment;

  // name:dfd
    // timeline:dfs
    // expdeliverydate:2021-01-02
    // assignNo:dsf
    // date:2021-01-02
    // user:1
    // type:admin
    // who:1
    // types:tl