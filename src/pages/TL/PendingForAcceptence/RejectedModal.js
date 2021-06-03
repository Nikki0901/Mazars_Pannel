import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";

function RejectedModal({
  addPaymentModal,
  rejectHandler,
  pay,
  getPendingforAcceptance,
}) {
  const userid = window.localStorage.getItem("tlkey");
  const { handleSubmit, register } = useForm();
  const alert = useAlert();
  const { id, allocation_id } = pay;

  // console.log("pay :", pay);

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("set", 0);
    formData.append("tlid", JSON.parse(userid));
    formData.append("assignment_id", id);
    formData.append("allocation_id", allocation_id);
    formData.append("reject_reason", value.p_text);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/AcceptRejectQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("Query rejected !");
          getPendingforAcceptance();
          rejectHandler();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <div>
      <Modal isOpen={addPaymentModal} toggle={rejectHandler} size="sm">
        <ModalHeader toggle={rejectHandler}>Payment</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                type="text"
                name="p_text"
                ref={register}
                className="form-control"
                placeholder="enter text"
              />
            </div>
            <div class="modal-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default RejectedModal;
