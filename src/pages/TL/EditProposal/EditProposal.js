// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { baseUrl } from "../../../config/config";
// import { useAlert } from "react-alert";
// import { useHistory, useParams } from "react-router-dom";
// import Layout from "../../../components/Layout/Layout";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Row,
//   Col,
// } from "reactstrap";
// import Loader from "react-loader-spinner";

// function ProposalComponent() {

//   const alert = useAlert();
//   const userid = window.localStorage.getItem("tlkey");

//   const [loading, setLoading] = useState(true);

//   const history = useHistory();
//   const { id } = useParams();

//   const [proposal, setProposal] = useState({
//     query: "",
//     name: "",
//     amount: "",
//     payable: "",
//     misc1: "",
//     misc2: "",
//     payable_through: "",
//   });
//   const { query, name, amount, misc1, misc2, payable_through } = proposal;
//   const [errormsg, setErrormsg] = useState({amounterr: "", misc1err: "", misc2err: ""});

//   useEffect(() => {
//     getQuery();
//   }, []);

//   const getQuery = () => {
//     axios.get(`${baseUrl}/tl/getProposalDetail?id=${id}`).then((res) => {
//       console.log(res);
//       if (res.data.code === 1) {
//         setProposal({
//           name: res.data.result.name,
//           query: res.data.result.assign_no,
//           amount: res.data.result.amount,
//           misc1: res.data.result.misc1,
//           misc2: res.data.result.misc2,
//           payable_through: res.data.result.payable_through,
//         });
//       }
//       setLoading(false);
//     });
//   };


//   const HandleSubmit = async(e) => {
//     if(errormsg.amounterr || errormsg.misc1err || errormsg.misc2err){
//         alert.show("Please fill form properly!", {
//           type: "error"
//         });
//     }
//     else{
//       e.preventDefault();
//       let formData = new FormData();

//       formData.append("assign_no", query);
//       formData.append("name", name);
//       formData.append("assign_id", id);
//       formData.append("amount", amount);
//       formData.append("payable_through", payable_through);
//       formData.append("misc1", misc1);
//       formData.append("misc2", misc2);

//       await axios({
//         method: "POST",
//         url: `${baseUrl}/tl/updateProposal`,
//         data: formData,
//       })
//         .then(function (response) {
//           console.log("res-", response);
//           if (response.data.code === 1) {
//             // reset();
//             alert.success(<Msg />);
//             history.push("/teamleader/proposal");
//           }
//         })
//         .catch((error) => {
//           console.log("erroror - ", error);
//         });
//     }
//   };

//   //alert msg
//   const Msg = () => {
//     return (
//       <>
//         <p style={{ fontSize: "10px" }}>proposal updated</p>
//       </>
//     );
//   };

//   const inputHandler = (e) => {
//     let name = e.target.name;
//     let val = e.target.value;
//     let err = "";

//     if(name === "amount"){
//         if(!Number(val) || val === ""){
//             err = <strong>Please enter a valid amount!</strong>
//             setErrormsg(prevState => ({
//                 ...prevState,
//                 amounterr: err
//             }))
//         }
//         else{
//             setErrormsg(prevState => ({
//                 ...prevState,
//                 amounterr: ""
//             }));
//             setProposal(prevState => ({
//               ...prevState,
//               amount: val
//             }));
//         }
//     }
//     else if(name === "misc1"){
//         if(val === ""){
//             err = <strong>Please enter a valid input!</strong>
//             setErrormsg(prevState => ({
//                 ...prevState,
//                 misc1err: err
//             }))
//         }
//         else{
//             setErrormsg(prevState => ({
//                 ...prevState,
//                 misc1err: ""
//             }));
//             setProposal(prevState => ({
//               ...prevState,
//               misc1: val
//             }));
//         }
//     }
//     else if(name === "misc2"){
//         if(val === ""){
//             err = <strong>Please enter a valid input!</strong>
//             setErrormsg(prevState => ({
//                 ...prevState,
//                 misc2err: err
//             }))
//         }
//         else{
//             setErrormsg(prevState => ({
//                 ...prevState,
//                 misc2err: ""
//             }))
//             setProposal(prevState => ({
//               ...prevState,
//               misc2: val
//             }));
//         }
//     }
//   }

//   return (
//     <Layout TLDashboard="TLDashboard" TLuserId={userid}>
//       <Card>
//         <CardHeader>
//           <Row>
//             <Col md="5">
//               <button
//                 class="btn btn-success ml-3"
//                 onClick={() => history.goBack()}
//               >
//                 <i class="fas fa-arrow-left mr-2"></i>
//                 Go Back
//               </button>
//             </Col>
//             <Col md="7">
//               <div class="btn ml-3">
//                 <h4>Edit Proposal</h4>
//               </div>
//             </Col>
//           </Row>
//         </CardHeader>

