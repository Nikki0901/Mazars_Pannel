import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl, ReportUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import CommonServices from "../../common/common";

const Schema = yup.object().shape({
  p_chat: yup.string().required("required discussion"),
});


function ViewReport({
  reportModal,
  ViewReport,
  report,
  getPendingforAcceptance,
}) {
  const userId = window.localStorage.getItem("userid");
  const [data, setData] = useState([]);


  console.log("ass-", report)

  useEffect(() => {

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
          // alert.success("Payment Done!");
          // getProposalData();
          // paymentHandler();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });

  }, [report]);



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
                  </tr>
                </tbody>
              ))
              : null}
          </table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ViewReport;