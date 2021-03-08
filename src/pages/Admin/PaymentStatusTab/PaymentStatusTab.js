import React from "react";
import Layout from "../../../components/Layout/Layout";
import PaidComponent from '../../../components/PaidComponent/PaidComponent'
import UnPaidComponent from '../../../components/UnPaidComponent/UnPaidComponent'


function PaymentStatusTab() {
  const userid = window.localStorage.getItem("adminkey");
  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <div class="row mt-3">
        <div class="col-md-12" style={{ top: "-12px" }}>
          <ul
            class="nav nav-pills mb-3 col-sm-12"
            style={{ justifyContent: "space-around" }}
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-white active"
                id="pills-a-tab"
                data-toggle="pill"
                href="#a"
                role="tab"
                aria-controls="pills-a"
                aria-selected="true"
              >
               UnPaid 
              </a>
            </li>

            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-white"
                id="pills-b-tab"
                data-toggle="pill"
                href="#b"
                role="tab"
                aria-controls="pills-b"
                aria-selected="false"
              >
                Paid
              </a>
            </li>
          </ul>

          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="a"
              role="tabpanel"
              aria-labelledby="pills-a-tab"
            >
                 <UnPaidComponent /> 
            </div>

            <div
              class="tab-pane fade"
              id="b"
              role="tabpanel"
              aria-labelledby="pills-b-tab"
            >
              <PaidComponent />
            </div>
          </div>
        </div>
      </div>
    
    </Layout>
  );
}

export default PaymentStatusTab;

