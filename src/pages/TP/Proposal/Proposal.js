import React from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import ProposalComponent from './ProposalComponent'


// const Schema = yup.object().shape({
//   p_assingment: yup.string().required("required assingment"),
//   p_name: yup.string().required("required name"),
//   p_document: yup.string().required("required file"),
// });




function Proposal() {
  
  const userid = window.localStorage.getItem("tpkey");

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
      <div class="row mt-3">
        <ProposalComponent />
      </div>
    </Layout>
  );
}

export default Proposal;




// const assingMENT = [
//   { 
//     "assing":"8960598-76764",
//     "id":"1"
//   },
//   { 
//     "assing":"8960458-76763",
//     "id":"2"
//   },
//   { 
//     "assing":"8960598-76767",
//     "id":"3"
//   },
  
// ];