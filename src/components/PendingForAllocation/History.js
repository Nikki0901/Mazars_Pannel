import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../config/config";

function History({ addModal, addHandler, id }) {

  console.log("hist", id);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, [id]);

  const getHistory = () => {
    console.log("useeffect");
    axios.get(`${baseUrl}/customers/getQueryHistory?q_id=${id}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setHistory(res.data.result);
      }
    });
  };

  //change date format
  function ChangeFormateDate(oldDate) {
    // console.log("date", oldDate);
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }

  return (
    <>
      <Modal isOpen={addModal} toggle={addHandler} size="md">
        <ModalHeader toggle={addHandler}>Show history</ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Titles</th>
                <th scope="col">Data</th>
              </tr>
            </thead>

            {history.map((p, i) => (
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td>{p.name}</td>
                </tr>

                <tr>
                  <th scope="row">Date of Allocation</th>
                  <td>{ChangeFormateDate(p.date_of_allocation)}</td>
                </tr>
                <tr>
                  <th scope="row">Query No</th>
                  <td>{p.assign_no}</td>
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  <td>{p.status}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </ModalBody>
      </Modal>
    </>
  );
}

export default History;
