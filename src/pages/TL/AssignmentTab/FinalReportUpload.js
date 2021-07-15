import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import Alerts from "../../../common/Alerts";

function DraftReport({ fianlModal, uploadFinalReport, id, getAssignmentList }) {
  const alert = useAlert();
  const { handleSubmit, register, reset } = useForm();


  console.log("id-", id)
  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();

    var uploadImg = value.p_final;
    if (uploadImg) {
      for (var i = 0; i < uploadImg.length; i++) {
        let file = uploadImg[i];
        formData.append("final_report[]", file);
      }
    }


    formData.append("id", id.id);
    formData.append("q_id", id.q_id);
    axios
      .post(`${baseUrl}/tl/UploadReport`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        var msg = response.data.msg
        var variable = "Final Report Uploaded"
        Alerts.SuccessReport(variable, msg)

        getAssignmentList();
        uploadFinalReport();
      });
  };


  return (
    <div>
      <Modal isOpen={fianlModal} toggle={uploadFinalReport} size="md">
        <ModalHeader toggle={uploadFinalReport}>Final Report</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label>Upload Multiple Report</label>
              <input
                type="file"
                name="p_final"
                ref={register}
                className="form-control-file manage_file"
                multiple
              />
            </div>
            <div class="modal-footer">
              <button type="submit" className="btn btn-primary">
                Upload
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DraftReport;

 // formData.append("final_report", value.p_final[0]);