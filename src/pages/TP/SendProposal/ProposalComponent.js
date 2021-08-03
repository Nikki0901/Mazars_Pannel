import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import Alerts from "../../../common/Alerts";

function ProposalComponent(props) {
  const { id } = props;
  console.log(id);

  const alert = useAlert();
  const { register, handleSubmit, reset } = useForm();
  const userid = window.localStorage.getItem("tlkey");

  const [custId, setCustId] = useState("");
  const [custname, setCustName] = useState();
  const [assignId, setAssignID] = useState("");
  const [assingNo, setAssingNo] = useState("");

  const history = useHistory();

  useEffect(() => {
    const getQuery = () => {
      axios
        .get(
          `${baseUrl}/tl/pendingTlProposal?tl_id=${JSON.parse(
            userid
          )}&assign_id=${id}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            if (res.data.result.length > 0) {
              setAssingNo(res.data.result[0].assign_no);
              setAssignID(res.data.result[0].id);
            }
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

    // var date = value.p_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
    var todaysDate = new Date();

    let formData = new FormData();

    formData.append("assign_no", assingNo);
    formData.append("name", value.p_name);
    formData.append("type", "tl");
    formData.append("id", JSON.parse(userid));
    formData.append("amount", value.p_amount);
    formData.append("payable", value.p_payable);
    formData.append("misc1", value.misc_1);
    formData.append("misc2", value.misc_2);
    formData.append("payable_date", todaysDate);
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
          Alerts.SuccessNormal("Proposal successfully sent")
          history.push("/taxprofessional/proposal");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <Col md="5">
              <button
                class="btn btn-success ml-3"
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </Col>
            <Col md="7">
              <div class="btn ml-3">
                <h4>Prepare Proposal</h4>
              </div>
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
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
                  <label>Proposal Description</label>
                  <textarea
                    className="form-control"
                    id="textarea"
                    rows="3"
                    name="misc_2"
                    ref={register}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* <div class="row">
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
            </div> */}

            <br />
            <div class="form-group">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </CardBody>
      </Card>
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

{
  /* <div class="col-md-8">
        <div>
          <h3>Send Proposal</h3>
          <br />

          
        
        </div>
      </div> */
}

// const handleImage = (e) =>{
//   let files = e.target.files
//    console.log(files)

//   let reader = new FileReader();
//   reader.readAsDataURL(files[0])

//  reader.onload = (e) => {
//  console.log("img", e.target.result)
// }

/* <div class="col-md-6">
              <div class="form-group">
                <label>Proposal File</label>
                <input type="file" name="p_image" ref={register} />
              </div>
            </div> */

// const Schema = yup.object().shape({
//     p_assingment: yup.string().required("required assingment"),
//     p_name: yup.string().required("required name"),
//     p_document: yup.string().required("required file"),
//   });

// {
//   Object.entries(res.data.result).map(([key, value]) => {
//     console.log("val", value.name);
//     setCustName(value.name);
//   });
// }

{
  /* <select
                    class="form-control"
                    ref={register}
                    name="p_assingment"
                    onChange={(e) => getID(e.target.value)}
                  >
                    <option value="">--select--</option>
                    {incompleteData.map((p, index) => (
                      <option key={index} value={p.id}>
                        {p.assign_no}
                      </option>
                    ))}
                  </select> */
}

// const getID = (key) => {
//     setId(key);
//     incompleteData.filter((data) => {
//       if (data.id == key) {
//         console.log("assingNo", data.assign_no);
//         setAssingNo(data.assign_no);
//         setAssignID(data.id);
//       }
//     });
//   };
