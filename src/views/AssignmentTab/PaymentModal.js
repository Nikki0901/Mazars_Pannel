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
  const { id, amount, accepted_amount, paid_amount } = pay;

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
          <table class="table table-bordered">
            <tr>
              <th>Accepted Amount</th>
              <td>{accepted_amount}</td>
            </tr>
            <tr>
              <th>Paid Amount</th>
              <td>{paid_amount}</td>
            </tr>
          </table>
          <form onSubmit={handleSubmit(onSubmit)}>
            {+accepted_amount == +paid_amount ? null : (
              <div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="p_amount"
                    ref={register}
                    className="form-control"
                    defaultValue={accepted_amount - paid_amount}
                    placeholder="enter amount"
                  />
                </div>
                <div class="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Pay
                  </button>
                </div>
              </div>
            )}
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PaymentModal;
