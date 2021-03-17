import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";

function DraftReport({ fianlModal, uploadFinalReport, id, getAssignmentList }) {
  const alert = useAlert();

  const { handleSubmit, register, reset } = useForm();
  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("final_report", value.p_final[0]);
    formData.append("id", id);

    axios
      .post(`${baseUrl}/tl/UploadReport`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert.success(<Msg />);
        getAssignmentList();
        uploadFinalReport();
      });
  };

  //alert msg
  const Msg = () => {
    return (
      <>
        <p style={{ fontSize: "12px" }}>final report uploaded</p>
      </>
    );
  };
  return (
    <div>
      <Modal isOpen={fianlModal} toggle={uploadFinalReport} size="md">
        <ModalHeader toggle={uploadFinalReport}>Final Report</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                type="file"
                name="p_final"
                ref={register}
                className="form-control-file"
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
