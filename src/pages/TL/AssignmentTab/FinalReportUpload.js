import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import Swal from "sweetalert2";


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


        var message = response.data.message
        if (message.invalid) {
            Swal.fire({
              title: 'Error !',
              html: `<p class="text-danger">${message.invalid}</p>`,
            })
          } else if (message.faill && message.success) {
            Swal.fire({
              title: 'Success',
              html: `<p class="text-danger">${message.faill}</p> <br/> <p>${message.success}</p> `,
              icon: 'success',
            })
          } else if (message.success) {
            Swal.fire({
              title: 'Success',
              html: `<p>${message.success}</p>`,
              icon: 'success',
            })
          }
          else if (message.faill) {
            Swal.fire({
              title: 'Error !',
              html: `<p class="text-danger">${message.faill}</p>`,
              icon: 'error',
            })
          }


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