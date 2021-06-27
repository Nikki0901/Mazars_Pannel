import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
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
  year,
}) {
  console.log("p", p);
  const history = useHistory();

  // const [addModal, setAddModal] = useState(false);
  // const addHandler = () => setAddModal(!addModal);

  return (
    <>
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
        <AssignmentDetails
          diaplayAssignment={diaplayAssignment}
          p={p}
          diaplayProposal={diaplayProposal}
        />
      </div>
    </>
  );
}

export default QueryDetails;

{
  /* <AddAdditionalQuery
          addHandler={addHandler}
          addModal={addModal}
          assingNo={assingNo}
          getQuery={getQuery}
        /> */
}
{
  /* <AdditionalQuery displayQuery={displayQuery} /> */
}
{
  /* <div style={{ display: "flex", justifyContent: "space-evenly" }}>
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
            </div> */
}
