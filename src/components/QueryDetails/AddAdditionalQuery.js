import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";

function AddAdditionalQuery({ addHandler, addModal, assingNo, getQuery }) {
  const alert = useAlert();
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("assign_no", assingNo);
    formData.append("query", value.p_addqueri);
    formData.append("upload", value.p_upload[0]);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/PostAdditionalQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success(<Msg />);
          reset();
          getQuery();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  const Msg = () => {
    return (
      <>
        <p style={{ fontSize: "12px" }}>Query successfully added!</p>
      </>
    );
  };

  return (
    <>
      <Modal isOpen={addModal} toggle={addHandler} size="md">
        <ModalHeader toggle={addHandler}>Add. Query</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Additional Queries</label>
              <textarea
                className="form-control"
                id="textarea"
                rows="6"
                name="p_addqueri"
                ref={register}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Your Document</label>
              <input
                type="file"
                name="p_upload"
                ref={register}
                className="form-control-file"
              />
            </div>

            <div class="modal-footer">
              <button
                type="submit"
                onClick={addHandler}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default AddAdditionalQuery;
