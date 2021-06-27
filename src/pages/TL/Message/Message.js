import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
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
import BootstrapTable from "react-bootstrap-table-next";

function Message() {
    const userId = window.localStorage.getItem("tlkey");
    const [query, setQuery] = useState([]);


    useEffect(() => {
        getMessage();
    }, []);

    const getMessage = () => {
        axios
            .get(
                `${baseUrl}/customers/getNotification?id=${JSON.parse(userId)}`
            )
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setQuery(res.data.result);
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
                return { fontSize: "12px", width: "10px" };
            },
        },
        {
            text: "Query No",
            dataField: "assign_no",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px", width: "40px" };
            },
            formatter: function nameFormatter(cell, row) {
                console.log(row);
                return (
                    <>
                        {/* <Link to={`/teamleader/my-assingment/${row.id}`}> */}
                        {row.assign_no}
                        {/* </Link> */}
                    </>
                );
            },
        },
        {
            text: "Message",
            dataField: "message",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px", width: "150px" };
            },
            formatter: function nameFormatter(cell, row) {
                console.log(row);
                return (
                    <>
                        <Link to={`/teamleader/view-notification/${row.id}`}>
                            {row.message}
                        </Link>
                    </>
                );
            },
        },
    ];


    return (
        <Layout TLDashboard="TLDashboard" TLuserId={userId}>
            <Card>
                <CardHeader>
                    <Row>
                        <Col md="9">
                            <CardTitle tag="h4">Message</CardTitle>
                        </Col>
                        <Col md="3">
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <Link to="/teamleader/chatting" class="btn btn-primary">
                                    Add Message
                                </Link>
                            </div>
                        </Col>
                    </Row>
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
        </Layout>
    );
}

export default Message;