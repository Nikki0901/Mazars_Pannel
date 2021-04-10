import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";

function CustomerFilter(props) {
  const { handleSubmit, register, errors, reset } = useForm();

  const { setData, getData, id, query, proposal, assignment } = props;
  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);

  const [store, setStore] = useState("");
  const [store2, setStore2] = useState('');

 

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    getData();
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setTax(res.data.result);
      }
    });
  };

  useEffect(() => {
    const getSubCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=${store}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax2(res.data.result);
        }
      });
    };
    getSubCategory();
  }, [store]);

  // //reset category
  // const resetCategory = () => {
  //   console.log("resetData ..");
  //   setSelectedData([]);
  //   getData();
  // };

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("store2 :", store2);

    if (query == "query") {
      axios
        .get(
          `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${
            data.p_dateTo
          }&status=${data.p_status}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
            }
          }
        });
    }

    if (proposal == "proposal") {
      axios
        .get(
          `${baseUrl}/customers/getProposals?uid=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${
            data.p_dateTo
          }&status=${data.p_status}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
            }
          }
        });
    }

    if (assignment == "assignment") {
      axios
        .get(
          `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${
            data.p_dateTo
          }&status=${data.p_status}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
            }
          }
        });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-12 d-flex">
          <form class="form-inline" onSubmit={handleSubmit(onSubmit)}>
            <div class="form-group mb-2">
              <select
                className="form-select form-control"
                name="p_tax"
                ref={register}
                style={{ height: "35px" }}
                onChange={(e) => setStore(e.target.value)}
              >
                <option value="">--Select Category--</option>
                {tax.map((p, index) => (
                  <option key={index} value={p.id}>
                    {p.details}
                  </option>
                ))}
              </select>
            </div>

            <div class="form-group mx-sm-1  mb-2">
              <select
                className="form-select form-control"
                name="p_tax2"
                ref={register}
                style={{ height: "35px" }}
                onChange={(e) => setStore2(e.target.value)}
              >
                <option value="">--Select Sub-Category--</option>
                {tax2.map((p, index) => (
                  <option key={index} value={p.id}>
                    {p.details}
                  </option>
                ))}
              </select>
            </div>

            <div class="form-group mx-sm-1  mb-2">
              <label className="form-select form-control">From</label>
            </div>

            <div class="form-group mx-sm-1  mb-2">
              <input
                type="date"
                name="p_dateFrom"
                className="form-select form-control"
                ref={register}
              />
            </div>

            <div class="form-group mx-sm-1  mb-2">
              <label className="form-select form-control">To</label>
            </div>

            <div class="form-group mx-sm-1  mb-2">
              <input
                type="date"
                name="p_dateTo"
                className="form-select form-control"
                ref={register}
              />
            </div>

            <div class="form-group mx-sm-1  mb-2">
              {query == "query" && (
                <select
                  className="form-select form-control"
                  name="p_status"
                  ref={register}
                  style={{ height: "33px" }}
                >
                  <option value="">--select--</option>
                  <option value="1">Progress</option>
                  <option value="2">Complete</option>
                </select>
              )}

              {assignment == "assignment" && (
                <select
                  className="form-select form-control"
                  name="p_status"
                  ref={register}
                  style={{ height: "33px" }}
                >
                  <option value="">--select--</option>
                  <option value="1">InProgress</option>
                  <option value="2">Complete</option>
                </select>
              )}
              {proposal == "proposal" && (
                <select
                  className="form-select form-control"
                  name="p_status"
                  ref={register}
                  style={{ height: "33px" }}
                >
                  <option value="">--select--</option>
                  <option value="1">Pending</option>
                  <option value="2">Accepted</option>
                  <option value="3">Declined</option>
                </select>
              )}
            </div>
            <button type="submit" class="btn btn-primary mx-sm-1 mb-2">
              Search
              {/* <i class="fa fa-search"></i> */}
            </button>

            <button
              type="submit"
              class="btn btn-primary mx-sm-1 mb-2"
              onClick={resetData}
            >
              Reset
              {/* <i class="fa fa-refresh"></i> */}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CustomerFilter;

// http://13.232.121.233/mazarapi/v1/customers/incompleteAssignments?user=93&cat_id=&from=2021-03-20&to=2021-03-20

{
  /* <div class="form-group mb-2 ml-1">
              {query == "query" && (
                  <select
                    className="form-select form-control"
                    name="p_status"
                    ref={register}
                    style={{ height: "33px" }}
                  >
                    <option value="">--select--</option>
                    <option value="1">Inprogress</option>
                    <option value="2">Progress</option>
                    <option value="3">Complete</option>
                  </select>
                )}

                {assignment == "assignment" && (
                  <select
                    className="form-select form-control"
                    name="p_status"
                    ref={register}
                    style={{ height: "33px" }}
                  >
                    <option value="">--select--</option>
                    <option value="1">InProgress</option>
                    <option value="2">Complete</option>
                  </select>
                )}
                {proposal == "proposal" && (
                  <select
                    className="form-select form-control"
                    name="p_status"
                    ref={register}
                    style={{ height: "33px" }}
                  >
                    <option value="">--select--</option>
                    <option value="1">Pending</option>
                    <option value="2">Accepted</option>
                    <option value="3">Declined</option>
                  </select>
                )}
              </div> */
}
