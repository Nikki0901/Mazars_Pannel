import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import Payment from "./Payment";

function ProposalComponent() {

  const alert = useAlert();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { email: "", firstname: "" },
  });
  const userid = window.localStorage.getItem("tlkey");

  const [custId, setCustId] = useState("");
  const [store, setStore] = useState(null);
  const [payment, setPayment] = useState(null);
  const [installment, setInstallment] = useState(null);
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();

  const history = useHistory();
  const { id } = useParams();

  const [proposal, setProposal] = useState({
    query: "",
    name: "",
    fixed_amount: "",
    payable: "",
    description: "",
    payment_terms: "",
    no_of_installment: "",
    installment_amount: "",
    due_date: "",
  });
  const { query, name, description, fixed_amount,
    no_of_installment, payment_terms,
    due_date, installment_amount } = proposal;

  useEffect(() => {
    getQuery();
  }, []);


  const getQuery = () => {
    axios.get(`${baseUrl}/tl/getProposalDetail?id=${id}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setProposal({
          name: res.data.result.name,
          query: res.data.result.assign_no,
          fixed_amount: res.data.result.amount,
          description: res.data.result.description,
          payment_terms: res.data.result.payment_terms,
          installment_amount: res.data.result.installment_amount,
          due_date: res.data.result.due_date,
        });

        setInstallment(res.data.result.no_of_installment)
      }
    });
  };



  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${baseUrl}/customers/allname?id=${id}`);
      setCustId(res.data.id);
    };
    getUser();
  }, [id]);



  const onSubmit = (value) => {
    console.log(value);

    var lumsum = value.p_inst_date
    setDate(lumsum)

    let formData = new FormData();

    formData.append("assign_no", value.p_assingment);
    formData.append("name", value.p_name);
    formData.append("type", "tl");
    formData.append("id", JSON.parse(userid));
    formData.append("description", value.description);
    formData.append("customer_id", custId);
    formData.append("assign_id", id);

    formData.append("amount_type", value.p_type);
    formData.append("amount", value.p_fixed);
    formData.append("amount_hourly", value.p_hourly);
    formData.append("payment_terms", value.p_payment_terms);
    formData.append("no_of_installment", value.p_no_installments);
    formData.append("installment_amount", amount);

    payment == "lumpsum" ?
      formData.append("due_date", lumsum) :
      formData.append("due_date", date)


    axios({
      method: "POST",
      url: `${baseUrl}/tl/updateProposal`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          // getQuery();
          alert.success(<Msg />);
          history.push("/teamleader/proposal");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  const Msg = () => {
    return (
      <>
        <p style={{ fontSize: "10px" }}>proposal updated</p>
      </>
    );
  };


  const paymentAmount = (data) => {
    console.log("paymentAmount", data)

    var array1 = []
    Object.entries(data).map(([key, value]) => {
      console.log("val", value);
      array1.push(value)
    });
    console.log("array1", array1);

    setAmount(array1);
  };

  const paymentDate = (data) => {
    console.log("paymentDate", data)

    var array2 = []
    Object.entries(data).map(([key, value]) => {
      console.log("val", value);
      array2.push(value)
    });
    console.log("array2", array2);
    setDate(array2);
  };



  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
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
                <h4>Edit Proposal</h4>
              </div>
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div style={{ display: "flex" }}>
              <div class="col-md-6">

                <div class="form-group">
                  <label>Query No.</label>
                  <input
                    type="text"
                    name="p_assingment"
                    class="form-control"
                    value={query}
                    ref={register}
                  />
                </div>

                <div class="form-group">
                  <label>Fee</label>
                  <select
                    class="form-control"
                    ref={register}
                    name="p_type"
                    onChange={(e) => setStore(e.target.value)}
                  >
                    {/* <option value="">--select type--</option> */}
                    <option value="fixed">Fixed Price</option>
                  </select>
                </div>


                <div class="form-group">
                  <label>Fixed Price</label>
                  <input
                    type="text"
                    name="p_fixed"
                    className="form-control"
                    ref={register}
                    placeholder="Enter Fixed Price"
                    defaultValue={fixed_amount}
                  />
                </div>


                <div class="form-group">
                  <label>Scope of Work</label>
                  <textarea
                    className="form-control"
                    id="textarea"
                    rows="3"
                    name="description"
                    defaultValue={description}
                    ref={register}
                  ></textarea>
                </div>

              </div>


              <div class="col-md-6">

                <div class="form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    name="p_name"
                    class="form-control"
                    value={name}
                    ref={register}
                  />
                </div>



                <div class="form-group">
                  <label>Payment Terms</label>
                  <select
                    className="form-control"
                    name="p_payment_terms"
                    aria-label="Default select example"
                    ref={register}
                    onChange={(e) => setPayment(e.target.value)}
                    value="jjkhlj"
                  >
                    <option value="">--select--</option>
                    <option value="lumpsum">Lumpsum</option>
                    <option value="installment">Installment</option>
                  </select>
                </div>


                {payment_terms == "lumpsum" ? (
                  <div class="form-group">
                    <label>Due Dates</label>
                    <input
                      type="date"
                      name="p_inst_date"
                      className="form-control"
                      ref={register}
                      placeholder="Enter Hourly basis"
                      defaultValue={due_date}
                    />
                  </div>
                ) :
                  payment_terms == "installment" ? (
                    <div class="form-group">
                      <label>No of Installments</label>
                      <select
                        className="form-control"
                        name="p_no_installments"
                        aria-label="Default select example"
                        ref={register}
                        onChange={(e) => setInstallment(e.target.value)}
                      >
                        <option value="">--select--</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  )
                    : ""
                }
                {
                  payment == "Lumpsum"
                    ?
                    ""
                    :
                    <Payment
                      installment={installment}
                      paymentAmount={paymentAmount}
                      paymentDate={paymentDate}
                      installment_amount={installment_amount}
                      due_date={due_date}
                    />
                }

              </div>
            </div>


            <div class="form-group col-md-6">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default ProposalComponent;



{/* {store == "hourly" && (
                  <div class="form-group">
                    <label>Hourly basis</label>
                    <input
                      type="text"
                      name="p_hourly"
                      className="form-control"
                      ref={register}
                      placeholder="Enter Hourly basis"
                    />
                  </div>
                )}
                {store == "mixed" && (
                  <div>
                    <div class="form-group">
                      <label>Mixed</label>
                      <input
                        type="text"
                        name="p_fixed"
                        className="form-control"
                        ref={register}
                        placeholder="Enter Fixed Price"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        name="p_hourly"
                        className="form-control"
                        ref={register}
                        placeholder="Enter Hourly basis"
                      />
                    </div>
                  </div>
                )} */}
