import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
// import Alerts from "../../../common/Alerts";
import Swal from "sweetalert2";



function DraftReport({ draftModal, uploadDraftReport, id, getAssignmentList }) {
  const alert = useAlert();
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (value) => {
    console.log("value :", value);


    let formData = new FormData();

    var uploadImg = value.p_draft;
    console.log("uploadImg", uploadImg);

    if (uploadImg) {
      for (var i = 0; i < uploadImg.length; i++) {
        let file = uploadImg[i];
        formData.append("draft_report[]", file);
      }
    }

    formData.append("id", id);
    axios.post(`${baseUrl}/tl/UploadReport`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response)

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
      uploadDraftReport();
    });
  };


  return (
    <div>
      <Modal isOpen={draftModal} toggle={uploadDraftReport} size="md">
        <ModalHeader toggle={uploadDraftReport}>Draft Report</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label>Upload Multiple Report</label>
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