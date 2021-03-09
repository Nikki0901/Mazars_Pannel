import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";

function PaymentModal({ addPaymentModal, paymentHandler, pay }) {
  const { handleSubmit } = useForm();

  console.log("pay", pay);

    const { amount, id } = pay


  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("id", id);
    formData.append("status", 8);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/ProposalAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        paymentHandler();
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <div>
      <Modal isOpen={addPaymentModal} toggle={paymentHandler} size="sm">
        <ModalHeader toggle={paymentHandler}>Add Paid Payment</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <h2>{amount}</h2>
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
