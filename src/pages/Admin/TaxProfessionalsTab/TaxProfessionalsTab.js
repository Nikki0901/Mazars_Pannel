import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Swal from "sweetalert2";
import BootstrapTable from "react-bootstrap-table-next";
import TaxProffesionalService from "../../../config/services/TaxProffesional";

function TaxProfessionalsTab() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [tpCount, setTpCount] = useState("");
  const userid = window.localStorage.getItem("adminkey");

  useEffect(() => {
    getTaxProf();
  }, []);

  const getTaxProf = () => {
    axios.get(`${baseUrl}/tp/getTaxProfessional`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setData(res.data.result);
        setTpCount(res.data.result.length);
      }
    });
  };

  

  const columns = [
    {
      dataField: "",
      text: "S.No",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "50px" };
      },
    },
    {
      dataField: "post_name",
      text: "Post_ID",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },

    {
      dataField: "email",
      text: "Post_Email",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "name",
      text: "Name of TP",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "email",
      text: "Personal email",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "phone",
      text: "Personal Mobile No",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      // dataField: "parent_id",
      text: "Category",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter : function nameFormatter(cell, row) {
        var digit2 = [];
        digit2 = row.allpcat_id.split(",")
       
        return(
          <>
          
         {
            digit2.map((e) => {
            return(
              <>
             {e + ","}
              </>
            ) 
          })
         }
          </>
        )
      }
    },
    {
      
     
      text: "Sub Category",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter : function nameFormatter(cell, row) {
        var digit = [];
        digit = row.allcat_id.split(",")
       
        return(
          <>
          
         {
            digit.map((e) => {
            return(
              <>
             {e + ","}
              </>
            ) 
          })
         }
          </>
        )
      }
    },
   
   
    {
      dataField: "",
      text: "Edit",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <Link to={`/admin/edittp/${row.id}`}>
              <i
                className="fa fa-edit"
                style={{
                  fontSize: 18,
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              ></i>
            </Link>
          </>
        );
      },
    },
    {
      dataField: "phone",
      text: "Delete",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <i
              className="fa fa-trash"
              style={{ fontSize: 20, cursor: "pointer", marginLeft: "8px" }}
              onClick={() => del(row.id)}
            ></i>
          </>
        );
      },
    },
  ];

  //check
  const del = (id) => {
    console.log("del", id);
    Swal.fire({
      title: "Are you sure?",
      text: "It will permanently deleted !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteCliente(id);
      }
    });
  };

  // delete data
  const deleteCliente = (id) => {
    console.log("del", id);
    axios
      .get(`${baseUrl}/tl/deleteTeamLeader?id=${id}`)
      .then(function (response) {
        console.log("delete-", response);
        if (response.data.code === 1) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          getTaxProf();
        } else {
          Swal.fire("Oops...", "Errorr ", "error");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="10">
              <CardTitle tag="h4">Tax Professionals ({tpCount})</CardTitle>
            </Col>
            <Col md="2">
              <Link to={"/admin/addnewtp"} class="btn btn-primary">
                Add New
              </Link>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={data}
            columns={columns}
            rowIndex
          />
        </CardBody>
      </Card>
    </Layout>
  );
}

export default TaxProfessionalsTab;


// import React, { useState, useEffect } from "react";
// import Layout from "../../../components/Layout/Layout";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Row,
//   Col,
//   Table,
// } from "reactstrap";
// import axios from "axios";
// import { baseUrl } from "../../../config/config";
// import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";
// import Swal from "sweetalert2";
// import BootstrapTable from "react-bootstrap-table-next";
// import TaxProffesionalService from "../../../config/services/TaxProffesional";

// function TaxProfessionalsTab() {
//   const alert = useAlert();
//   const [data, setData] = useState([]);
//   const [tpCount, setTpCount] = useState("");
//   const userid = window.localStorage.getItem("adminkey");

//   useEffect(() => {
//     getTaxProf();
//   }, []);

//   const getTaxProf = () => {
//     axios.get(`${baseUrl}/tp/getTaxProfessional`).then((res) => {
//       console.log(res);
//       if (res.data.code === 1) {
//         setData(res.data.result);
//         setTpCount(res.data.result.length);
//       }
//     });
//   };

  

//   const columns = [
//     {
//       dataField: "",
//       text: "S.No",
//       formatter: (cellContent, row, rowIndex) => {
//         return rowIndex + 1;
//       },
//       headerStyle: () => {
//         return { fontSize: "12px", width: "50px" };
//       },
//     },
//     {
//       dataField: "name",
//       text: "Name",
//       sort: true,
//       headerStyle: () => {
//         return { fontSize: "12px" };
//       },
//     },
//     {
//       dataField: "parent_id",
//       text: "Category",
//       sort: true,
//       headerStyle: () => {
//         return { fontSize: "12px" };
//       },
//     },
//     {
//       dataField: "cat_name",
//       text: "Sub Category",
//       sort: true,
//       headerStyle: () => {
//         return { fontSize: "12px" };
//       },
//     },
//     {
//       dataField: "email",
//       text: "Email",
//       sort: true,
//       headerStyle: () => {
//         return { fontSize: "12px" };
//       },
//     },
//     {
//       dataField: "phone",
//       text: "Phone",
//       sort: true,
//       headerStyle: () => {
//         return { fontSize: "12px" };
//       },
//     },
//     {
//       dataField: "",
//       text: "Edit",
//       headerStyle: () => {
//         return { fontSize: "12px" };
//       },
//       formatter: function (cell, row) {
//         return (
//           <>
//             <Link to={`/admin/edittp/${row.id}`}>
//               <i
//                 className="fa fa-edit"
//                 style={{
//                   fontSize: 18,
//                   cursor: "pointer",
//                   marginLeft: "8px",
//                 }}
//               ></i>
//             </Link>
//           </>
//         );
//       },
//     },
//     {
//       dataField: "phone",
//       text: "Delete",
//       headerStyle: () => {
//         return { fontSize: "12px" };
//       },
//       formatter: function (cell, row) {
//         return (
//           <>
//             <i
//               className="fa fa-trash"
//               style={{ fontSize: 20, cursor: "pointer", marginLeft: "8px" }}
//               onClick={() => del(row.id)}
//             ></i>
//           </>
//         );
//       },
//     },
//   ];

//   //check
//   const del = (id) => {
//     console.log("del", id);
//     Swal.fire({
//       title: "Are you sure?",
//       text: "It will permanently deleted !",
//       type: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.value) {
//         deleteCliente(id);
//       }
//     });
//   };

//   // delete data
//   const deleteCliente = (id) => {
//     console.log("del", id);
//     axios
//       .get(`${baseUrl}/tl/deleteTeamLeader?id=${id}`)
//       .then(function (response) {
//         console.log("delete-", response);
//         if (response.data.code === 1) {
//           Swal.fire("Deleted!", "Your file has been deleted.", "success");
//           getTaxProf();
//         } else {
//           Swal.fire("Oops...", "Errorr ", "error");
//         }
//       })
//       .catch((error) => {
//         console.log("erroror - ", error);
//       });
//   };


//   return (
//     <Layout adminDashboard="adminDashboard" adminUserId={userid}>
//       <Card>
//         <CardHeader>
//           <Row>
//             <Col md="10">
//               <CardTitle tag="h4">Tax Professionals ({tpCount})</CardTitle>
//             </Col>
//             <Col md="2">
//               <Link to={"/admin/addnewtp"} class="btn btn-primary">
//                 Add New
//               </Link>
//             </Col>
//           </Row>
//         </CardHeader>
//         <CardBody>
//           <BootstrapTable
//             bootstrap4
//             keyField="id"
//             data={data}
//             columns={columns}
//             rowIndex
//           />
//         </CardBody>
//       </Card>
//     </Layout>
//   );
// }

// export default TaxProfessionalsTab;

