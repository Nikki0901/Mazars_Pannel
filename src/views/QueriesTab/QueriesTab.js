import React, { useState, useEffect } from "react";
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

function QueriesTab() {

  const [ queriesData, setQueriesData] = useState([]);
    const userId = window.localStorage.getItem("userid");


    useEffect(() => {    
      const getQueriesData = () => {
        axios
          .get(`${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
            userId
          )}`)
          .then((res) => {
            console.log(res);
            if (res.data.code === 1) {
              setQueriesData(res.data.result);
            }
          });
      };
     
      getQueriesData();
    }, []);

  //change date format
    function ChangeFormateDate(oldDate)
    {
       return oldDate.toString().split("-").reverse().join("-");
    }

    return (
        <Layout custDashboard="custDashboard" custUserId={userId}>
            <Card>
          <CardHeader>
            <Row>
              <Col md="7">
                <CardTitle tag="h4">Queries</CardTitle>
              </Col>
              <Col md="5">

              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table responsive="sm" bordered>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Query No</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Status</th>
                  <th>Expected Delivery Date</th>               
                </tr>
              </thead>
              <tbody>
                {queriesData.length > 0 ? (
                  queriesData.map((p, i) => (
                    <tr key={i}>
                      <td>{ChangeFormateDate(p.created)}</td>
                      <td>
                        <Link to={`/customer/my-assingment/${p.id}`}>
                          {p.assign_no}
                        </Link></td>
                      <td>{p.parent_id}</td>
                      <td>{p.cat_name}</td>                   
                      <td></td>                   
                      <td></td>                   
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">No Records</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CardBody>
          </Card>
        </Layout>
    );
}

export default QueriesTab;