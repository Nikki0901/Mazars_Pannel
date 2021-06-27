import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";

const Schema = yup.object().shape({
  p_chat: yup.string().required("required discussion"),
});

function RejectedModal({
  rejectModal,
  rejectHandler,
  rejectedItem,
  getPendingforAcceptance,
}) {
  const userId = window.localStorage.getItem("userid");
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });
  const alert = useAlert();

  console.log("rejectedItem :", rejectedItem);

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("id", rejectedItem.assign_id);
    formData.append("query_no", rejectedItem.assign_no);
    formData.append("message", value.p_chat);
    formData.append("type", 2);
    axios({
      method: "POST",
      url: `${baseUrl}/customers/draftAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("response-", response);
        if (response.data.code === 1) {
          alert.success("Submitted!");
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
      <Modal isOpen={rejectModal} toggle={rejectHandler} size="sm">
        <ModalHeader toggle={rejectHandler}>Discussion Message</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <textarea
                className={classNames("form-control", {
                  "is-invalid": errors.p_chat,
                })}
                id="textarea"
                rows="4"
                name="p_chat"
                ref={register}
                placeholder="enter text here"
              ></textarea>

              {errors.p_chat && (
                <div className="invalid-feedback">{errors.p_chat.message}</div>
              )}
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
