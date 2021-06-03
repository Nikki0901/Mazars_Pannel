import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BasicQuery from "./BasicQuery";
import ProposalDetails from "./ProposalDetails";
import AssignmentDetails from "./AssignmentDetails";
import AdditionalQuery from "./AdditionalQuery";
import AddAdditionalQuery from "./AddAdditionalQuery";
import CommonServices from "../../common/common";

function QueryDetails({
  p,
  diaplaySpecific,
  diaplayProposal,
  diaplayHistory,
  diaplayAssignment,
  displayQuery,
  assingNo,
  getQuery,
  customerQuery,
  queryDocs,
  purpose,
  paymentDetails,
  year
}) {
  console.log("p", p);
  const history = useHistory();

  const [addModal, setAddModal] = useState(false);
  const addHandler = () => setAddModal(!addModal);

  return (
    <>
      <div class="card">
        <div
          class="card-header"
          id="headingOne"
          style={{ padding: ".5rem .1rem" }}
        >
          <h2 class="mb-0 query">
            <div>
              <button
                class="btn btn-success ml-3"
                onClick={() => history.goBack()}
              >
                Go Back
              </button>
            </div>

            {/* <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <p class="m-0" style={{ fontSize: "15px" }}>
                Submitted on
              </p>
              <p class="m-0" style={{ fontSize: "15px" }}>
                : {CommonServices.changeFormateDate(p.created)}
              </p>
            </div>
            <div class="d-flex">
              <div class="additional">
                {customerQuery == "customerQuery" && (
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={addHandler}
                  >
                    Additional Query
                  </button>
                )}
              </div>
            </div> */}
          </h2>
        </div>

        <div class="card-body">
          <BasicQuery
            p={p}
            diaplaySpecific={diaplaySpecific}
            purpose={purpose}
            queryDocs={queryDocs}
            year={year}
          />
          <ProposalDetails
            diaplayProposal={diaplayProposal}
            diaplayHistory={diaplayHistory}
            paymentDetails={paymentDetails}
            p={p}
          />
          <AssignmentDetails diaplayAssignment={diaplayAssignment} 
          p={p} 
          diaplayProposal={diaplayProposal}
          />
          {/* <AdditionalQuery displayQuery={displayQuery} /> */}
        </div>

        {/* <AddAdditionalQuery
          addHandler={addHandler}
          addModal={addModal}
          assingNo={assingNo}
          getQuery={getQuery}
        /> */}
      </div>
    </>
  );
}

export default QueryDetails;
