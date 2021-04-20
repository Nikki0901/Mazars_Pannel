import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Card, CardHeader, Row, Col } from "reactstrap";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import UserForm from "./UserForm";

function Fresh() {
  const userId = window.localStorage.getItem("userid");

  const [data, setData] = useState([]);


  const { register, control, handleSubmit, reset } = useForm();

  useEffect(() => {
    getQuery();
  }, []);

  const getQuery = () => {
    axios.get(`${baseUrl}/tl/getTeamLeader?id=212`).then((res) => {
      console.log(res);
      // var value = res.data.result[0].cat_name;
      if (res.data.code === 1) {
        setData(res.data.result[0]);
      }   
    });
  };

  const onSubmit = (data) => console.log("data", data);

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
        <UserForm data={data}/>
        </CardHeader>
      </Card>
    </Layout>
  );
}

export default Fresh;