//         {loading ? (
//           <div style={{display: 'flex', justifyContent: 'center'}}><Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /></div>
//         ) : (
//           <CardBody>
//           <form onSubmit={(e) => {HandleSubmit(e)}}>
//             <div class="row">
//               <div class="col-md-6">
//                 <div class="form-group">
//                   <label>Query No.</label>
//                   <input className="form-control"  type="text" placeholder="query no." value={query}/>
//                 </div>
//               </div>

//               <div class="col-md-6">
//                 <div class="form-group">
//                   <label>Customer Name</label>
//                   <input className="form-control"  type="text" placeholder="query no." value={name}/>
//                 </div>
//               </div>
//             </div>

//             <div class="row">
//               <div class="col-md-6">
//                 <div class="form-group">
//                   <label>Amount</label>
//                   <input className="form-control" type="text" name="amount" placeholder="enter amount" defaultValue={amount} onChange={inputHandler} /><br/>
//                   {errormsg.amounterr}
//                 </div>
//               </div>

//               <div class="col-md-6">
//                 <div class="form-group">
//                   <label>Payment mode</label>
//                   <select className="form-control" name="payment" id="payment">
//                     <option value="none" selected disabled hidden>
//                       {payable_through ? payable_through : "--select--"}</option>
//                     <option value="neft" >NEFT</option>
//                     <option value="debit">DEBIT CARD</option>
//                     <option value="credit">CREDIT CARD</option>
//                     <option value="upi">UPI</option>
//                     <option value="wallet">Wallet</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div class="row">
//               <div class="col-md-6">
//                 <div class="form-group">
//                   <label>Misc 1</label>
//                   <input className="form-control" name="misc1" type="text" defaultValue={misc1} onChange={inputHandler} /><br/>
//                   {errormsg.misc1err}
//                 </div>
//               </div>
//               <div class="col-md-6">
//                 <div class="form-group">
//                   <label>Proposal Description</label>
//                   <textarea rows="3" className="form-control" type="text" name="misc2" defaultValue={misc2} onChange={inputHandler} /><br/>
//                   {errormsg.misc2err}
//                 </div>
//               </div>
//             </div>

//             <br />
//             <div class="form-group">
//               <button type="submit" class="btn btn-primary">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </CardBody>
//         )}
//       </Card>
//     </Layout>
//   );
// }

// export default ProposalComponent;

// const payable = [
//   { pay: "NEFT" },
//   { pay: "DEBIT CARD" },
//   { pay: "CREDIT CARD" },
//   { pay: "UPI" },
//   { pay: "WALLET" },
// ];





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

function ProposalComponent() {

  const alert = useAlert();
  const { register, handleSubmit, reset } = useForm();
  const userid = window.localStorage.getItem("tlkey");

  const [custId, setCustId] = useState("");
  const [custname, setCustName] = useState();
  const [assignId, setAssignID] = useState("");
  const [assingNo, setAssingNo] = useState("");

  const history = useHistory();
  const { id } = useParams();

  const [proposal, setProposal] = useState({
    query: "",
    name: "",
    amount: "",
    payable: "",
    misc1: "",
    misc2: "",
    payable_through: "",
  });
  const { query, name, amount, misc1, misc2, payable_through } = proposal;

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
          amount: res.data.result.amount,
          misc1: res.data.result.misc1,
          misc2: res.data.result.misc2,
          payable_through: res.data.result.payable_through,
        });
      }
    });
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${baseUrl}/customers/allname?id=${id}`);
      console.log("res", res);
      // setCustName(res.data.name);
      setCustId(res.data.id);
    };
    getUser();
  }, [id]);

  console.log(assignId);

  const onSubmit = (value) => {
    console.log(value);

    // var date = value.p_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
    var todaysDate = new Date();
    let formData = new FormData();

    formData.append("assign_no", value.p_assingment);
    formData.append("name", value.p_name);
    // formData.append("type", "tl");
    formData.append("assign_id", id);
    formData.append("amount", value.p_amount);
    formData.append("payable_through", value.p_payable);
    formData.append("misc1", value.misc_1);
    formData.append("misc2", value.misc_2);
    // formData.append("payable_date", todaysDate);
    // formData.append("customer_id", custId);
    // formData.append("assign_id", assignId);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/updateProposal`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          // reset();
          getQuery();
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
            <div class="row">
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
                    defaultValue={amount}
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                <label>Payment Mode</label>
                  <select
                    class="form-control"
                    name="p_payable"
                    aria-label="Default select example"
                    ref={register}
                    defaultValue={payable_through}
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
                    defaultValue={misc1}
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
                    defaultValue={misc2}
                    ref={register}
                  ></textarea>
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
        </CardBody>
      </Card>
    </Layout>
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
