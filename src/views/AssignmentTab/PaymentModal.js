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
  const { id, amount } = pay;

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("id", id);
    formData.append("status", 8);
    formData.append("amount", value.p_amount);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/PaymentPartialAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("Payment Done!");
          history.push("/customer/queries");
          getProposalData();
          paymentHandler();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <div>
      <Modal isOpen={addPaymentModal} toggle={paymentHandler} size="sm">
        <ModalHeader toggle={paymentHandler}>Payment</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                type="text"
                name="p_amount"
                ref={register}
                className="form-control"
                defaultValue={amount}
                placeholder="enter amount"
              />
            </div>
            <div class="modal-footer">
              <button type="submit" className="btn btn-primary">
                Pay
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PaymentModal;
