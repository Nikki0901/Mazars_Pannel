import React, { useState, useEffect, useMemo } from "react";
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
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
import FeedbackIcon from '@material-ui/icons/Feedback';



function AllQueriesData() {
    const alert = useAlert();
    const userId = window.localStorage.getItem("userid");
    const [query, setQuery] = useState([]);
    const [queriesCount, setCountQueries] = useState(null);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        getQueriesData();
    }, []);

    const getQueriesData = () => {
        axios
            .get(
                `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(userId)}`
            )
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setQuery(res.data.result);
                    setCountQueries(res.data.result.length);
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
            text: "Date",
            dataField: "created",
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
                        <Link to={`/customer/my-assingment/${row.id}`}>
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
            text: "Status",
            dataField: "",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px" };
            },
            formatter: function nameFormatter(cell, row) {
                return (
                    <>
                        <div>
                            {
                                row.status == "Inprogress Query" ?
                                    <p style={{ color: "#1890ff" }}>
                                        {row.status}/
                                        {row.status_message}
                                    </p>
                                    :
                                    row.status == "Declined Query" ?
                                        <p style={{ color: "red" }}>
                                            {row.status}/
                                            {row.status_message}
                                        </p> :
                                        row.status == "Completed Query" ?
                                            <p style={{ color: "green" }}>
                                                {row.status}/
                                                {row.status_message}
                                            </p> :
                                            null
                            }
                        </div>
                    </>
                );
            },
        },
        {
            text: "Expected Delivery Date",
            dataField: "exp_delivery_date",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px" };
            },
            formatter: function dateFormat(cell, row) {
                console.log("dt", row.exp_delivery_date);
                var oldDate = row.exp_delivery_date;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.toString().split("-").reverse().join("-");
            },
        },
        {
            text: "Action",
            headerStyle: () => {
                return { fontSize: "12px", textAlign: "center", width: "130px" };
            },
            formatter: function (cell, row) {
                return (
                    <>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>

                            <div title="Update Query">
                                {
                                    row.status_code < 2 ?
                                        <Link to={`/customer/edit-query/${row.id}`}>
                                            {row.status_code < 5 ? (
                                                <i
                                                    className="fa fa-edit"
                                                    style={{
                                                        fontSize: 16,
                                                        cursor: "pointer",
                                                        marginLeft: "8px",
                                                    }}
                                                ></i>
                                            ) : null}
                                        </Link>
                                        :
                                        null
                                }
                            </div>

                            <div title="Delete Query">
                                {row.status_code < 1 ? (
                                    <i
                                        className="fa fa-trash"
                                        style={{
                                            fontSize: 16,
                                            cursor: "pointer",
                                            marginLeft: "8px",
                                        }}
                                        onClick={() => del(row.id)}
                                    ></i>
                                ) : null}
                            </div>

                            <div title="Send Message">
                                <Link
                                    to={{
                                        pathname: `/customer/chatting/${row.id}`,
                                        obj: {
                                            message_type: "4",
                                            query_No: row.assign_no,
                                            query_id: row.id,
                                            routes: `/customer/queries`
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

                            <div title="Send Feedback" style={{ cursor: "pointer" }}>
                                <Link to={`/customer/feedback/${row.assign_no}`}>
                                    <FeedbackIcon />
                                </Link>
                            </div>

                        </div>
                    </>
                );
            },
        },
    ];

    //check
    const del = (id) => {
        console.log("del", id);

        Swal.fire({
            title: "Are you sure?",
            text: "It will permanently deleted !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                deleteCliente(id);
            }
        });
    };

    const deleteCliente = (id) => {
        let formData = new FormData();
        formData.append("uid", JSON.parse(userId));
        formData.append("id", id);

        axios({
            method: "POST",
            url: `${baseUrl}/customers/deleteQuery`,
            data: formData,
        })
            .then(function (response) {
                console.log("res-", response);
                if (response.data.code === 1) {
                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    getQueriesData();
                } else {
                    Swal.fire("Oops...", "Errorr ", "error");
                }
            })
            .catch((error) => {
                console.log("erroror - ", error);
            });
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <Row>
                        <Col md="9">
                            {/* <CardTitle tag="h4">Queries ({queriesCount})</CardTitle> */}
                        </Col>
                        <Col md="3">
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <Link to="/customer/select-category" class="btn btn-primary">
                                    Fresh Query
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
                <CardHeader>
                    <CustomerFilter
                        setData={setQuery}
                        getData={getQueriesData}
                        id={userId}
                        query="query"
                        records={records}
                        setRecords={setRecords}
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
                </CardBody>
            </Card>
        </div>
    );
}

export default AllQueriesData;
