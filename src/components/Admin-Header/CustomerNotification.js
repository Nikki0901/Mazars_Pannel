// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { baseUrl } from "../../config/config";

// function CustomerNotification() {
//   const userId = window.localStorage.getItem("userid");
//   const [notification, setNotification] = useState([]);
//   const [countNotification, setCountNotification] = useState("");

//   useEffect(() => {
//     getNotification();
//   }, []);

//   const getNotification = () => {
//     axios
//       .get(`${baseUrl}/customers/getNotification?id=${JSON.parse(userId)}`)
//       .then((res) => {
//         console.log(res);
//         if (res.data.code === 1) {
//           setNotification(res.data.result);
//           setCountNotification(res.data.result.length);
//         }
//       });
//   };
//   return (
//     <>
//       <div class="dropdown-menu dropdown-menu-right">
//         <div class="arrow_box_right">
//           {notification.map((p, i) => (
//             <div class="dropdown-item">
//               <p class="dropdown-item" style={{ cursor: "pointer" }}>
//                 {p.message}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default CustomerNotification;
// {
//   /* <i class="ft-book"></i> */
// }

