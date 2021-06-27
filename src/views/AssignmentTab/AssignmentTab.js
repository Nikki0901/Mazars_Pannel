import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import { Link, useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import PaymentModal from "./PaymentModal";
import * as Cookies from "js-cookie";
import RejectedModal from "./RejectModal";
import { useAlert } from "react-alert";

function AssignmentTab() {
  const history = useHistory();
  const alert = useAlert();
  const userId = window.localStorage.getItem("userid");
  const [assignmentDisplay, setAssignmentDisplay] = useState([]);
  const [assignmentCount, setAssignmentQueries] = useState("");
  const [records, setRecords] = useState([]);

  const [baseMode, SetbaseMode] = useState("avc");
  const [transcode, SetTranscode] = useState("interop");
  const [attendeeMode, SetAttendeeMode] = useState("video");
  const [videoProfile, SetVideoProfile] = useState("480p_4");

  const [rejectedItem, setRejectedItem] = useState({});
  const [pay, setPay] = useState({
    pay: "",
    amount: "",
    accepted_amount: "",
    paid_amount: "",
  });

  const [addPaymentModal, setPaymentModal] = useState(false);
  const paymentHandler = (key) => {
    console.log("key", key);
    setPaymentModal(!addPaymentModal);
    setPay({
      amount: key.accepted_amount,
      id: key.id,
      accepted_amount: key.accepted_amount,
      paid_amount: key.paid_amount,
    });
  };

  const [rejectModal, setRejectModal] = useState(false);
  const rejectHandler = (key) => {
    console.log("key", key);
    setRejectModal(!rejectModal);
    setRejectedItem(key);
  };

  useEffect(() => {
    getAssignmentData();
  }, []);

  const getAssignmentData = () => {
    axios
      .get(
        `${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setAssignmentDisplay(res.data.result);
          setAssignmentQueries(res.data.result.length);
          setRecords(res.data.result.length);
        }
      });
  };

  const columns = [
    {
      dataField: "",
      text: "S.No",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "50px" };
      },
    },
    {
      dataField: "created",
      text: "Date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.created);
        var oldDate = row.created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      dataField: "assign_no",
      text: "Query No",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return (
          <>
            <Link to={`/customer/my-assingment/${row.id}`}>
              {row.assign_no}
            </Link>
          </>
        );
      },
    },
    {
      dataField: "parent_id",
      text: "Category",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "cat_name",
      text: "Sub Category",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "Exp_Delivery_Date",
      text: "Expected date of delivery",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.created);
        var oldDate = row.created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      dataField: "final_date",
      text: "Actual date of delivery",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.final_date);
        var oldDate = row.final_date;
        if (oldDate == null || oldDate == "0000-00-00") {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      dataField: "",
      text: "Deliverable",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        // console.log(row.final_report);
        return (
          <>
            <div style={{ textAlign: "center" }}>
              {!row.final_report == "" ? (
                <div>
                  <a
                    href={`http://65.0.220.156/mazarapi/assets/upload/report/${row.final_report}`}
                    target="_blank"
                  >
                    <i class="fa fa-file-text" style={{ fontSize: "16px" }}></i>{" "}
                    final
                  </a>
                </div>
              ) : row.assignment_draft_report ? (
                <div>
                  <a
                    href={`http://65.0.220.156/mazarapi/assets/upload/report/${row.assignment_draft_report}`}
                    target="_blank"
                  >
                    <i class="fa fa-file-text" style={{ fontSize: "16px" }}></i>{" "}
                    draft
                  </a>
                </div>
              ) : null}
            </div>

            {row.assignment_draft_report && !row.final_report ? (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ cursor: "pointer" }} title="Accepted">
                  <i
                    class="fa fa-check"
                    style={{
                      color: "green",
                      fontSize: "16px",
                    }}
                    onClick={() => acceptHandler(row)}
                  ></i>
                </div>

                <div style={{ cursor: "pointer" }} title="Message">
                  <i
                    class="fa fa-comments-o"
                    style={{ color: "green", fontSize: "16px" }}
                    onClick={() => rejectHandler(row)}
                  ></i>
                </div>
              </div>
            ) : null}
          </>
        );
      },
    },
    {
      dataField: "",
      text: "Team Leader name and contact number, email",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: priceFormatter,
    },
    // {
    //   dataField: "",
    //   text: "Video Call",
    //   headerStyle: () => {
    //     return { fontSize: "12px" };
    //   },
    //   formatter: function (cell, row) {
    //     return (
    //       <>
    //         <div style={{ cursor: "pointer" }} title="Video Chat">
    //           <i
    //             class="fa fa-video-camera"
    //             style={{ color: "red", fontSize: "16px" }}
    //             onClick={() => handleJoin(row.id)}
    //           ></i>
    //         </div>
    //       </>
    //     );
    //   },
    // },
    {
      text: "Action",
      dataField: "",
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ cursor: "pointer" }} title="Pay Amount">
                <i
                  class="fa fa-credit-card"
                  style={{ color: "green", fontSize: "16px" }}
                  onClick={() => paymentHandler(row)}
                ></i>
              </div>

              {row.vstart < 11 &&
                row.vend >= 0 &&
                !(row.vstart == null && row.vend == null) ? (
                <div style={{ cursor: "pointer" }} title="Video Chat">
                  <i
                    class="fa fa-video-camera"
                    style={{ color: "red", fontSize: "16px" }}
                    onClick={() => handleJoin(row.id)}
                  ></i>
                </div>
              ) : null}
            </div>
          </>
        );
      },
    },
  ];

  //accept handler
  const acceptHandler = (key) => {
    console.log("acceptHandler", key);

    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("id", key.id);
    formData.append("query_no", key.assign_no);
    formData.append("type", 1);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/draftAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("response-", response);
        if (response.data.code === 1) {
          alert.success("draft accepted !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  //tl,phone,email
  function priceFormatter(cell, row) {
    console.log("row", row);
    if (row) {
      return (
        <>
          <p style={{ fontSize: "10px" }}>{row.tname} </p>
          <p style={{ fontSize: "10px" }}>{row.phone}</p>
          <p style={{ fontSize: "10px" }}>{row.email}</p>
        </>
      );
    }

    return null;
  }

  //handleJoin
  const handleJoin = (id) => {
    console.log("id", id);
    Cookies.set("channel", id);
    Cookies.set("baseMode", baseMode);
    Cookies.set("transcode", transcode);
    Cookies.set("attendeeMode", attendeeMode);
    Cookies.set("videoProfile", videoProfile);
    history.push("/customer/meeting");
  };


  function schedultTime(cell, row) {
    // console.log("schedultTime", row);
    console.log("schedultTime", row.schedule_time);
    // console.log("setSeconds", setSeconds(row.schedule_time));

    var d = row.schedule_time;
    var date = new Date(d); // some mock date
    var milliseconds = date.getTime();
    console.log("milliseconds - ", milliseconds);

    var date2 = new Date(); // current time
    var milliseconds2 = date2.getTime();
    console.log("current - ", milliseconds2);

    var diff = milliseconds - milliseconds2;
    console.log("diff - ", diff);
    var total = diff - 900000;
    console.log("total - ", total);

    if (total > 0 && 900000 > total) {
      return (
        <>
          <div style={{ cursor: "pointer" }} title="Video Chat">
            <i
              class="fa fa-video-camera"
              style={{ color: "red", fontSize: "16px" }}
              onClick={() => handleJoin(row.id)}
            ></i>
          </div>
        </>
      );
    }
  }

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              <CardTitle tag="h4">Assignment ({assignmentCount})</CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
        </CardHeader>

        <CardHeader>
          <CustomerFilter
            setData={setAssignmentDisplay}
            getData={getAssignmentData}
            id={userId}
            assignment="assignment"
            records={records}
            setRecords={setRecords}
          />
        </CardHeader>

        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={assignmentDisplay}
            columns={columns}
          />
          <PaymentModal
            paymentHandler={paymentHandler}
            addPaymentModal={addPaymentModal}
            pay={pay}
            getProposalData={getAssignmentData}
          />

          <RejectedModal
            rejectHandler={rejectHandler}
            rejectModal={rejectModal}
            rejectedItem={rejectedItem}
            getPendingforAcceptance={getAssignmentData}
          />
        </CardBody>
      </Card>
    </Layout>
  );
}

export default AssignmentTab;

// var endTime = 15;
// var startTime = converToMinutes(b);
// var converted = parseTime(startTime - endTime);
// console.log("time", converted);

// function converToMinutes(s) {
//   var c = s.split(".");
//   return parseInt(c[0]) * 60 + parseInt(c[1]);
// }

// function parseTime(s) {
//   return Math.floor(parseInt(s) / 60) + "." + (parseInt(s) % 60);
// }
