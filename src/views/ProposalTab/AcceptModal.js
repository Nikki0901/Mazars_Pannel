import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";


function AcceptModal({ acceptedModal, acceptedHandler, id}) {
    const { handleSubmit, register, reset } = useForm();

console.log("accept-id",id)

    const onSubmit = (value) => {
      console.log("value :", value);

      let formData = new FormData();
      formData.append("amount", value.p_amount);
      formData.append("id", id);
    
      axios({
        method: "POST",
        url: `${baseUrl}/customers/updateamount`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);  
          acceptedHandler();            
        })
        .catch((error) => {
          console.log("erroror - ", error);
       });
  };

    return (
        <div>
              <Modal isOpen={acceptedModal} toggle={acceptedHandler} size="sm">
              <ModalHeader toggle={acceptedHandler}>Add Amount</ModalHeader>
              <ModalBody>
                   <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="p_amount"
                      ref={register}
                      placeholder="enter amount"
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

export default AcceptModal;