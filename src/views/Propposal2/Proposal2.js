import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import BootstrapTable from "react-bootstrap-table-next";
import _ from 'lodash';

const Proposal2 = (props) => {
  const [uploadedImgs, setUplodedImgs] = useState([]);

  const handleChange = async (e) => {
    console.log(e)
    let { files } = e.target;

    let formData = new FormData();
    _.forEach(files, (file) => {
      formData.append("files", file);
    });

    axios
      .post(`${baseUrl}/tl/UploadReport`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);  
      });
      
  };

  return (
    <div className="form-group">
      <div className="d-flex">
        <div className="d-flex">
          <input
            multiple
            className="file-input"
            type="file"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Proposal2;
