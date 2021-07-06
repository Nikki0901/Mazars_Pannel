import React, { useState } from "react";
import CommonServices from "../../common/common";


function Feedback({ feedback }) {
    console.log("feedback", feedback);

    return (
        <div>
            <p
                style={{
                    textAlign: "center",
                    color: "black",
                    fontSize: "18px",
                }}
            >
                FEEDBACK
            </p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Date</th>
                        <th scope="col">Query No</th>
                        <th scope="col">Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        feedback.map((p, i) => (
                            <tr>
                                <td>{i + 1}</td>
                                <td>
                                    {CommonServices.removeTime(p.created)}
                                </td>
                                <td>{p.assign_no}</td>
                                <td>{p.feedback}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Feedback;