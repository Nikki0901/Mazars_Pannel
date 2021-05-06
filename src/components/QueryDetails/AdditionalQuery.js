import React from "react";
import CommonServices from "../../common/common";

function AdditionalQuery({ displayQuery }) {
  return (
    <>
      <div>
        <p
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "18px",
          }}
        >
          ADDITIONAL QUERIES
        </p>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" style={{ width: "33.3%" }}>
                Additional Queries
              </th>
              <th scope="col">Date Submission</th>
              <th scope="col">Documents</th>
            </tr>
          </thead>
          {displayQuery.map((p, i) => (
            <tbody>
              <tr key={i}>
                <td>{p.additional_queries}</td>
                <td>{CommonServices.changeFormateDate(p.created)}</td>
                <td>
                  {p.upload_doc == "" ? (
                    ""
                  ) : (
                    <p>
                      <a
                        href={`http://65.0.220.156/mazarapi/assets/image/${p.upload_doc}`}
                      >
                        <i class="fa fa-photo"></i>
                      </a>
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}

export default AdditionalQuery;
