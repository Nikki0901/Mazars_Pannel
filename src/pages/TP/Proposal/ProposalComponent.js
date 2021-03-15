import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

function ProposalComponent() {
  const alert = useAlert();
  const { register, handleSubmit, reset } = useForm();

  const userid = window.localStorage.getItem("tpkey");

  const [assignId, setAssignID] = useState("");
  const [assingNo, setAssingNo] = useState("");
  const [custId, setCustId] = useState("");
  const [custname, setCustName] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getQuery = () => {
      axios
        .get(
          `${baseUrl}/tp/getassignedques?id=${JSON.parse(
            userid
          )}&assign_id=${id}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setAssingNo(res.data.result[0].assign_no);
            setAssignID(res.data.result[0].id);
          }
        });
    };
    getQuery();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${baseUrl}/customers/allname?id=${id}`);
      console.log("res", res);
      setCustName(res.data.name);
      setCustId(res.data.id);
    };

    getUser();
  }, [id]);

  const onSubmit = (value) => {
    console.log(value);

    var date = value.p_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
    let formData = new FormData();

    formData.append("assign_no", assingNo);
    formData.append("name", value.p_name);
    formData.append("type", "tp");
    formData.append("id", JSON.parse(userid));
    formData.append("amount", value.p_amount);
    formData.append("payable", value.p_payable);
    formData.append("misc1", value.misc_1);
    formData.append("misc2", value.misc_2);
    formData.append("payable_date", value.p_date);
    formData.append("customer_id", custId);
    formData.append("assign_id", assignId);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/uploadProposal`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          reset();
          alert.success("proposal successfully send !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <>
      <div class="col-md-8">
        <div>
          <h3>Send Proposal</h3>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Query No.</label>
                  <input
                    type="text"
                    name="p_assingment"
                    class="form-control"
                    value={assingNo}
                    ref={register}
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    name="p_name"
                    class="form-control"
                    value={custname}
                    ref={register}
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Amount</label>
                  <input
                    type="text"
                    name="p_amount"
                    class="form-control"
                    ref={register}
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label>Payable by Through</label>
                  <select
                    class="form-control"
                    name="p_payable"
                    aria-label="Default select example"
                    ref={register}
                  >
                    <option value="">--select--</option>
                    {payable.map((p, index) => (
                      <option key={index} value={p.pay}>
                        {p.pay}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Misc 1</label>
                  <input
                    type="text"
                    name="misc_1"
                    class="form-control"
                    ref={register}
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Misc 2</label>
                  <input
                    type="text"
                    name="misc_2"
                    class="form-control"
                    ref={register}
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Payable by date</label>
                  <input
                    type="date"
                    name="p_date"
                    class="form-control"
                    ref={register}
                  />
                </div>
              </div>
            </div>

            <br />
            <div class="form-group">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProposalComponent;

const payable = [
  { pay: "NEFT" },
  { pay: "DEBIT CARD" },
  { pay: "CREDIT CARD" },
  { pay: "UPI" },
  { pay: "WALLET" },
];

// {
//   Object.entries(res.data.result).map(([key, value]) => {
//     console.log("val", value.name);
//     setCustName(value.name);
//   });
// }

// const getID = (key) =>{
//   setId(key)

//   incompleteData.filter((data)=>{
//     if(data.id == key){
//       console.log('assingNo', data.assign_no);
//       setAssingNo(data.assign_no)
//       setAssignID(data.id)
//     }
//   })
// }
