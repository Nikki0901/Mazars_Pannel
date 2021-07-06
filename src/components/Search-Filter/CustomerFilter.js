import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { Select } from "antd";

function CustomerFilter(props) {
  const { Option } = Select;
  const { handleSubmit, register, errors, reset } = useForm();

  const { records,
    setRecords, setData, getData, id, query, proposal, assignment } = props;
  const [selectedData, setSelectedData] = useState([]);

  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);

  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  console.log("current_date :", current_date);
  const [item] = useState(current_date);


  useEffect(() => {
    const getSubCategory = () => {
      axios
        .get(`${baseUrl}/customers/getCategory?pid=${selectedData}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setTax2(res.data.result);
          }
        });
    };
    getSubCategory();
  }, [selectedData]);

  //handleCategory
  const handleCategory = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
    setStore2([]);
  };

  //handleSubCategory
  const handleSubCategory = (value) => {
    console.log(`sub-cat ${value}`);
    setStore2(value);
  };

  //reset category
  const resetCategory = () => {
    console.log("resetCategory ..");
    setSelectedData([]);
    setStore2([]);
    setTax2([]);
    getData();
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    setSelectedData([]);
    setStore2([]);
    getData();
  };

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("store2 :", store2);

    if (query == "query") {
      axios
        .get(
          `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&status=${data.p_status}&pcat_id=${selectedData}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
    }

    if (proposal == "proposal") {
      axios
        .get(
          `${baseUrl}/customers/getProposals?uid=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&status=${data.p_status}&pcat_id=${selectedData}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);

            }
          }
        });
    }

    if (assignment == "assignment") {
      axios
        .get(
          `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&status=${data.p_status}&pcat_id=${selectedData}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
    }
  };

  const Reset = () => {
    return (
      <>
        <button
          type="submit"
          class="btn btn-primary mx-sm-1 mb-2"
          onClick={() => resetData()}
        >
          Reset
        </button>
      </>
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-12 d-flex">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="form-inline">
                <div class="form-group mb-2">
                  <Select
                    style={{ width: 130 }}
                    placeholder="Select Category"
                    defaultValue={[]}
                    onChange={handleCategory}
                    value={selectedData}
                  >
                    <Option value="1" label="Compilance">
                      <div className="demo-option-label-item">Direct Tax</div>
                    </Option>
                    <Option value="2" label="Compilance">
                      <div className="demo-option-label-item">Indirect Tax</div>
                    </Option>
                  </Select>
                </div>

                <div class="form-group mx-sm-1  mb-2">
                  <Select
                    mode="multiple"
                    style={{ width: 250 }}
                    placeholder="Select Sub Category"
                    defaultValue={[]}
                    onChange={handleSubCategory}
                    value={store2}
                    allowClear
                  >
                    {tax2.map((p, index) => (
                      <Option value={p.id} key={index}>
                        {p.details}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <button
                    type="submit"
                    class="btn btn-primary mb-2 ml-3"
                    onClick={resetCategory}
                  >
                    X
                  </button>
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
                    max={item}
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
                    defaultValue={item}
                    max={item}
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
                      <option value="1">Inprogress</option>
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
                      <option value="1">Inprogress</option>
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
                      <option value="1">Inprogress</option>
                      <option value="2">Accepted</option>
                      <option value="3">Declined</option>
                    </select>
                  )}
                </div>

                <button type="submit" class="btn btn-primary mx-sm-1 mb-2">
                  Search
                </button>
                <Reset />

                <div class="form-group mx-sm-5 mb-2">
                  <label className="form-select form-control"
                  style={{marginLeft:"450px"}}
                  >Total Records : {records}</label>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerFilter;

// http://13.232.121.233/mazarapi/v1/customers/incompleteAssignments?user=93&cat_id=&from=2021-03-20&to=2021-03-20
{
  /* <select
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
                  </select> */
}
{
  /* <select
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
                  </select> */
}
// useEffect(() => {
// getCategory();
// }, []);

// const getCategory = () => {
//   axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
//     console.log(res);
//     if (res.data.code === 1) {
//       setTax(res.data.result);
//     }
//   });
// };

// const [store, setStore] = useState("");
// const [tax, setTax] = useState([]);
