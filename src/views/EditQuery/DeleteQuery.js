import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useHistory } from "react-router-dom";

function DeleteQuery({ id }) {
  const userId = window.localStorage.getItem("userid");
  const history = useHistory();

  //   console.log("id", id);

  //check
  const del = (id) => {
    console.log("del", id);

    Swal.fire({
      title: "Are you sure?",
      text: "It will permanently deleted !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteCliente(id);
      }
    });
  };

  const deleteCliente = (id) => {
    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("id", id);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/deleteQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          history.push("/customer/queries");
        } else {
          Swal.fire("Oops...", "Errorr ", "error");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <div>
      <button type="button" class="btn btn-primary" onClick={() => del(id)}>
        Delete
      </button>
    </div>
  );
}

export default DeleteQuery;

{
  /* <i
        className="fa fa-trash"
        style={{
          fontSize: 16,
          cursor: "pointer",
        }}
        
      ></i> */
}
