import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import ModalVideo from "react-modal-video";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
    Button,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import BootstrapTable from "react-bootstrap-table-next";
import "react-modal-video/scss/modal-video.scss";
// import '../../../../node_modules/react-modal-video/scss/modal-video.scss';



function Recording() {
    const userid = window.localStorage.getItem("tlkey");
    const [feedbackData, setFeedBackData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [videoid, setVideoId] = useState(null);

    const openModal = (videoContent) => {
        setIsOpen(true);
        setVideoId(videoContent);
    };

    useEffect(() => {
        getRecording();
    }, []);

    const getRecording = () => {
        axios
            .get(`${baseUrl}/tl/callRecordingPostlist?assign_id=Q-23-71`)
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setFeedBackData(res.data.result);
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
                return { fontSize: "12px", width: "8px" };
            },
        },
        {
            text: "Query No",
            dataField: "assign_id",
            headerStyle: () => {
                return { fontSize: "12px", width: "30px" };
            },
        },
        {
            text: "Date",
            dataField: "created_date",
            headerStyle: () => {
                return { fontSize: "12px", width: "40px" };
            },
        },

        {
            text: "Participants",
            dataField: "participants",
            headerStyle: () => {
                return { fontSize: "12px", width: "40px" };
            },
        },
        {
            text: "Discussion Type",
            dataField: "type",
            headerStyle: () => {
                return { fontSize: "12px", width: "40px" };
            },
        },
        {
            text: "Summary of Discussion",
            dataField: "message",
            headerStyle: () => {
                return { fontSize: "12px", width: "80px" };
            },
        },
        {
            text: "Action",
            headerStyle: () => {
                return { fontSize: "12px", width: "20px" };
            },
            formatter: function nameFormatter(cell, row) {
                console.log(row);
                return (
                    <>
                        <div>
                            <i
                                className="material-icons"
                                style={{
                                    cursor: "pointer",
                                    color: "red",
                                    fontSize: "25px",
                                }}
                                onClick={() => openModal(row.file)}
                            >
                                play_circle_outline
                            </i>
                        </div>
                    </>
                );
            },
        },
    ];



    console.log("videourl", videoid)

    return (
       <>
            <Card>
                <CardHeader>
                    <Row>
                        <Col md="7">
                            <CardTitle tag="h4">Recording of Discussion</CardTitle>
                        </Col>
                        <Col md="5"></Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={feedbackData}
                        columns={columns}
                        rowIndex
                    />
                </CardBody>
            </Card>


            <ModalVideo
                channel="custom"
                isOpen={isOpen}
                // videoId={videoid}
                onClose={() => setIsOpen(false)}
                url={videoid}
            // url="https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4"
            />
       </>
    );
}

export default Recording;