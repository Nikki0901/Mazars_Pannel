import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";

function PendingForAcceptence({ CountPendingForAcceptence, updateTab }) {
  const alert = useAlert();
  const userid = window.localStorage.getItem("tlkey");

  const [pendingData, setPendingData] = useState([]);
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    getPendingforAcceptance();
  }, []);

  const getPendingforAcceptance = () => {
    axios
      .get(`${baseUrl}/tl/pendingQues?id=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setPendingData(res.data.result);
          CountPendingForAcceptence(res.data.result.length);
        }
      });
  };

  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "50px" };
      },
    },
    {
      text: "Date",
      dataField: "query_created",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.query_created);
        var oldDate = row.query_created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Query No",
      dataField: "assign_no",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return (
          <>
            <Link to={`/teamleader/queries/${row.id}`}>{row.assign_no}</Link>
          </>
        );
      },
    },
    {
      text: "Category",
      dataField: "parent_id",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Sub Category",
      dataField: "cat_name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Customer Name",
      dataField: "name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "	Exp. Delivery Date",
      dataField: "Exp_Delivery_Date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.Exp_Delivery_Date);
        var oldDate = row.Exp_Delivery_Date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Accept / Reject",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                color: "#6967ce",
                cursor: "pointer",
              }}
              id="div1"
            >
              <div
                id="accept"
                title="Accept Assignment"
                onClick={() => acceptHandler(row)}
              >
                <i
                  class="fa fa-check"
                  style={{ color: "green", fontSize: "16px" }}
                ></i>
              </div>
              <div
                id="reject"
                title="Reject Assignment"
                onClick={() => rejectHandler(row)}
              >
                <i
                  class="fa fa-times"
                  style={{ color: "red", fontSize: "16px" }}
                ></i>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  const acceptHandler = (key) => {
    console.log("acceptHandler", key);

    let formData = new FormData();
    formData.append("set", 1);
    formData.append("tlid", JSON.parse(userid));
    formData.append("assignment_id", key.id);
    formData.append("allocation_id", key.allocation_id);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/AcceptRejectQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("response-", response);
        if (response.data.code === 1) {
          alert.success("Query accepted !");
          getPendingforAcceptance();
          updateTab(1);
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  const rejectHandler = (key) => {
    console.log("rejectHandler", key);

    let formData = new FormData();
    formData.append("set", 0);
    formData.append("tlid", JSON.parse(userid));
    formData.append("assignment_id", key.id);
    formData.append("allocation_id", key.allocation_id);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/AcceptRejectQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("Query rejected !");
          getPendingforAcceptance();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <TeamFilter
            setData={setPendingData}
            getData={getPendingforAcceptance}
            pendingForAcceptence="pendingForAcceptence"
          />
        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={pendingData}
            columns={columns}
            rowIndex
          />
        </CardBody>
      </Card>
    </>
  );
}

export default PendingForAcceptence;

{
  /* <button onClick={() => update(1)}>go to 1st tab</button> */
}
// http://13.232.121.233/mazarapi/v1/tl/AcceptRejectQuery

// axios.post(`${baseUrl}/tl/AcceptRejectQuery`, formData)
// .then(res => {
//   console.log(res);
//   if (res.data.code === 1) {
//     alert.success("Query rejected!");
//     getPendingforAcceptance();
//   }
// });

// set: 1
// tlid: 128
// assignment_id: 11
// allocation_id: 36
