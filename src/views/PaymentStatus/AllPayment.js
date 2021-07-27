import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Layout from "../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";
import CommonServices from "../../common/common";
import BootstrapTable from "react-bootstrap-table-next";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import Records from "../../components/Records/Records";
import PaymentIcon from '@material-ui/icons/Payment';
import PaymentComponent from './PaymentComponent';



function Paid() {
  const { id } = useParams();
  const userId = window.localStorage.getItem("userid");

  const [records, setRecords] = useState([]);
  const [count, setCount] = useState("");
  const [payment, setPayment] = useState([]);

  const [pay, setPay] = useState({
    pay: "",
    amount: "",
    accepted_amount: "",
    paid_amount: "",

    amount_type: "",
    amount_fixed: "",
    amount_hourly: "",

    payment_terms: "",
    no_of_installment: "",
    installment_amount: "",
    due_date: "",
  });

  const [addPaymentModal, setPaymentModal] = useState(false);
  const paymentHandler = (key) => {
    setPaymentModal(!addPaymentModal);
    setPay({
      amount: key.accepted_amount,
      id: key.id,
      accepted_amount: key.accepted_amount,
      paid_amount: key.paid_amount,

      amount_type: key.amount_type,
      amount_fixed: key.amount_fixed,
      amount_hourly: key.amount_hourly,


      payment_terms: key.payment_terms,
      no_of_installment: key.no_of_installment,
      installment_amount: key.installment_amount,
      due_date: key.due_date,

    });
  };



  useEffect(() => {
    getPaymentStatus();
  }, []);

  const getPaymentStatus = () => {
    axios.get(`${baseUrl}/tl/getUploadedProposals?cid=${JSON.parse(userId)}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setPayment(res.data.result);
        setCount(res.data.result.length);
        setRecords(res.data.result.length);

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
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "query_created_date",
      text: "Date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.query_created_date);
        var oldDate = row.query_created_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      dataField: "assign_no",
      text: "Query No",
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return (
          <>
            <Link
              to={{
                pathname: `/customer/my-assingment/${row.assign_id}`,
                routes: "paymentstatus",
              }}
            >
              {row.assign_no}
            </Link>
          </>
        );
      },
    },
    {
      dataField: "parent_id",
      text: "Category",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "cat_name",
      text: "Sub Category",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Date of acceptance of Proposal",
      dataField: "cust_accept_date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.cust_accept_date);
        var oldDate = row.cust_accept_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Status",
      dataField: "status",
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "accepted_amount",
      text: "Accepted Amount ",
      sort: true,
      style: {
        fontSize: "11px",
        color: "#21a3ce",
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "#21a3ce" };
      },
    },
    {
      text: "Amount Paid",
      dataField: "paid_amount",
      sort: true,
      style: {
        fontSize: "11px",
        color: "#064606",
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "#064606" };
      },
    },

    {
      text: "Amount Outstanding",
      dataField: "",
      sort: true,
      style: {
        fontSize: "11px",
        color: "darkred",
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "darkred" };
      },
      formatter: function amountOutstading(cell, row) {
        console.log("dt", row.paid_amount);
        console.log("dt", row.accepted_amount);
        var p = row.paid_amount;
        var a = row.accepted_amount;
        return a - p;
      },
    },
    {
      text: "Date of Payment",
      dataField: "cust_paid_date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.cust_paid_date);
        var oldDate = row.cust_paid_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Action",
      dataField: "",
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px", width: "70px" };
      },
      formatter: function (cell, row) {
        return (
          <>

            {
              row.status == "Payment Decliend" ? null :
                <div
                  style={{ cursor: "pointer" }}
                  title="Pay Amount"
                  onClick={() => paymentHandler(row)}>
                  <PaymentIcon color="primary" />
                </div>
            }

          </>
        );
      },
    },
  ];




  return (
    <>
      <>
        <Card>

          <CardHeader>
            <CustomerFilter
              setData={setPayment}
              getData={getPaymentStatus}
              allPayment="allPayment"
              setRecords={setRecords}
              records={records}
              id={userId}
            />
          </CardHeader>

          <CardBody>
            <Records records={records} />
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={payment}
              columns={columns}
              classes="table-responsive"
            />

            <PaymentComponent
              paymentHandler={paymentHandler}
              addPaymentModal={addPaymentModal}
              pay={pay}
              getPaymentStatus={getPaymentStatus}
            />

          </CardBody>
        </Card>
      </>
    </>
  );
}

export default Paid;
