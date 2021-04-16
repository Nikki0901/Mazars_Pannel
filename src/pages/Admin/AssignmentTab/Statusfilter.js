import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Select } from "antd";
import { useForm } from "react-hook-form";

function Statusfilter({ setData, getData }) {
  const { Option, OptGroup } = Select;
  const { handleSubmit, register, errors, reset } = useForm();

  const [selectedData, setSelectedData] = useState([]);

  //handleCategory
  const handleCategory = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
  };

  const onSubmit = (data) => {
    console.log("selectedData :", selectedData);
    // axios
    //   .get(
    //     `${baseUrl}/tl/getAssignments?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.p_status}`
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     if (res.data.code === 1) {
    //       if (res.data.result) {
    //         setAssignmentDisplay(res.data.result);
    //       }
    //     }
    //   });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          mode="multiple"
          style={{ width: 210 }}
          placeholder="Select stages"
          defaultValue={[]}
          onChange={handleCategory}
          value={selectedData}
        >
          <Option value="1" label="Compilance">
            <div className="demo-option-label-item">Client Discussion</div>
          </Option>
          <Option value="2" label="Compilance">
            <div className="demo-option-label-item">Draft report</div>
          </Option>
          <Option value="3" label="Compilance">
            <div className="demo-option-label-item">Final Discussion</div>
          </Option>
          <Option value="4" label="Compilance">
            <div className="demo-option-label-item">Delivery of report</div>
          </Option>
          <Option value="5" label="Compilance">
            <div className="demo-option-label-item">Completed</div>
          </Option>
        </Select>

        <button type="submit" class="btn btn-primary mx-sm-1 mb-2">
          Search
        </button>
      </form>
    </div>
  );
}

export default Statusfilter;
