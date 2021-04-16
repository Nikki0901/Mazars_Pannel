import React, { useState, useEffect } from "react";
import CommonServices from "../../common/common";

function BasicQuery({ p, diaplaySpecific, queryDocs ,purpose}) {
  console.log(purpose)

 

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
          BASIC INFORMATION
        </p>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Titles</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Query No</th>
              <td>{p.assign_no}</td>
            </tr>
            <tr>
              <th scope="row">Query Date</th>
              <td>{CommonServices.changeFormateDate(p.created)}</td>
            </tr>
            <tr>
              <th scope="row">Customer ID</th>
              <td>{p.user_id}</td>
            </tr>
            <tr>
              <th scope="row">Category</th>
              <td>{p.cat_name}</td>
            </tr>
            <tr>
              <th scope="row">Sub- Category</th>
              <td>{p.sub_cat_name}</td>
            </tr>
            <tr>
              <th scope="row">Name of the Case</th>
              <td>{p.case_name}</td>
            </tr>
            <tr>
              <th scope="row">Assessment Year</th>
              <td>{p.assessment_year}</td>
            </tr>
            <tr>
              <th scope="row">Fact of the Case</th>
              <td>{p.fact_case}</td>
            </tr>
            <tr>
              <th scope="row">Uploaded Documents</th>
              <td>
                {queryDocs.map((p, i) => (
                  <p>
                    <a
                      href={`http://13.232.121.233/mazarapi/assets/image/${p.name}`}
                    >
                      <i class="fa fa-photo"></i>
                    </a>
                  </p>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">specific questions</th>
              <td colspan="1">
                {diaplaySpecific.map((p, i) => (
                  <p>{p.text}</p>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Purpose for which Opinion is sought</th>
              <td colspan="1">
                {
                  purpose.map((p,i)=>(
                    <p>{p.purpose}</p>
                  ))
                }
              </td>
            </tr>
            <tr>
              <th scope="row">Format in which Opinion is required</th>
              <td colspan="1">
                <p>{p.softcopy_word === "1" && "Softcopy - Word/ Pdf"}</p>
                <p>
                  {p.softcopy_digitally_assigned === "1" &&
                    "SoftCopy- Digitally Signed"}
                </p>

                <p>
                  {p.printout_physically_assigned === "1" &&
                    "Printout- Physically Signed"}
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">Timelines within which Opinion is Required</th>
              <td colspan="1">{p.Timelines}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BasicQuery;
