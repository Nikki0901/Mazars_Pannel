import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useParams, Link, Redirect } from "react-router-dom";
import { useAlert } from "react-alert";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
    Tooltip,
} from "reactstrap";


function QueryRejection(props) {
    const { id } = useParams();

    const { handleSubmit, register, reset, errors } = useForm();
    const userId = window.localStorage.getItem("adminkey");


    const onSubmit = (value) => {
        console.log("value :", value)
        let formData = new FormData();
        formData.append("id", id);
        formData.append("notes", value.p_notes);

        axios({
            method: "POST",
            url: `${baseUrl}/admin/setAdminreject`,
            data: formData,
        })
            .then(function (response) {
                console.log("res-", response);
                if (response.data.code === 1) {
                    alert.success("success !");
                    props.history.push({
                        pathname: `/admin/queriestab`,
                        index: 1,
                      });
                }
            })
            .catch((error) => {
                console.log("erroror - ", error);
            });
    };

    return (
        <Layout adminDashboard="adminDashboard" adminUserId={userId}>
            <Card>
                <CardHeader>
                    <Row>
                        <Col md="4">
                            <Link
                                to={{
                                    pathname: `/admin/queriestab`,
                                    index: 1,
                                }}
                            >
                                <button class="btn btn-success ml-3">
                                    <i class="fas fa-arrow-left mr-2"></i>
                                    Go Back
                                </button>
                            </Link>
                        </Col>
                        <Col md="4">
                            <div style={{ textAlign: "center" }}>
                                <h2>Query Rejection</h2>
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
                <CardHeader>
                    <div class="row mt-3">
                        <div class="col-lg-2 col-xl-2 col-md-12"></div>
                        <div class="col-lg-8 col-xl-8 col-md-12">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Notes</label>
                                            <textarea
                                                className="form-control"
                                                id="textarea"
                                                rows="6"
                                                name="p_notes"
                                                ref={register}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div class="col-lg-2 col-xl-2 col-md-12"></div>
                    </div>

                </CardHeader>
            </Card>
        </Layout>
    );
}

export default QueryRejection;