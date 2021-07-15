import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import Alerts from "../../common/Alerts";
import CommonServices from "../../common/common";



function AdditionalQueryModal({
  additionalQuery,
  additionalHandler,
  assignNo,
  getQueriesData,
}) {
  const { handleSubmit, register } = useForm();


  const onSubmit = (value) => {
    console.log("value :", value);


    let formData = new FormData();
    var uploadImg = value.p_upload;
    if (uploadImg) {
      for (var i = 0; i < uploadImg.length; i++) {
        let file = uploadImg[i];
        formData.append("upload[]", file);
      }
    }

    formData.append("assign_no", assignNo);
    // formData.append("upload", value.p_upload[0]);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/PostAdditionalQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {

          var variable = "Document Uploaded Successfully"
          Alerts.SuccessNormal(variable)
          additionalHandler();
          getQueriesData();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  return (
    <div>
      <Modal isOpen={additionalQuery} toggle={additionalHandler} size="md">
        <ModalHeader toggle={additionalHandler}>UPLOAD DOCUMENTS</ModalHeader>
        <ModalBody>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Upload Your Document</label>
              <input
                type="file"
                name="p_upload"
                ref={register}
                className="form-control-file"
                multiple
              />
            </div>

            <div class="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AdditionalQueryModal;
