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
  const [taxProfessionDisplay, setTaxProfessionDisplay] = useState([]);
  const [hideQuery, setHideQuery] = useState({});
  const [query, setQuery] = useState(true);
  const [queryData , setQuerData] = useState({
    queryNo: "",
    timelines: "",
  })


  const { queryNo, timelines } = queryData;

  useEffect(() => {

    getQuery();
    getTaxProfession();
    getQueryData();
  }, []);

  // http://65.1.26.136:7014/mazarrapi/v1/chec/tl/query/AssignNo/1

  const getQuery = () => {
    axios.get(`${baseUrl}/chec/tl/query/AssignNo/${id}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setQuery(false);
        setHideQuery(res.data.data);
      }
    });
  };

  const getQueryData = () => {
    axios.get(`${baseUrl}/get/by/AssignNo/${id}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setQuerData({
          queryNo: res.data.result[0].AssignNo,
          timelines: res.data.result[0].timelines,
        });
      }
    });
  };

  const getTaxProfession = () => {
    axios.get(`${baseUrl}/Get/teamleaderortaxprofession//tp`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setTaxProfessionDisplay(res.data.result);
      }
    });
  };

  const userId = window.localStorage.getItem("tlkey");
  const tpkey = window.localStorage.getItem("tpkey");


  const onSubmit = (value) => {
    console.log("value :", value);
    var date = value.p_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
    var expdeliverydate = value.p_expdeldate.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");


    let formData = new FormData();
    formData.append("who", JSON.parse(tpkey));
    formData.append("id", id);
    formData.append("user", JSON.parse(userId));
    formData.append("type", "tl");
    formData.append("types", "tp");
    formData.append("name", value.p_taxprof);
    formData.append("date", date);
    formData.append("timeline", value.p_timelines);
    formData.append("expdeliverydate", expdeliverydate);
    formData.append("assignNo", queryNo);



    axios({
      method: "POST",
      url: `${baseUrl}/Add/QueryAssignment`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("Query assigned successfully  !");
          getQuery()
          reset();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <Layout TLDashboard="TLDashboard">
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
                    <th scope="col">Tax Professional</th>
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
                        >
                          <option value="">--select--</option>
                          {taxProfessionDisplay.map((p, index) => (
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
                        <option>{hideQuery.taxprofname}</option>    
                        </select>
                      </td>
                      <td>
                        <input
                          type="date"
                          id="date"
                          value={hideQuery.dateassign}
                          disabled
                        />
                      </td>
                      <td>
                        <input type="text" ref={register} name="p_timelines" disabled/>
                      </td>
                      <td>
                        <input type="date" ref={register} name="p_expdeldate" disabled/>
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
