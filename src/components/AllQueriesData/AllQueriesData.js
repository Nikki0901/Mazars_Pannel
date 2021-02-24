import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

function AllQueriesData() {
  const [allQueriesData, setAllQueriesData] = useState([]);

  useEffect(() => {
    const getAllQueriesData = () => {
      axios.get(`${baseUrl}/get/all/query`).then((res) => {
        console.log(res);
        console.log(res.data.result.length);
        if (res.data.code === 1) {
          setAllQueriesData(res.data.result);
        }
      });
    };

    getAllQueriesData();
  }, []);
  return (
    <>
      <Card>
        <CardHeader>
          
        </CardHeader>
        <Table responsive="sm" bordered>
          <thead>
            <tr>
              <th scope="col">Sr. No.</th>
              <th scope="col">Date</th>
              <th scope="col">Category</th>
              <th scope="col">Sub Category</th>
              <th scope="col">Query No .</th>
            </tr>
          </thead>
          <tbody>
            {allQueriesData.length > 0 ? (
              allQueriesData.map((p, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{p.created}</td>
                  <td>{p.parent_id} </td>
                  <td>{p.cat_name}</td>
                  <th scope="row">
                    <Link to={`/admin/queries/${p.id}`}>{p.AssignNo}</Link>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Records</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </>
  );
}

export default AllQueriesData;

// {allQueriesData.map((p, i) => (
//   <div>
//     <table class="table table-bordered" key={i}>
//       <thead>
//         <tr>
//           <th scope="col">Sr. No.</th>
//           <th scope="col">Date</th>
//           <th scope="col">Category</th>
//           <th scope="col">Sub Category</th>
//           <th scope="col">Query No .</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>{i + 1}</td>
//           <td>{p.created}</td>
//           <td>{p.parent_id} </td>
//           <td>{p.cat_name}</td>
//           <th scope="row">
//             <Link to={`/admin/queries/${p.id}`}>{p.AssignNo}</Link>
//           </th>
//         </tr>
//         <tr>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// ))}
