import React, { useState, useEffect } from "react";
import "../../assets/css/bootstrap.min.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import mazars from "../../assets/images/mazars-logo.png";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";

function CategorySelect({ addfreshbtn, startbtn }) {
  const { handleSubmit, register, errors, reset } = useForm();
  const [modal, setModal] = useState(false);

  const toggle = () => {
    if (store2) {
      localStorage.setItem("category", JSON.stringify(store2));
    }
    setModal(!modal);
  };

  const toggle2 = () => {
    if (store2) {
      localStorage.setItem("category", JSON.stringify(store2));
    }
  };

  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);

  const [store, setStore] = useState("");
  const [store2, setStore2] = useState(null);

  useEffect(() => {
    const getCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax(res.data.result);
        }
      });
    };

    getCategory();
  }, []);


  useEffect(() => {
    const getSubCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=${store}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax2(res.data.result);
        }
      });
    };
    getSubCategory();
  }, [store]);

  
  const onSubmit = (value) => {
    console.log("value :", value);
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <div class="col-sm-3" style={{ marginTop: "38px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-group">
              <label>Category</label>
              <select
                className="form-select form-control"
                name="p_tax"
                ref={register}
                onChange={(e) => setStore(e.target.value)}
              >
                <option value="">--Select Category--</option>
                {tax.map((p, index) => (
                  <option key={index} value={p.id}>
                    {p.details}
                  </option>
                ))}
              </select>
            </div>

            <div class="form-group">
              <label>Sub Category</label>
              <select
                className="form-select form-control"
                name="p_tax2"
                ref={register}
                onChange={(e) => setStore2(e.target.value)}
              >
                <option value="">--Select Sub-Category--</option>
                {tax2.map((p, index) => (
                  <option key={index} value={p.id}>
                    {p.details}
                  </option>
                ))}
              </select>
            </div>

            <div class="form-group">
              {startbtn && (
                <button
                  type="submit"
                  class="btn btn-primary  btn-block"
                  onClick={toggle}
                >
                  Submit
                </button>
              )}

              {addfreshbtn && (
                <Link
                  to="/customer/addfresh"
                  type="submit"
                  class="btn btn-primary  btn-block"
                  onClick={toggle2}
                >
                  Submit
                </Link>
              )}
            </div>
          </form>

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              <img
                src={mazars}
                style={{ height: "auto", width: "25%" }}
                alt=""
              />
            </ModalHeader>

            <ModalBody>
              <div class="modal-body">
                <h4>Would you like to post a Query ?</h4>
              </div>
            </ModalBody>

            <div class="modal-footer m-auto">
              <Link to="/customer/register-yourself" class="btn btn-primary">
                Yes
              </Link>
              <Link to="/customer/signin" class="btn btn-secondary">
                No
              </Link>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default CategorySelect;
