import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import AdminFilter from "../../components/Search-Filter/AdminFilter";
import BootstrapTable from "react-bootstrap-table-next";
import History from "./History";
import Swal from "sweetalert2";

function PendingAllocation({ CountPendingForAllocation }) {
  const { Option, OptGroup } = Select;

  const [pendingData, setPendingData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [history, setHistory] = useState([]);

  const [modal, setModal] = useState(false);

  const toggle = (key) => {
    console.log("key", key);
    setModal(!modal);

    fetch(`${baseUrl}/customers/getQueryHistory?q_id=${key}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/vnd.github.cloak-preview",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setHistory(response.result);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPendingForAllocation();
  }, []);

  const getPendingForAllocation = () => {
    axios.get(`${baseUrl}/admin/pendingAllocation`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        // CountPendingForAllocation(res.data.result.length);
        setPendingData(res.data.result);
        // localStorage.setItem(
        //   "count_PFA",
        //   JSON.stringify(res.data.result.length)
        // );
      }
    });
  };

  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);

  const [store, setStore] = useState("");
  const [store2, setStore2] = useState(null);
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setTax(res.data.result);
      }
    });
  };

  useEffect(() => {
    const getSubCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=${store}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax2(res.data.result);
        }
      });
    };
    getSubCategory();
  }, [store]);

  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "50px" };
      },
    },
    {
      text: "Date",
      dataField: "created",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.created);
        var oldDate = row.created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Query No",
      dataField: "assign_no",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return (
          <>
            <Link
              to={{
                pathname: `/admin/queries/${row.id}`,
                index: 1,
                routes: "queriestab",
              }}
            >
              {row.assign_no}
            </Link>
          </>
        );
      },
    },
    {
      text: "Category",
      dataField: "parent_id",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Sub Category",
      dataField: "cat_name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Customer Name",
      dataField: "name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Status",
      dataField: "status",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Query Allocation",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            {row.is_assigned === "1" ? (
              <p style={{ color: "green", fontSize: "10px" }}>
                Assign to {row.tname} on
                <p>{row.allocation_time}</p>
              </p>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div title="Assign to">
                  <Link
                    to={`/admin/queryassing/${row.id}`}
                  >
                    <i class="fa fa-share"></i>
                  </Link>

                </div>
                <div>
                  <Link
                    to={`/admin/query_rejection/${row.id}`}
                  >
                    <i
                      className="fa fa-trash"
                    ></i>
                  </Link>

                </div>
              </div>



            )}
          </>
        );
      },
    },
    {
      text: "History",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <button
              type="button"
              class="btn btn-info btn-sm"
              onClick={() => toggle(row.id)}
            >
              History
            </button>
          </>
        );
      },
    },
  ];



  return (
    <>
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setPendingData}
            getData={getPendingForAllocation}
            pendingAlloation="pendingAlloation"
          />
        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={pendingData}
            columns={columns}
            rowIndex
          />
          <History history={history} toggle={toggle} modal={modal} />
        </CardBody>
      </Card>
    </>
  );
}

export default PendingAllocation;
  // axios
    //   .get(`${baseUrl}/tl/deleteTeamLeader?id=${id}`)
    //   .then(function (response) {
    //     console.log("delete-", response);
    // if (response.data.code === 1) {
    //   Swal.fire("Deleted!", "Your file has been deleted.", "success");
    //   getTeamLeader();
    // } else {
    //   Swal.fire("Oops...", "Errorr ", "error");
    // }

    //   })
    //   .catch((error) => {
    //     console.log("erroror - ", error);
    //   });


/* <td style={{ textAlign: "center" }}>
                      {p.is_assigned === "1" && (
                        <p style={{ color: "green" }}>
                          <i class="fa fa-circle"
                          style={{fontSize:"10px" ,marginRight:"4px"}}>
                            </i>
                            {p.allocation_time}
                          </p>
                      )}

                      {p.reject === "3" && (
                        <p style={{ color: "red" }}>
                          Query Rejected By {p.tname}
                        </p>
                      )}
                    </td> */

//   <Modal isOpen={addModal} toggle={addHandler} size="md">
//   <ModalHeader toggle={addHandler}>Show history</ModalHeader>
//   <ModalBody>
// <table class="table table-bordered">
//   <thead>
//     <tr>
//       <th scope="col">Titles</th>
//       <th scope="col">Data</th>
//     </tr>
//   </thead>

//   {history.length > 0
//     ? history.map((p, i) => (
//         <tbody>
//           <tr>
//             <th scope="row">Name</th>
//             <td>{p.name}</td>
//           </tr>

//           <tr>
//             <th scope="row">Date of Allocation</th>
//             <td>{ChangeFormateDate(p.date_of_allocation)}</td>
//           </tr>
//           <tr>
//             <th scope="row">Query No</th>
//             <td>{p.assign_no}</td>
//           </tr>
//           <tr>
//             <th scope="row">Status</th>
//             <td>{p.status}</td>
//           </tr>
//         </tbody>
//       ))
//     : null}
// </table>
//   </ModalBody>
// </Modal>
