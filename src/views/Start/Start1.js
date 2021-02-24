import React, { useState, useEffect } from "react";
import "../../assets/css/bootstrap.min.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import mazars from "../../assets/images/mazars-logo.png";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";


function Start1() {
  const { handleSubmit, register, errors, reset } = useForm();
  const [modal, setModal] = useState(false);

  const toggle = () => {
    if (store3 === "10") {
      localStorage.setItem("category", JSON.stringify(store4));
    } else {
      localStorage.setItem("category", JSON.stringify(store3));
    }
    setModal(!modal);
  };

  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [tax3, setTax3] = useState([]);
  const [tax4, setTax4] = useState([]);

  const [store, setStore] = useState(null);
  const [store2, setStore2] = useState(null);
  const [store3, setStore3] = useState(null);
  const [store4, setStore4] = useState(null);



  useEffect(() => {
    const getCategory = () => {
      axios.get(`${baseUrl}/get/by/directtax/0`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax(res.data.result);
        }
      });
    };

    const getSubCategory = () => {
      axios.get(`${baseUrl}/get/by/directtax/${store}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax2(res.data.result);
        }
      });
    };

    const getSubCategory2 = () => {
      axios.get(`${baseUrl}/get/by/directtax/${store2}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax3(res.data.result);
        }
      });
    };

    const getSubCategory3 = () => {
      axios.get(`${baseUrl}/get/by/directtax/${store3}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax4(res.data.result);
        }
      });
    };

    getCategory();
    getSubCategory();
    getSubCategory2();
    getSubCategory3();
  }, [store, store2, store3]);


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
              <label>Another label</label>
              <select
                className="form-select form-control"
                name="p_tax"
                ref={register}
                onChange={(e) => setStore(e.target.value)}
              >
                <option value="">--select--</option>
                {tax.map((p, index) => (
                  <option key={index} value={p.id}>
                    {p.details}
                  </option>
                ))}
              </select>
        
            </div>

            <div class="form-group">
              <label>Another label</label>
              <select
                className="form-select form-control"
                name="p_tax2"
                ref={register}
                onChange={(e) => setStore2(e.target.value)}
              >
                <option value="">--select--</option>
                {tax2.map((p, index) => (
                  <option key={index} value={p.id}>
                    {p.details}
                  </option>
                ))}
              </select>
        
            </div>

            <div class="form-group">
              <label>Another label</label>
              <select
                className="form-select form-control"
                name="p_tax3"
                ref={register}
                onChange={(e) => setStore3(e.target.value)}
              >
                <option value="">--select--</option>
                {tax3.map((p, index) => (
                  <option key={index} value={p.id}>
                    {p.details}
                  </option>
                ))}
              </select>
              
            </div>

            {store3 === "10" && (
              <div class="form-group">
                <label>Another label</label>
                <select
                  className="form-select form-control"
                  name="p_tax4"
                  ref={register}
                  onChange={(e) => setStore4(e.target.value)}
                >
                  <option value="">--select--</option>
                  {tax4.map((p, index) => (
                    <option key={index} value={p.id}>
                      {p.details}
                    </option>
                  ))}
                </select>
              
              </div>
            )}

            <div class="form-group">
              <button
                type="submit"
                class="btn btn-primary  btn-block"
                onClick={toggle}
              >
                Submit
              </button>
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

export default Start1;
