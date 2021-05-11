import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

function PaymentModal({
  addPaymentModal,
  paymentHandler,
  pay,
  getProposalData,
}) {
  const { handleSubmit, register } = useForm();
  const alert = useAlert();
  const history = useHistory();
  const { id } = pay;

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("id", id);

    // axios({
    //   method: "POST",
    //   url: `${baseUrl}/customers/PaymentPartialAccept`,
    //   data: formData,
    // })
    //   .then(function (response) {
    //     console.log("res-", response);
    //     if (response.data.code === 1) {
    //       alert.success("Payment Done!");
    //       getProposalData();
    //       paymentHandler();
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("erroror - ", error);
    //   });
  };

  console.log("id :", id);

  return (
    <div>
      <Modal isOpen={addPaymentModal} toggle={paymentHandler} size="md">
        <ModalHeader toggle={paymentHandler}>Schedule Call</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
          
            <div className="mb-3">
            <label>Select Date</label>
              <input
                type="date"
                name="p_date"
                className="form-select form-control"
                ref={register}
              />
            </div>

            <div className="mb-3">
            <label>Select Time</label>
              <input
                type="time"
                name="p_time"
                className="form-select form-control"
                ref={register}
              />
            </div>

            <div class="modal-footer">
              <button type="submit" className="btn btn-primary">
                Sumbit
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PaymentModal;
