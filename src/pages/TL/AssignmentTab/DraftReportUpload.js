import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";

function DraftReport({ draftModal, uploadDraftReport, id, getAssignmentList }) {
  const alert = useAlert();
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (value) => {
    console.log("value :", value);


    let formData = new FormData();

    var uploadImg = value.p_draft;
    if (uploadImg) {
      for (var i = 0; i < uploadImg.length; i++) {
        let a = value.p_draft[0];
        formData.append("draft_report[]", a);
      }
    }

    formData.append("id", id);
    axios.post(`${baseUrl}/tl/UploadReport`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response.data)
      alert.success(<Msg />);
      getAssignmentList();
      uploadDraftReport();
    });

  };

  //alert msg
  const Msg = () => {
    return (
      <>
        <p style={{ fontSize: "12px" }}>draft Report uploaded</p>
      </>
    )
  }
  return (
    <div>
      <Modal isOpen={draftModal} toggle={uploadDraftReport} size="md">
        <ModalHeader toggle={uploadDraftReport}>Draft Report</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                type="file"
                name="p_draft"
                ref={register}
                className="form-control-file manage_file"
                multiple
              />
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
              >
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

 // let formData = new FormData();
      // formData.append("draft_report", value.p_draft[0]);
      // formData.append("id", id);

      // axios({
      //   method: "POST",
      //   headers: {
      //     'content-type': 'multipart/form-data'
      //   },
      //   url: `${baseUrl}/tl/UploadReport`,
      //   data: formData,
      // })
      //   .then(function (response) {
      //     console.log("res-", response);  
      //     uploadDraftReport();            
      //   })
      //   .catch((error) => {
      //     console.log("erroror - ", error);
      //  });


// axios.post(`${baseUrl}/tl/UploadReport`, formData, {
//   headers: {
//     'content-type': 'multipart/form-data'
//   }
// }).then(response => {
//   console.log(response.data)
// });


// formData.append('draft_report',{
//   uri: value.p_draft[0].uri,
//   name: value.p_draft[0].name,
//   type: value.p_draft[0].type}
// );



// axios({
//   method: "post",
//   url: "myurl",
//   data: bodyFormData,
//   headers: { "Content-Type": "multipart/form-data" },
// })
//   .then(function (response) {

//     console.log(response);
//   })
//   .catch(function (response) {

//     console.log(response);
//   });

    // formData.append("draft_report[]", value.p_draft[0]);