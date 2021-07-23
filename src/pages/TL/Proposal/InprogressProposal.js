import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import ChatHistory from "./ChatHistory";



function InprogressProposal() {
    const userid = window.localStorage.getItem("tlkey");
    const [records, setRecords] = useState([]);
    const [proposal, setProposal] = useState([]);
    const [count, setCount] = useState("");
    const [id, setId] = useState(null);

    const [addPaymentModal, setPaymentModal] = useState(false);
    const chatHandler = (key) => {
        console.log(key);
        setPaymentModal(!addPaymentModal);
        setId(key.assign_no);
    };

    useEffect(() => {
        getProposalList();
    }, []);

    const getProposalList = () => {
        axios
            .get(`${baseUrl}/tl/getProposalTl?id=${JSON.parse(userid)}&status=1`)
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setProposal(res.data.result);
                    setCount(res.data.result.length);
                    setRecords(res.data.result.length);

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
            dataField: "query_date",
            text: "Date",
            sort: true,
            formatter: function dateFormat(cell, row) {
                console.log("dt", row.query_date);
                var oldDate = row.query_date;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
            },
        },
        {
            text: "Query No",
            dataField: "assign_no",
            headerStyle: () => {
                return { fontSize: "12px" };
            },
            formatter: function nameFormatter(cell, row) {
                console.log(row);
                return (
                    <>
                        {/* <Link to={`/teamleader/queries/${row.id}`}>{row.assign_no}</Link> */}
                        <Link
                            to={{
                                pathname: `/teamleader/queries/${row.id}`,
                                routes: "proposal",
                                index: 1,
                            }}
                        >
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
            text: "Status",
            dataField: "status",
            headerStyle: () => {
                return { fontSize: "12px" };
            },
        },
        {
            text: "Action",
            dataField: "",
            headerStyle: () => {
                return { fontSize: "12px",width: "80px" };
            },
            formatter: function (cell, row) {
                return (
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                {row.status_code == "4" ? (
                                    <Link to={`/teamleader/edit-proposal/${row.id}`}>
                                        <i
                                            className="fa fa-edit"
                                            style={{
                                                fontSize: "16px",
                                                cursor: "pointer",
                                                color: "green",
                                            }}
                                        ></i>
                                    </Link>
                                ) : row.status_code == "2" ? (
                                    <Link to={`/teamleader/sendproposal/${row.id}`}>
                                        <i
                                            class="fa fa-mail-forward"
                                            style={{
                                                fontSize: "14px",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </Link>
                                ) : null}
                            </div>
                            {
                                row.status == "Customer Declined; Proposal" ?
                                    null
                                    :
                                    <div title="Send Message">
                                        <Link
                                            to={{
                                                pathname: `/teamleader/chatting/${row.id}`,
                                                obj: {
                                                    message_type: "2",
                                                    query_No: row.assign_no,
                                                    query_id: row.id,
                                                    routes: `/teamleader/proposal`
                                                }
                                            }}
                                        >
                                            <i
                                                class="fa fa-comments-o"
                                                style={{
                                                    fontSize: 16,
                                                    cursor: "pointer",
                                                    marginLeft: "8px",
                                                    color: "blue"
                                                }}
                                            ></i>
                                        </Link>
                                    </div>
                            }
                        </div>
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Card>
                <CardHeader>
                    <TeamFilter
                        setData={setProposal}
                        getData={getProposalList}
                        InprogressProposal="InprogressProposal"
                        setRecords={setRecords}
                        records={records}
                    />
                </CardHeader>
                <CardBody>
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={proposal}
                        columns={columns}
                        rowIndex
                    />

                    <ChatHistory
                        chatHandler={chatHandler}
                        addPaymentModal={addPaymentModal}
                        qno={id}
                    />
                </CardBody>
            </Card>
        </>
    );
}

export default InprogressProposal;

