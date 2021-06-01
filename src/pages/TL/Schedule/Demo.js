import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DragDropProvider,
  WeekView,
  DayView,
  DateNavigator,
  ViewSwitcher,
  TodayButton,
  Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";
import Loader from "react-loader-spinner";

function Demo() {
  const userId = window.localStorage.getItem("tlkey");
  const [data, setData] = useState([]);
  const [assignmentdata, setAssignmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  var date = new Date();

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  const [currentDate, setCurrentDate] = useState(convert(date));

  useEffect(() => {
    getData();
    getAssignmentNo();
  }, []);

  const getData = () => {
    axios
      .get(`${baseUrl}/tl/videoScheduler?tl_id=${JSON.parse(userId)}`)
      .then((res) => {
        console.log("res -", res);
        console.log("result -", res.data.result.items);
        var a = res.data.result.items;
        setData(a.map(mapAppointmentData));
        setLoading(false);
      });
  };

  const mapAppointmentData = (appointment) => ({
    id: appointment.id,
    startDate: appointment.start,
    endDate: appointment.end,
    title: appointment.title,
    notes: appointment.summary,
    question_id: appointment.question_id,
  });

  const getAssignmentNo = () => {
    axios
      .get(`${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(userId)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          var data = res.data.result;
          const newArrayOfObj = data.map(
            ({ assign_no: text, q_id: id, id: d_id, ...rest }) => ({
              text,
              id,
              d_id,
              ...rest,
            })
          );
          console.log("dt--", newArrayOfObj);
          setAssignmentData(newArrayOfObj);
        }
      });
  };

  const resources = [
    {
      fieldName: "question_id",
      title: "Assignment No",
      instances: assignmentdata,
    },
  ];

  const changeFormat = (d) => {
    console.log(d);
    return (
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      " " +
      d.toString().split(" ")[4]
    );
  };

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      console.log("added - ", added);
      var startDate = added.startDate;
      var endDate = added.endDate;

      let formData = new FormData();
      formData.append("customer_id", JSON.parse(userId));
      formData.append("question_id", added.question_id);
      formData.append("time", changeFormat(startDate));
      formData.append("endtime", changeFormat(endDate));
      formData.append("title", added.title);
      formData.append("notes", added.notes);
      axios({
        method: "POST",
        url: `${baseUrl}/customers/PostCallSchedule`,
        data: formData,
      })
        .then(function (response) {
          console.log("res post-", response);
          setLoading(true);
          getData();

        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }
    if (changed) {
      console.log("changed", changed);

      const data2 = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
      console.log("data2 - ", data2);

      let valuesArray = Object.entries(changed);
      let id = valuesArray[0][0];
      console.log("id -", id);
      let dataIttem;

      for (var i = 0; i < data2.length; i++) {
        if (data2[i].id === id) {
          dataIttem = data2[i];
        }
      }
      console.log("dataIttem", dataIttem);

      let formData = new FormData();
      formData.append("customer_id", JSON.parse(userId));
      formData.append("question_id", dataIttem.question_id);
      formData.append("id", dataIttem.id);
      formData.append("time", dataIttem.startDate);
      formData.append("endtime", dataIttem.endDate);
      formData.append("title", dataIttem.title);
      formData.append("notes", dataIttem.notes);

      axios({
        method: "POST",
        url: `${baseUrl}/customers/PostCallSchedule`,
        data: formData,
      })
        .then(function (response) {
          console.log("res post-", response);
          setLoading(true);
          getData();
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }

    if (deleted !== undefined) {
      console.log("deleted f", deleted);
      axios.get(`${baseUrl}/customers/freeslot?id=${deleted}`).then((res) => {
        console.log("res -", res);
        setLoading(true);
        getData();
      });
    }
  };

  return (
    <Paper>
      {loading ? (
        <div style={{display: 'flex', justifyContent: 'center'}}><Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /></div>
      ) : (
        <Scheduler data={data} height={660}>
        <ViewState
          defaultCurrentDate={currentDate}
          defaultCurrentViewName="Week"
        />
        <EditingState onCommitChanges={commitChanges} />
        <EditRecurrenceMenu />

        <DayView startDayHour={10} endDayHour={24} />
        <WeekView startDayHour={10} endDayHour={19} />
        <Appointments />

        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />

        <AppointmentTooltip showOpenButton />
        <AppointmentForm />

        <Resources data={resources} mainResourceName="question_id" />
      </Scheduler>
      )}
    </Paper>
  );
}

export default Demo;


// const styles = {
//   toolbarRoot: {
//     position: "relative",
//   },
//   progress: {
//     position: "absolute",
//     width: "100%",
//     bottom: 0,
//     left: 0,
//   },
// };

// const ToolbarWithLoading = withStyles(styles, { name: "Toolbar" })(
//   ({ children, classes, ...restProps }) => (
//     <div className={classes.toolbarRoot}>
//       <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
//       <LinearProgress className={classes.progress} />
//     </div>
//   )
// );
