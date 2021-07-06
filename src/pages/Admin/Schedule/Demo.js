import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
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
import { withStyles } from "@material-ui/core/styles";
import * as Cookies from "js-cookie";





function Demo() {
  const userId = window.localStorage.getItem("adminkey");

  const history = useHistory();

  const [data, setData] = useState([]);
  const [assignmentdata, setAssignmentData] = useState([]);
  const [owner, setOwner] = useState([]);

  const [baseMode, SetbaseMode] = useState("avc");
  const [transcode, SetTranscode] = useState("interop");
  const [attendeeMode, SetAttendeeMode] = useState("video");
  const [videoProfile, SetVideoProfile] = useState("480p_4");
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
    getUsers();
  }, []);

  const getData = () => {
    axios
      .get(`${baseUrl}/tl/videoScheduler?tl_id=1`)
      .then((res) => {
        console.log("res n -", res);
        var a = res.data.result.items;
        setData(a.map(mapAppointmentData));
      });
  };

  const mapAppointmentData = (appointment) => ({
    id: appointment.id,
    startDate: appointment.start,
    endDate: appointment.end,
    title: appointment.title,
    notes: appointment.summary,
    question_id: appointment.question_id,
    vstart: appointment.vstart,
    vend: appointment.vend,
    user: appointment.user.split(','),
  });

  const getAssignmentNo = () => {
    axios
      .get(`${baseUrl}/admin/getAllQuery`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          var data = res.data.result;
          const newArrayOfObj = data.map(({ assign_no: text, ...rest }) => ({
            text,
            ...rest,
          }));
          console.log("dt--", newArrayOfObj);
          setAssignmentData(newArrayOfObj);
        }
      });
  };

  const getUsers = () => {
    axios.get(`${baseUrl}/tl/allAttendees?uid=${JSON.parse(userId)}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        var data = res.data.result;
        const newOwners = data.map(({ name: text, ...rest }) => ({
          text,
          ...rest,
        }));
        console.log("dt--", newOwners);
        setOwner(newOwners);
      }
    });
  };

  const resources = [
    {
      fieldName: "question_id",
      title: "Query No",
      instances: assignmentdata,
    },
    {
      fieldName: "user",
      title: "Users",
      instances: owner,
      allowMultiple: true,
    },
  ];

  const styles = (theme) => ({
    button: {
      color: theme.palette.background.default,
      padding: 0,
    },
    text: {
      paddingTop: theme.spacing(1),
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  });

  const AppointmentBase = ({
    children,
    data,
    onClick,
    classes,
    onAppointmentMetaChange,
    ...restProps
  }) => (
    <Appointments.Appointment {...restProps}>
      <div style={{ display: "flex" }}>
        {
          // console.log("children",children)
          console.log("data", data)

        }
        <div>{children}</div>
        <div
          onClick={() => handleJoin(data.id)}
        ><i
          class="fa fa-video-camera"
          style={{ fontSize: "12px", color: "#fff" }}
        ></i>
        </div>
      </div>
    </Appointments.Appointment>
  );


  const Appointment = withStyles(styles, { name: "Appointment" })(
    AppointmentBase
  );

  const myAppointment = (props) => {
    return (
      <Appointment
        {...props}
      />
    );
  };

  //handleJoin
  const handleJoin = (id) => {
    console.log("id", id);

    Cookies.set("channel_3", id);
    Cookies.set("baseMode_3", baseMode);
    Cookies.set("transcode_3", transcode);
    Cookies.set("attendeeMode_3", attendeeMode);
    Cookies.set("videoProfile_3", videoProfile);
    history.push("/admin/meeting");
  };

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
      formData.append("user", added.user);
      formData.append("set_by", "admin");

      axios({
        method: "POST",
        url: `${baseUrl}/tl/PostCallSchedule`,
        data: formData,
      })
        .then(function (response) {
          console.log("res post-", response);
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
        url: `${baseUrl}/tl/aminPostCallSchedule`,
        data: formData,
      })
        .then(function (response) {
          console.log("res post-", response);
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
        getData();
      });
    }
  };

  return (
    <Paper>
      <Scheduler data={data} height={660}>
        <ViewState
          defaultCurrentDate={currentDate}
          defaultCurrentViewName="Day"
        />
        <EditingState onCommitChanges={commitChanges} />
        <EditRecurrenceMenu />

        <DayView startDayHour={10} endDayHour={24} />
        <WeekView startDayHour={10} endDayHour={19} />
        <Appointments appointmentComponent={myAppointment} />

        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />

        <AppointmentTooltip showOpenButton />
        <AppointmentForm />

        <Resources
          data={resources}
        />
      </Scheduler>
    </Paper>
  );
}

export default Demo;



// function Demo() {
//   const userId = window.localStorage.getItem("adminkey");

//   const history = useHistory();
//   const [data, setData] = useState([]);
//   const [assignmentdata, setAssignmentData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [owner, setOwner] = useState([]);



//   var date = new Date();

//   function convert(str) {
//     var date = new Date(str),
//       mnth = ("0" + (date.getMonth() + 1)).slice(-2),
//       day = ("0" + date.getDate()).slice(-2);
//     return [date.getFullYear(), mnth, day].join("-");
//   }
//   const [currentDate, setCurrentDate] = useState(convert(date));

//   useEffect(() => {
//     getData();
//     getAssignmentNo();
//     getUsers();
//   }, []);

//   const getData = () => {
//     axios
//       .get(
//         `${baseUrl}/tl/videoScheduler?tl_id=1`
//       )
//       .then((res) => {
//         console.log("res -", res);
//         console.log("result -", res.data.result.items);
//         var a = res.data.result.items;
//         if (a) {
//           setData(a.map(mapAppointmentData));
//           setLoading(false);
//         }
//       });
//   };

//   const mapAppointmentData = (appointment) => ({
//     id: appointment.id,
//     startDate: appointment.start,
//     endDate: appointment.end,
//     title: appointment.title,
//     notes: appointment.summary,
//     question_id: appointment.question_id,
//     user: appointment.user.split(','),
//   });


//   const getAssignmentNo = () => {
//     axios
//       .get(`${baseUrl}/admin/getAllQuery`)
//       .then((res) => {
//         console.log(res);
//         if (res.data.code === 1) {
//           var data = res.data.result;
//           const newArrayOfObj = data.map(({ assign_no: text, ...rest }) => ({
//             text,
//             ...rest,
//           }));
//           console.log("dt-que-", newArrayOfObj);
//           setAssignmentData(newArrayOfObj);
//         }
//       });
//   };

//   const getUsers = () => {
//     axios.get(`${baseUrl}/tl/allAttendees?uid=${JSON.parse(userId)}`).then((res) => {
//       console.log(res);
//       if (res.data.code === 1) {
//         var data = res.data.result;
//         const newOwners = data.map(({ name: text, ...rest }) => ({
//           text,
//           ...rest,
//         }));
//         console.log("dt user--", newOwners);
//         setOwner(newOwners);
//       }
//     });
//   };


//   const resources = [
//     {
//       fieldName: "question_id",
//       title: "Query No",
//       instances: assignmentdata,
//     },
//     {
//       fieldName: "user",
//       title: "Users",
//       instances: owner,
//       allowMultiple: true,
//     },
//   ];



//   const changeFormat = (d) => {
//     console.log(d);
//     return (
//       d.getFullYear() +
//       "-" +
//       (d.getMonth() + 1) +
//       "-" +
//       d.getDate() +
//       " " +
//       d.toString().split(" ")[4]
//     );
//   };

//   const commitChanges = ({ added, changed, deleted }) => {
//     if (added) {
//       console.log("added - ", added);

//       var startDate = added.startDate;
//       var endDate = added.endDate;

//       let formData = new FormData();
//       formData.append("customer_id", JSON.parse(userId));
//       formData.append("time", changeFormat(startDate));
//       formData.append("endtime", changeFormat(endDate));
//       formData.append("title", added.title);
//       formData.append("notes", added.notes);
//       formData.append("question_id", added.question_id);
//       formData.append("user", added.user);
//       formData.append("set_by", "admin");

//       axios({
//         method: "POST",
//         url: `${baseUrl}/tl/PostCallSchedule`,
//         data: formData,
//       })
//         .then(function (response) {
//           console.log("res post-", response);
//           getData();
//         })
//         .catch((error) => {
//           console.log("erroror - ", error);
//         });
//     }

//     if (changed) {
//       console.log("changed", changed);

//       const data2 = data.map((appointment) =>
//         changed[appointment.id]
//           ? { ...appointment, ...changed[appointment.id] }
//           : appointment
//       );
//       console.log("data2 - ", data2);

//       let valuesArray = Object.entries(changed);
//       let id = valuesArray[0][0];
//       console.log("id -", id);
//       let dataIttem;

//       for (var i = 0; i < data2.length; i++) {
//         if (data2[i].id === id) {
//           dataIttem = data2[i];
//         }
//       }
//       console.log("dataIttem", dataIttem);

//       let formData = new FormData();
//       formData.append("customer_id", JSON.parse(userId));
//       formData.append("question_id", dataIttem.question_id);
//       formData.append("id", dataIttem.id);
//       formData.append("time", dataIttem.startDate);
//       formData.append("endtime", dataIttem.endDate);
//       formData.append("title", dataIttem.title);
//       formData.append("notes", dataIttem.notes);

//       axios({
//         method: "POST",
//         url: `${baseUrl}/customers/PostCallSchedule`,
//         data: formData,
//       })
//         .then(function (response) {
//           console.log("res post-", response);
//           getData();
//         })
//         .catch((error) => {
//           console.log("erroror - ", error);
//         });
//     }

//     if (deleted !== undefined) {
//       console.log("deleted f", deleted);
//       axios.get(`${baseUrl}/customers/freeslot?id=${deleted}`).then((res) => {
//         console.log("res -", res);
//         getData();
//         setLoading(false);
//       });
//     }
//   };

//   const styles = (theme) => ({
//     button: {
//       color: theme.palette.background.default,
//       padding: 0,
//     },
//     text: {
//       paddingTop: theme.spacing(1),
//       overflow: "hidden",
//       textOverflow: "ellipsis",
//       whiteSpace: "nowrap",
//     },
//   });

//   const AppointmentBase = ({
//     children,
//     data,
//     onClick,
//     classes,
//     onAppointmentMetaChange,
//     ...restProps
//   }) => (
//     <Appointments.Appointment {...restProps}>
//       <div style={{ display: "flex" }}>
//         {
//           console.log("data", data)

//         }
//         <div>{children}</div>
//         <div
//         // onClick={() => handleJoin(data.id)}
//         >
//           <i
//             class="fa fa-video-camera"
//             style={{ fontSize: "12px", color: "#fff" }}
//           ></i>
//         </div>
//       </div>
//     </Appointments.Appointment>
//   );

//   const Appointment = withStyles(styles, { name: "Appointment" })(
//     AppointmentBase
//   );

//   const myAppointment = (props) => {
//     return (
//       <Appointment
//         {...props}
//       />
//     );
//   };


//   return (
//     <Paper>
//       <Scheduler data={data} height={660}>
//         <ViewState
//           defaultCurrentDate={currentDate}
//           defaultCurrentViewName="Week"
//         />
//         <EditingState onCommitChanges={commitChanges} />
//         <EditRecurrenceMenu />

//         <DayView startDayHour={10} endDayHour={24} />
//         <WeekView startDayHour={10} endDayHour={19} />

//         <Appointments appointmentComponent={myAppointment} />

//         <Toolbar />
//         <DateNavigator />
//         <TodayButton />
//         <ViewSwitcher />

//         <AppointmentTooltip showOpenButton />
//         <AppointmentForm />

//         <Resources 
//         data={resources} 
//         // mainResourceName="question_id"
//          />
//       </Scheduler>
//     </Paper>
//   );
// }

// export default Demo;
