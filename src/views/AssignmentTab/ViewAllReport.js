import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl, ReportUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import CommonServices from "../../common/common";
import { Link, useHistory } from "react-router-dom";
import RejectedModal from "./RejectModal";


const Schema = yup.object().shape({
  p_chat: yup.string().required("required discussion"),
});


function ViewReport({
  reportModal,
  ViewReport,
  report,
  getPendingforAcceptance,
  dataItem
}) {
  const userId = window.localStorage.getItem("userid");
  const [data, setData] = useState([]);
  const [docData, setDocData] = useState({});


  const [nestedModal, setNestedModal] = useState(false);
  const toggleNested = (key) => {
    setNestedModal(!nestedModal);
    setDocData(key)
  }

  useEffect(() => {
    getData();
  }, [report]);

  const getData = () => {
    let formData = new FormData();
    formData.append("assign_no", report);
    formData.append("uid", JSON.parse(userId));

    axios({
      method: "POST",
      url: `${baseUrl}/customers/getstagesinfo`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setData(response.data.result)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  }


  //accept handler
  const acceptHandler = (key) => {
    console.log("acceptHandler", key);

    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("id", dataItem.id);
    formData.append("query_no", dataItem.assign_no);
    formData.append("type", 1);
    formData.append("docid", key.docid);


    axios({
      method: "POST",
      url: `${baseUrl}/customers/draftAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("response-", response);
        if (response.data.code === 1) {
          getData();
          var variable = "Draft accepted successfully "
          // Alerts.SuccessNormal(variable)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };




  return (
    <div>
      <Modal isOpen={reportModal} toggle={ViewReport} size="md" scrollable>
        <ModalHeader toggle={ViewReport}>View All Reports</ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="row">S.No</th>
                <th scope="row">Date</th>
                <th scope="row">Document</th>
                <th scope="row">Report Type</th>
                {
                  dataItem ?
                    dataItem.final_report ? null : <th scope="row">Action</th>
                    :
                    null
                }
              </tr>
            </thead>

            {data.length > 0
              ? data.map((p, i) => (
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{CommonServices.removeTime(p.created_date)}</td>
                    <td>
                      {p.document && (
                        <p style={{ display: "flex" }}>
                          <a
                            href={`${ReportUrl}/${report}/${p.document}`}
                            target="_blank"
                          >
                            <i class="fa fa-photo"></i>
                          </a>
                          <p style={{ marginLeft: "15px" }}>{p.document}</p>
                        </p>
                      )}
                    </td>
                    <td>
                      {p.stages_type == 2 && "Draft Report" || p.stages_type == 3 && "Final Report"}
                    </td>
                    {
                      p.stages_type == "2" ?
                        <td>
                          {
                            p.status == "0" ?
                              <div style={{ display: "flex", justifyContent: "space-around" }}>

                                <div style={{ cursor: "pointer" }} title="Accept">
                                  <i
                                    class="fa fa-check"
                                    style={{
                                      color: "green",
                                      fontSize: "16px",
                                    }}
                                    onClick={() => acceptHandler(p)}
                                  ></i>
                                </div>

                                <div title="Discussion">
                                  <i
                                    class="fa fa-comments-o"
                                    style={{
                                      fontSize: 16,
                                      cursor: "pointer",
                                      marginLeft: "8px",
                                      color: "green"
                                    }}
                                    onClick={() => toggleNested(p)}
                                  ></i>
                                </div>
                              </div>
                              :
                              p.status == "1" ?
                                <div style={{ cursor: "pointer" }} title="Customer Accepted">
                                  <i
                                    class="fa fa-check"
                                    style={{
                                      color: "blue",
                                      fontSize: "16px",
                                    }}
                                  ></i>
                                </div> :
                                p.status == "2" ?
                                  <div title="Discussion">
                                    <i
                                      class="fa fa-comments-o"
                                      style={{
                                        fontSize: 16,
                                        cursor: "pointer",
                                        marginLeft: "8px",
                                        color: "green"
                                      }}
                                      onClick={() => toggleNested(p)}
                                    ></i>
                                  </div> :
                                  null
                          }
                        </td>
                        :
                        null
                    }

                  </tr>
                </tbody>
              ))
              : null}
          </table>

          <Modal isOpen={nestedModal} toggle={toggleNested} >
            <ModalHeader>Nested Modal title</ModalHeader>
            <ModalBody>Stuff and things</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggleNested}>Cancel</Button>

            </ModalFooter>
          </Modal>
        </ModalBody>
      </Modal>

      <RejectedModal
        toggleNested={toggleNested}
        nestedModal={nestedModal}
        dataItem={dataItem}
        docData={docData}
        getData={getData}
      />
    </div>
  );
}

export default ViewReport;
