import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../src/components/Search-Filter/tlFilter";
import DiscardReport from "../AssignmentTab/DiscardReport";



function AllQuery() {

    const userId = window.localStorage.getItem("userid");
    const [query, setQuery] = useState([]);
    const [data, setData] = useState(null);

    const [addPaymentModal, setPaymentModal] = useState(false);
    const paymentHandler = (key) => {
        console.log("key", key);
        setPaymentModal(!addPaymentModal);
    };
 

    const [incompleteData, setInCompleteData] = useState([]);
    const [records, setRecords] = useState([]);


    const [assignNo, setAssignNo] = useState('');
    const [ViewDiscussion, setViewDiscussion] = useState(false);
    const ViewDiscussionToggel = (key) => {
        setViewDiscussion(!ViewDiscussion);
        setAssignNo(key)
    }
    useEffect(() => {
        getMessage();
    }, []);


    const getMessage = () => {
        axios
            .get(
                `${baseUrl}/customers/getNotification?id=${JSON.parse(userId)}
                &type_list=all`
            )
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setQuery(res.data.result);
                }
            });
    };

    useEffect(() => {
        getInCompleteAssingment();
    }, []);

    const getInCompleteAssingment = () => {
        axios
            .get(`${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userId)}`)
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setInCompleteData(res.data.result);
                    setRecords(res.data.result.length);
                }
            });
    };

    const columns = [
        {
            text: "S.No",
          
            formatter: (cellContent, row, rowIndex) => {
                return rowIndex + 1;
            },
            headerStyle: () => {
                return { fontSize: "12px", width: "10px" };
            },
        },
        {
            text: "Date",
           sort : true,
            headerStyle: () => {
                return { fontSize: "12px", width: "50px" };
            },
            formatter: function nameFormatter(cell, row) {
                console.log(row);
                return (
                    <>
                        <div style={{ display: "flex" }}>
                            <p>{CommonServices.removeTime(row.setdate)}</p>
                            <p style={{ marginLeft: "15px" }}>{CommonServices.removeDate(row.setdate)}</p>
                        </div>
                    </>
                );
            },
              sort: true,
        },
        {
            text: "Query No",
            dataField: "assign_no",      
            headerStyle: () => {
                return { fontSize: "12px", width: "30px" };
            },
            formatter: function nameFormatter(cell, row) {
                console.log(row);
                return (
                    <>
                        {row.assign_no}

                    </>
                );
            },
        },
        {
            text: "Message",
            headerStyle: () => {
                return { fontSize: "12px", width: "180px" };
            },
            formatter: function nameFormatter(cell, row) {
                console.log(row);
                return (
                    <>
                        <Link to={`/customer/view-notification/${row.id}`}>
                            {
                                row.is_read == "0" ?
                                    <div
                                        style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}
                                        onClick={() => readNotification(row.id)}
                                        title="unread"
                                    >
                                        <p>{row.message}</p>
                                        <i class="fa fa-bullseye" style={{ color: "red" }}></i>
                                    </div>

                                    :
                                    <div
                                        style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}
                                        title="read"
                                    >
                                        <p>{row.message}</p>
                                        <i class="fa fa-bullseye" style={{ color: "green" }}></i>
                                    </div>

                            }
                        </Link>

                    </>
                );
            },
        },
    ];


    // readnotification
    const readNotification = (id) => {

        console.log("call", id)
        axios
            .get(`${baseUrl}/customers/markReadNotification?id=${id}`)
            .then(function (response) {
                console.log("delete-", response);
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
                        setData={setInCompleteData}
                        getData={getInCompleteAssingment}
                        AllQuery="AllQuery"
                        setRecords={setRecords}
                        records={records}
                    />
                </CardHeader>
                <CardBody>
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={query}
                        columns={columns}
                        rowIndex
                    />
                    <DiscardReport
                        ViewDiscussionToggel={ViewDiscussionToggel}
                        ViewDiscussion={ViewDiscussion}
                        report={assignNo}
                        getData={getInCompleteAssingment}
                    />

                </CardBody>
            </Card>
        </>
    );
}

export default AllQuery;
