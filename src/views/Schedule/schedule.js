import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
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
} from "reactstrap";
import { useForm } from "react-hook-form";

function Schedule() {
  const { handleSubmit, register } = useForm();

  const userId = window.localStorage.getItem("userid");
  const [date, setDate] = useState("2021-05-11");

  const [assignmentDisplay, setAssignmentDisplay] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    getQuery();
  }, []);

  const getQuery = () => {
    axios
      .get(
        `${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setAssignmentDisplay(res.data.result);
        }
      });
  };

  useEffect(() => {
    getTime();
  }, [date]);

  const getTime = () => {
    axios
      .get(
        `${baseUrl}/customers/ScheduleCalander?customer_id=${JSON.parse(
          userId
        )}&date=${date}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTime(res.data.result);
        }
      });
  };

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("customer_id", JSON.parse(userId));
    formData.append("question_id", value.p_id);
    formData.append("time", value.p_time);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/PostCallSchedule`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  const handleDate = (value) => {
    console.log("e  :", value);
    setDate(value);
  };

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              <CardTitle tag="h4">Schedule </CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
        </CardHeader>

        <CardBody>
          <div className="mb-3">
            <label>Select Date</label>
            <input
              type="date"
              name="p_date"
              className="form-control"
              defaultValue={date}
              ref={register}
              onChange={(event) => handleDate(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="row">S.No</th>
                  <th scope="row">Time slot</th>
                  <th scope="row">flag</th>
                  <th scope="row">Book Slot</th>
                </tr>
              </thead>

              {time.length > 0
                ? time.map((p, i) => (
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{p.time}</td>
                        <td>{p.flag}</td>
                      </tr>
                    </tbody>
                  ))
                : null}
            </table>
          </div>

          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Select Query No</label>
              <select name="p_id" class="form-control" ref={register}>
                <option value="">--Select Query--</option>
                {assignmentDisplay.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.assign_no}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <div class="form-group">
                <label>Select Time</label>
                <select name="p_time" class="form-control" ref={register}>
                  <option value="">--select --</option>
                  {time.map((p) => (
                    <option value={p.time}>{p.time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" className="btn btn-primary">
                Sumbit
              </button>
            </div>
          </form> */}
        </CardBody>
      </Card>
    </Layout>
  );
}

export default Schedule;
