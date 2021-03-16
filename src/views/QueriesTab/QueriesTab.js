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
  const [queriesData, setQueriesData] = useState([]);
  const userId = window.localStorage.getItem("userid");

  useEffect(() => {
    const getQueriesData = () => {
      axios
        .get(
          `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
            userId
          )}`
        )
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
  function ChangeFormateDate(oldDate) {
    console.log("date",oldDate)
    if(oldDate == null){
      return null
    }
    return oldDate.toString().split("-").reverse().join("-");
  }

 


  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="9">
              <CardTitle tag="h4">Queries</CardTitle>
            </Col>
            <Col md="3">
              <div style={{display:"flex", justifyContent:"space-around"}}>
              <Link to="/customer/select-category" class="btn btn-primary">
              Fresh Query
              </Link>
              </div>
              
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Query No</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Status</th>
                <th>Expected Delivery Date</th>
                <th>View</th>
              </tr>
            </thead>
            {/* style="height: 10px !important; overflow: scroll; " */}
            <tbody style={{height:"400px" , overflowY:"scroll"}}>
              {queriesData.length > 0 ? (
                queriesData.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <td>{p.assign_no}</td>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td>{p.status}</td>
                    <td>{ChangeFormateDate(p.exp_delivery_date)}</td>
                    <td>
                      <Link to={`/customer/my-assingment/${p.id}`}>
                        <i class="fa fa-eye"></i>
                      </Link>
                    </td>
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


  // function ChangeFormateDate2(date) {
  //   var month = (1 + date.getMonth()).toString();
  //   month = month.length > 1 ? month : '0' + month;
  
  //   var day = date.getDate().toString();
  //   day = day.length > 1 ? day : '0' + day;
    
  //   return month + '/' + day + '/' + year;
  // }

