import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../config/config";

function AddTeamProf() {
  const [data, setData] = useState([]);
  
  const userid = window.localStorage.getItem("tlkey");

  useEffect(() => {
    const getTaxProf = () => {
      axios.get(`${baseUrl}/Get/teamleaderortaxprofession//tp`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setData(res.data.result);
        }
      });
    };

    getTaxProf();
  }, []);

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="schedule">
            <h3>Tax Professionals</h3>
            <NavLink to={"/teamleader/addnew"} class="btn btn-primary">
              Add New
            </NavLink>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />

       
          <div class="col-md-12">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone No.</th>
                </tr>
              </thead>
              <tbody>
              {data.map((p, i) => (
                <tr>
                  <th scope="row">{i+1}</th>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.Phone}</td>
                </tr> 
                ))}    
              </tbody>
            </table>
          </div>
        
      </div>
    </Layout>
  );
}

export default AddTeamProf;
