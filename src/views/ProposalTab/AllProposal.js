import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
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
import { Link } from "react-router-dom";
import ChatComponent from "./ChatComponent";
import "./index.css";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import BootstrapTable from "react-bootstrap-table-next";
import FeedbackIcon from '@material-ui/icons/Feedback';
import Records from "../../components/Records/Records";
import Alerts from "../../common/Alerts";
import Swal from "sweetalert2";




function ProposalTab() {
    const alert = useAlert();

    const userId = window.localStorage.getItem("userid");
    const [proposalDisplay, setProposalDisplay] = useState([]);
    const [proposalCount, setCountProposal] = useState("");
    const [records, setRecords] = useState([]);

    const [id, setId] = useState(null);
    const [reject, setRejected] = useState(true);

    const [addPaymentModal, setPaymentModal] = useState(false);
    const chatHandler = (key) => {
        console.log(key);
        setPaymentModal(!addPaymentModal);
        setId(key.q_id);
    };

    useEffect(() => {
        getProposalData();
    }, []);

    const getProposalData = () => {
        axios
            .get(`${baseUrl}/customers/getProposals?uid=${JSON.parse(userId)}`)
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setProposalDisplay(res.data.result);
                    setCountProposal(res.data.result.length);
                    setRecords(res.data.result.length);
                }
            });
    };




    const columns = [
        {
            text: "S.No",
            dataField: "",
            style: {
                fontSize: "11px",
            },
            formatter: (cellContent, row, rowIndex) => {
                return rowIndex + 1;
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "50px" };
            },
        },
        {
            text: "Date",
            dataField: "created",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function (cell, row) {
                console.log("dt", row.created);
                var oldDate = row.created;
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
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function nameFormatter(cell, row) {
                console.log(row);
                return (
                    <>
                        <Link to={`/customer/my-assingment/${row.q_id}`}>
                            {row.assign_no}
                        </Link>
                    </>
                );
            },
        },
        {
            text: "Category",
            dataField: "parent_id",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            text: "Sub Category",
            dataField: "cat_name",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            text: "Date of Proposal",
            dataField: "DateofProposal",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function dateFormat(cell, row) {
                console.log("dt", row.DateofProposal);
                var oldDate = row.DateofProposal;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.toString().split("-").reverse().join("-");
            },
        },
        {
            text: "Date of acceptance / decline of Proposal",
            dataField: "cust_accept_date",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function dateFormat(cell, row) {
                console.log("dt", row.cust_accept_date);
                var oldDate = row.cust_accept_date;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
            },
        },
        {
            text: "Status",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function nameFormatter(cell, row) {
                return (
                    <>
                        <div>
                            {
                                row.status == "Inprogress" ?
                                    <div>
                                        {row.status}/
                                        <p className="inprogress">
                                            {row.statusdescription}
                                        </p>
                                    </div>
                                    :
                                    row.status == "Declined; Proposal" ?
                                        <div>
                                            {row.status}
                                            <p className="declined">
                                                {row.statusdescription}
                                            </p>
                                        </div> :
                                        row.status == "Accepted; Proposal" ?
                                            <div>
                                                {row.status}
                                                <p className=".completed{">
                                                    {row.statusdescription}
                                                </p>
                                            </div> :
                                            null
                            }
                        </div>
                    </>
                );
            },
        },
        {
            text: "Proposed Amout",
            dataField: "ProposedAmount",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            text: "Accepted Amount",
            dataField: "accepted_amount",
            sort: true,
            style: {
                fontSize: "11px",
                color: "#21a3ce",
            },
            headerStyle: () => {
                return { fontSize: "11px", color: "#21a3ce" };
            },
        },
        {
            text: "Amount Paid",
            dataField: "paid_amount",
            sort: true,
            style: {
                fontSize: "11px",
                color: "#064606",
            },
            headerStyle: () => {
                return { fontSize: "11px", color: "#064606" };
            },
        },
        {
            text: "Amount Outstanding",
            dataField: "",
            sort: true,
            style: {
                fontSize: "11px",
                color: "darkred",
            },
            headerStyle: () => {
                return { fontSize: "11px", color: "darkred" };
            },
            formatter: function amountOutstading(cell, row) {
                var a = row.accepted_amount;
                var p = row.paid_amount;
                return a - p;
            },
        },
        {
            text: "Date of Payment",
            dataField: "cust_paid_date",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function dateFormat(cell, row) {
                console.log("dt", row.cust_paid_date);
                var oldDate = row.cust_paid_date;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
            },
        },
        {
            text: "Date of Completion",
            dataField: "",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
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

                        {row.statuscode === "6" ? null : (
                            <div>
                                {row.negotiated_amount === "0" &&
                                    row.accepted_amount === "0" ? (
                                    <div style={{ display: "flex", width: "80px", justifyContent: "space-evenly" }}>
                                        <div style={{ cursor: "pointer" }} title="Proposal Accepted">
                                            <Link to={`/customer/proposal_view/${row.q_id}`}>
                                                <i
                                                    class="fa fa-check"
                                                    style={{
                                                        color: "blue",
                                                        fontSize: "16px",
                                                    }}
                                                ></i>
                                            </Link>
                                        </div>

                                        <div style={{ cursor: "pointer" }} title="Rejected">
                                            <i
                                                class="fa fa-times"
                                                style={{ color: "red", fontSize: "16px" }}
                                                onClick={() => rejected(row.q_id)}
                                            ></i>
                                        </div>

                                    </div>
                                ) : null}
                            </div>
                        )}


                    </>
                );
            },
        },
    ];





    //rejected
    const rejected = (id) => {
        console.log("del", id);
        Swal.fire({
            title: "Are you sure?",
            text: "It will permanently rejected !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.value) {
                deleteCliente(id);
            }
        });
    };


    // delete data
    const deleteCliente = (key) => {

        let formData = new FormData();
        formData.append("id", key);
        formData.append("status", 6);

        axios({
            method: "POST",
            url: `${baseUrl}/customers/ProposalAccept`,
            data: formData,
        })
            .then(function (response) {
                console.log("res-", response);
                if (response.data.code === 1) {
                    setRejected(false);
                    Swal.fire("Rejected!", "Proposal rejected successfully.", "success");
                    getProposalData();
                } else {
                    Swal.fire("Oops...", "Errorr ", "error");
                }

                // if (response.data.code === 1) {
                // setRejected(false);
                // getProposalData();
                //     var variable = "Proposal rejected successfully."
                //     Alerts.SuccessNormal(variable)
                // }
            })
            .catch((error) => {
                console.log("erroror - ", error);
            });

    };



    return (
        <div>
            <Card>
                <CardHeader>
                    <CustomerFilter
                        setData={setProposalDisplay}
                        getData={getProposalData}
                        id={userId}
                        proposal="proposal"
                        records={records}
                        setRecords={setRecords}
                    />
                </CardHeader>
                <CardBody>
                    <Records records={records} />
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={proposalDisplay}
                        columns={columns}
                        classes="table-responsive"
                    />
                    <ChatComponent
                        chatHandler={chatHandler}
                        addPaymentModal={addPaymentModal}
                        id={id}
                        getProposalData={getProposalData}
                    />
                </CardBody>
            </Card>
        </div>
    );
}

