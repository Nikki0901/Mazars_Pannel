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
import BootstrapTable from "react-bootstrap-table-next";
import PaymentModal from "./PaymentModal";

function Message(props) {
    console.log("props", props.location.obj)

    const userId = window.localStorage.getItem("userid");
    const [query, setQuery] = useState([]);
    const [data, setData] = useState(null);

    const [addPaymentModal, setPaymentModal] = useState(false);
    const paymentHandler = (key) => {
        console.log("key", key);
        setPaymentModal(!addPaymentModal);
    };

    // useEffect(() => {
    //     var dataItem = props.location.obj.message_type
    //     setData(dataItem)
    // }, [data]);


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
                        {/* <Link to={`/customer/my-assingment/${row.id}`}> */}
                        {row.assign_no}
                        {/* </Link> */}
                    </>
                );
            },
        },
        {
            text: "Message",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px", width: "150px" };
            },
            formatter: function nameFormatter(cell, row) {
                console.log(row);
                return (
                    <>
                        <Link to={`/customer/view-notification/${row.id}`}>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>{row.message}</div>
                                <div>{
                                    row.is_read == "0" ?
                                        <p style={{ color: 'blue' }} title="read"
                                            onClick={() => readNotification(row.id)}
                                        >
                                            <i class="fa fa-bullseye"></i>
                                        </p>
                                        :
                                        <p style={{ color: 'green' }} title="unread"
                                        >
                                            <i class="fa fa-circle"></i>
                                        </p>
                                }
                                </div>
                            </div>

                        </Link>
                    </>
                );
            },
        },
    ];



    // readnotification
    const readNotification = (id) => {
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
        <Layout custDashboard="custDashboard" custUserId={userId}>
            <Card>
                <CardHeader>
                    <Row>
                        <Col md="9">
                            <CardTitle tag="h4">Message</CardTitle>
                        </Col>
                        {/* <Col md="3">
                            <div style={{ display: "flex", justifyContent: "space-around" }}
                                class="btn btn-primary"
                            // onClick={() => paymentHandler()}
                            >
                                <Link
                                    to={{
                                        pathname: `/customer/chatting`,
                                        obj: props.location.obj
                                    }}

                                >
                                    Add Message
                                </Link>
                            </div>
                        </Col> */}
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

                    <PaymentModal
                        paymentHandler={paymentHandler}
                        addPaymentModal={addPaymentModal}
                    // data={data}
                    // getProposalData={getAssignmentData}
                    />
                </CardBody>
            </Card>
        </Layout>
    );
}

export default Message;