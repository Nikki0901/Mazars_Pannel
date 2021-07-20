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
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";

function AllQuery() {

    const userid = window.localStorage.getItem("tlkey");

    const [incompleteData, setInCompleteData] = useState([]);
    const [records, setRecords] = useState([]);



    useEffect(() => {
        getInCompleteAssingment();
    }, []);

    const getInCompleteAssingment = () => {
        axios
            .get(`${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}`)
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
                        {/* <Link to={`/teamleader/queries/${row.id}`}>{row.assign_no}</Link> */}
                        <Link
                            to={{
                                pathname: `/teamleader/queries/${row.id}`,
                                index: 1,
                                routes: "queriestab",
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
            text: "Query Allocation",
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
                                color: "green",
                            }}
                        >
                            <Link to={`/teamleader/queryassing/${row.id}`}>
                                {row.tp_status == "1" ? (
                                    <div title="Assigned">
                                        <i class="fa fa-share" style={{ color: "green" }}></i>
                                    </div>
                                ) :
                                    row.status_code < "4" ?
                                        (
                                            <div title="Assign to">
                                                <i class="fa fa-share"></i>
                                            </div>
                                        )
                                        :
                                        ""
                                }
                            </Link>
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
                        data={incompleteData}
                        columns={columns}
                        rowIndex
                    />
                </CardBody>
            </Card>
        </>
    );
}

export default AllQuery;