export default ProposalTab;



// axios
//   .get(`${baseUrl}/tl/deleteTeamLeader?id=${id}`)
//   .then(function (response) {
//     console.log("delete-", response);
// if (response.data.code === 1) {
//   Swal.fire("Deleted!", "Your file has been deleted.", "success");
//   getTeamLeader();
// } else {
//   Swal.fire("Oops...", "Errorr ", "error");
// }

//   })
//   .catch((error) => {
//     console.log("erroror - ", error);
//   });



// <div title="Send Message">
// <Link
//     to={{
//         pathname: `/customer/chatting/${row.q_id}`,
//         obj: {
//             message_type: "2",
//             query_No: row.assign_no,
//             query_id: row.q_id,
//             routes: `/customer/proposal`
//         }
//     }}
// >
//     <i
//         class="fa fa-comments-o"
//         style={{
//             fontSize: 16,
//             cursor: "pointer",
//             marginLeft: "8px",
//             color: "blue"
//         }}
//     ></i>
// </Link>
// </div>

// <div title="Send Feedback" style={{ cursor: "pointer" }}>
// <Link to={`/customer/feedback/${row.assign_no}`}>
//     <FeedbackIcon />
// </Link>
// </div>


{/* <div style={{ cursor: "pointer" }} title="Discussion">
                                            <i
                                                class="fa fa-comments-o"
                                                style={{ color: "green", fontSize: "16px" }}
                                                onClick={() => chatHandler(row)}
                                            ></i>
                                        </div> */}

                                           // rejected proposal
    // const rejected = (key) => {
    //     console.log("rej", key);

    //     let formData = new FormData();
    //     formData.append("id", key);
    //     formData.append("status", 6);

    //     axios({
    //         method: "POST",
    //         url: `${baseUrl}/customers/ProposalAccept`,
    //         data: formData,
    //     })
    //         .then(function (response) {
    //             console.log("res-", response);
    //             if (response.data.code === 1) {
    //                 setRejected(false);
    //                 getProposalData();
    //                 var variable = "Proposal rejected successfully."
    //                 Alerts.SuccessNormal(variable)
    //             }
    //         })
    //         .catch((error) => {
    //             console.log("erroror - ", error);
    //         });
    // };
