import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link, useHistory } from "react-router-dom";
import CustomerNotification from "./CustomerNotification";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import './index.css'
import CommonServices from "../../common/common";

function NavWrapper(props) {
  const { color, logout, name, email } = props;

  const history = useHistory();
  const userId = window.localStorage.getItem("userid");
  const adminkey = window.localStorage.getItem("adminkey");
  const tlkey = window.localStorage.getItem("tlkey");

  // const CustEmail = window.localStorage.getItem("email");


  return (
    <>
      <div class="navbar-wrapper">
        <div class="navbar-container" style={{ background: color }}>
          <div class="collapse navbar-collapse show" id="navbar-mobile">
            <ul class="nav navbar-nav mr-auto float-left">
              <li class="nav-item d-block d-md-none">
                <a
                  class="nav-link nav-menu-main menu-toggle hidden-xs is-active"
                  href="#"
                >
                  <i class="fa fa-bars"></i>
                </a>
              </li>

              <li class="nav-item dropdown navbar-search">
                <ul class="dropdown-menu">
                  <li class="arrow_box">
                    <form>
                      <div class="input-group search-box">
                        <div class="position-relative has-icon-right full-width">
                          <input
                            class="form-control"
                            id="search"
                            type="text"
                            placeholder="Search here..."
                          />
                          <div class="form-control-position navbar-search-close">
                            <i class="fa fa-times"> </i>
                          </div>
                        </div>
                      </div>
                    </form>
                  </li>
                </ul>
              </li>

              <li>
                <h4 class="brand-text text-white">{CommonServices.capitalizeFirstLetter(name)}: {JSON.parse(email)} </h4>
              </li>
            </ul>

            <ul class="nav navbar-nav float-right">

              {name == "customer" && (
                <CustomerNotification tokenKey={userId} name={name} />
              )}

              {name == "admin" && (
                <CustomerNotification tokenKey={adminkey} name={name} />
              )}

              {name == "teamleader" && (
                <CustomerNotification tokenKey={tlkey} name={name} />
              )}


              <li class="dropdown dropdown-user nav-item">
                <a
                  class="dropdown-toggle nav-link dropdown-user-link"
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="avatar avatar-online">
                    <img
                      src="https://cdn1.vectorstock.com/i/1000x1000/40/30/user-glyph-icon-web-and-mobile-admin-sign-vector-18444030.jpg"
                      alt="avatar"
                    />
                    <i style={{ paddingLeft: "6px" }}></i>
                  </span>
                </a>

                <div class="dropdown-menu dropdown-menu-right">
                  <div class="arrow_box_right">

                    {name == "customer" && (
                      <Link to="/customer/change-password">
                        <div class="dropdown-item"
                          style={{ cursor: "pointer" }}>
                          <VpnKeyIcon />
                          <span style={{ marginLeft: "3px" }}>Change Password</span>
                        </div>
                      </Link>
                    )}

                    <div
                      class="dropdown-item"
                      onClick={logout}
                      style={{ cursor: "pointer" }}
                    >
                      <LockOpenIcon />
                      <span style={{ marginLeft: "10px" }}>Logout</span>
                    </div>

                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavWrapper;

{/* <i class="fa fa-sign-out"></i> */ }
{/* <i class="fa fa-sign-out"></i> */ }
       // <li class="dropdown dropdown-notification nav-item">
                //   {countNotification ? (
                //     <div>
                //       <a
                //         class="nav-link nav-link-label"
                //         href="#"
                //         data-toggle="dropdown"
                //       >                   
                //         <a href="#" class="notification">
                //           <span>Inbox</span>
                //           <span class="badge">{countNotification}</span>
                //         </a>
                //       </a>

                //       <div
                //         class="dropdown-menu dropdown-menu-right"
                //         style={{ height: "300px", overflowY: "scroll" }}
                //       >
                //         <div class="arrow_box_right">
                //           {notification.map((p, i) => (
                //             <div
                //               class="dropdown-item"
                //               style={{ padding: "0", fontSize: "12px" }}
                //             >
                //               <Link to={`/customer/view-notification/${p.id}`}>
                //                 <p
                //                   class="dropdown-item"
                //                   style={{ cursor: "pointer" }}
                //                   onClick={() => readNotification(p.id)}
                //                 >
                //                   {p.message}
                //                 </p>
                //               </Link>
                //             </div>
                //           ))}
                //         </div>
                //       </div>
                //     </div>
                //   ) : null}
                // </li>


  // const [notification, setNotification] = useState([]);
  // const [countNotification, setCountNotification] = useState("");

  // const [notificationAdmin, setNotificationAdmin] = useState([]);
  // const [countNotificationAdmin, setCountNotificationAdmin] = useState("");

  // const [notificationTl, setNotificationTl] = useState([]);
  // const [countNotificationTl, setCountNotificationTl] = useState("");



  // useEffect(() => {
  //   getNotificationCust();
  // }, [userId]);


  // const getNotificationCust = () => {
  //   axios
  //     .get(`${baseUrl}/customers/getNotification?id=${JSON.parse(userId)}&type_list=uread`)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.code === 1) {
  //         setNotification(res.data.result);
  //         setCountNotification(res.data.result.length);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   getNotificationTl();
  // }, [tlkey]);

  // const getNotificationTl = () => {
  //   axios
  //     .get(`${baseUrl}/customers/getNotification?id=${JSON.parse(tlkey)}&type_list=uread`)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.code === 1) {
  //         setNotificationAdmin(res.data.result);
  //         setCountNotificationTl(res.data.result.length);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   getNotificationAdmin();
  // }, [adminkey]);

  // const getNotificationAdmin = () => {
  //   axios
  //     .get(`${baseUrl}/customers/getNotification?id=${JSON.parse(adminkey)}&type_list=uread`)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.code === 1) {
  //         setNotificationTl(res.data.result);
  //         setCountNotificationAdmin(res.data.result.length);
  //       }
  //     });
  // };



  // // readnotification
  // const readNotification = (id) => {
  //   axios
  //     .get(`${baseUrl}/customers/markReadNotification?id=${id}`)
  //     .then(function (response) {
  //       console.log("delete-", response);
  //       if (response.data.code === 1) {
  //         console.log(response.data.result);
  //         // history.push("/customer/proposal");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("erroror - ", error);
  //     });
  // };

