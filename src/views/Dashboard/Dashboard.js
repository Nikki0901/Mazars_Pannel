import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/config";
// import MyAssingment from '../MyAssingment/MyAssingment'
// import Header from "../../components/Admin-Header/Admin-Header";
// import Sidebar from "../../../components/Admin-Sidebar/Admin-Sidebar";

function Dashboard() {
  const [incompleteData, setSubmitIncompleData] = useState([]);
  const [completeData, setCompleteData] = useState([]);
  const [check, setCheck] = useState(false);

  const userId = window.localStorage.getItem("userid");

  useEffect(() => {
    const getInCompleteAssingment = () => {
      axios
        .get(
          `${baseUrl}/get/customer/incomplete/deshboard/user/${JSON.parse(
            userId
          )}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            if (res.data.result.length ===  0) {
              setCheck(true)
            }else {
              setSubmitIncompleData(res.data.result);
            }
          }
        });
    };

    const getCompleteAssingment = () => {
      axios
        .get(`${baseUrl}/get/customer/complete/deshboard/user/${userId}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {

            // setCompleteData(res.data.result);
          }
        });
    };

    getInCompleteAssingment();
    getCompleteAssingment();
  }, []);


  function ChangeFormateDate(oldDate)
{
   return oldDate.toString().split("-").reverse().join("-");
}

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>

        {
          check ?     
          <div class="col-md-12">
          <div class="schedule">
            <Link to="/customer/addfresh" class="btn btn-primary">
              Fresh Assignment
            </Link>
          </div>
          <br />
        </div>    
          :
          <div class="col-md-12">
        <ul
          class="nav nav-pills mb-3"
          style={{ justifyContent: "space-around" }}
          id="pills-tab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <a
              class="nav-link text-white active"
              id="pills-Queries-tab"
              data-toggle="pill"
              href="#Queries"
              role="tab"
              aria-controls="pills-Queries"
              aria-selected="true"
            >
              Incomplete
            </a>
          </li>

          <li class="nav-item" role="presentation">
            <a
              class="nav-link text-white"
              id="pills-Assignments-tab"
              data-toggle="pill"
              href="#Assignments"
              role="tab"
              aria-controls="pills-Assignments"
              aria-selected="false"
            >
              Complete
            </a>
          </li>
        </ul>

        <div class="tab-content" id="pills-tabContent">

          <div
            class="tab-pane fade show active"
            id="Queries"
            role="tabpanel"
            aria-labelledby="pills-Queries-tab"
          >
            {incompleteData.map((p, i) => (
              <div>
                <table class="table table-bordered" key={i}>
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Query No .</th>
                      <th scope="col">Category</th>
                      <th scope="col">Sub Category</th>
                      <th scope="col">Status</th>
                      <th scope="col">Exp. Delivery Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                      
                        {ChangeFormateDate(p.created)}
                        </td>
                      <th scope="row">
                        <Link to={`/customer/my-assingment/${p.id}`}>
                          {p.AssignNo}
                        </Link>
                      </th>
                      <td>{p.Fact}</td>
                      <td></td>
                      <td></td>
                      <td>
                        <div class="text-center" style={{ color: "blue" }}>
                          <p>{/* <i class="fa fa-credit-card"></i> */}</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <th scope="row"></th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <th scope="row"></th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <th scope="row"></th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div
            class="tab-pane fade"
            id="Assignments"
            role="tabpanel"
            aria-labelledby="pills-Assignments-tab"
          >
            <div>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Assignment No.</th>
                    <th scope="col">Delivery Date</th>
                    <th scope="col">Assignment Stage</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">171700-21783417</th>
                    <td>Mukesh kumar</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        }

    </Layout>
  );
}

export default Dashboard;

// <div class="row mt-3">
// <div class="col-md-12">
//   <ul
//     class="nav nav-pills mb-3"
//     style={{ justifyContent: "space-around" }}
//     id="pills-tab"
//     role="tablist"
//   >
//     <li class="nav-item" role="presentation">
//       <a
//         class="nav-link text-white"
//         onClick={() => toggleHandler("tab1")}
//       >
//         Incomplete
//       </a>
//     </li>
//     <li class="nav-item" role="presentation">
//       <a
//         class="nav-link text-white"
//         onClick={() => toggleHandler("tab2")}
//       >
//         Complete
//       </a>
//     </li>
//   </ul>

//   <div class="tab-content" id="pills-tabContent">
//     {
//     toggle ?
// complete.map((p, i) => (
//   <div>
//     <table class="table table-bordered">
//       <thead>
//         <tr>
//           <th scope="col">Assignment #</th>
//           <th scope="col">Delivery Date</th>
//           <th scope="col">Assignment Stage</th>
//           <th scope="col">Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th scope="row">
//             <p>{p.assign}</p>
//           </th>
//           <td>{p.delivery}</td>
//           <td>Client discussion</td>
//           <td class="bg-success text-white">{p.status}</td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// ))

//      :

// submitData.map((p, i) => (
//   <div>
//     <table class="table table-bordered">
//       <thead>
//         <tr>
//           <th scope="col">Assignment #</th>
//           <th scope="col">Facts of the Case</th>
//           <th scope="col">Exp. Delivery Date</th>
//           <th scope="col">Assignment Stage</th>
//           <th scope="col">Status</th>
//           <th scope="col">Payment</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th scope="row">
//           <Link to="/my-assingment">{p.id}</Link>
//           </th>
//           <td>{p.Fact}</td>
//           <td>{p.exp}</td>
//           <td>Client discussion</td>
//           <td class="bg-success text-white">Complete</td>
//           <td>
//             <div class="text-center">
//               <a href="payment.html">
//                 <i class="fa fa-credit-card"></i>
//               </a>
//             </div>
//           </td>
//         </tr>
//         <tr>
//           <th scope="row"></th>
//           <td></td>
//           <td></td>
//           <td>Draft report</td>
//           <td class="bg-danger text-white">Inprogress</td>
//         </tr>
//         <tr>
//           <th scope="row"></th>
//           <td></td>
//           <td></td>
//           <td>Final Discussion</td>
//           <td class="bg-danger text-white">Inprogress</td>
//         </tr>
//         <tr>
//           <th scope="row"></th>
//           <td></td>
//           <td></td>
//           <td>Delivery of report</td>
//           <td class="bg-success text-white">Complete</td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// ))
// }
//   </div>
// </div>
// </div>

// const toggleHandler = (key) => {
//   if (key === "tab1") {
//     setToggle(false);
//   } else if (key === "tab2") {
//     setToggle(true);
//   }
// };
