import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link, useHistory } from "react-router-dom";
// import CustomerNotification from "./CustomerNotification";

function NavWrapper(props) {
  const { color, logout, name, cust, tl, tpdashboard } = props;

  const history = useHistory();
  const userId = window.localStorage.getItem("userid");
  const tlkey = window.localStorage.getItem("tlkey");

  const [notification, setNotification] = useState([]);
  const [countNotification, setCountNotification] = useState("");

  const [notificationTl, setNotificationTl] = useState([]);
  const [countNotificationTl, setCountNotificationTl] = useState("");

  useEffect(() => {
    getNotificationCust();
    getNotificationTl();
  }, []);

  const getNotificationCust = () => {
    axios
      .get(`${baseUrl}/customers/getNotification?id=${JSON.parse(userId)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setNotification(res.data.result);
          setCountNotification(res.data.result.length);
        }
      });
  };

  const getNotificationTl = () => {
    axios
      .get(`${baseUrl}/customers/getNotification?id=${JSON.parse(tlkey)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setNotificationTl(res.data.result);
          setCountNotificationTl(res.data.result.length);
        }
      });
  };

  // readnotification
  const readNotification = (id) => {
    axios
      .get(`${baseUrl}/customers/markReadNotification?id=${id}`)
      .then(function (response) {
        console.log("delete-", response);
        if (response.data.code === 1) {
          console.log(response.data.result);
          // history.push("/customer/proposal");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

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
                <h4 class="brand-text text-white">{name}</h4>
              </li>
            </ul>

            <ul class="nav navbar-nav float-right">
              {cust && (
                <li class="dropdown dropdown-notification nav-item">
                  {countNotification ? (
                    <div>
                      <a
                        class="nav-link nav-link-label"
                        href="#"
                        data-toggle="dropdown"
                      >
                        <span class="badge badge-light">
                          <i class="fa fa-bell" style={{ fontSize: "16px" }}>
                            {countNotification}
                          </i>
                        </span>
                      </a>

                      <div
                        class="dropdown-menu dropdown-menu-right"
                        style={{ height: "300px", overflowY: "scroll" }}
                      >
                        <div class="arrow_box_right">
                          {notification.map((p, i) => (
                            <div
                              class="dropdown-item"
                              style={{ padding: "0", fontSize: "12px" }}
                            >
                              <p
                                class="dropdown-item"
                                style={{ cursor: "pointer" }}
                                onClick={() => readNotification(p.id)}
                              >
                                {p.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </li>
              )}

              {tl && (
                <li class="dropdown dropdown-notification nav-item">
                  {countNotificationTl ? (
                    <div>
                      <a
                        class="nav-link nav-link-label"
                        href="#"
                        data-toggle="dropdown"
                      >
                        <span class="badge badge-light">
                          <i class="fa fa-bell" style={{ fontSize: "16px" }}>
                            {countNotificationTl}
                          </i>
                        </span>
                      </a>

                      <div
                        class="dropdown-menu dropdown-menu-right"
                        style={{ height: "300px", overflowY: "scroll" }}
                      >
                        <div class="arrow_box_right">
                          {notificationTl.map((p, i) => (
                            <div
                              class="dropdown-item"
                              style={{ padding: "0", fontSize: "12px" }}
                            >
                              <p
                                class="dropdown-item"
                                style={{ cursor: "pointer" }}
                                onClick={() => readNotification(p.id)}
                              >
                                {p.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </li>
              )}

              <li class="dropdown dropdown-user nav-item">
                <a
                  class="dropdown-toggle nav-link dropdown-user-link"
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* <span class="pr-2">{name}</span> */}
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
                    {name == "Customer" && (
                      <p class="dropdown-item" style={{ cursor: "pointer" }}>
                        <i class="fa fa-sign-out"></i>
                        <Link to="/customer/change-password">
                          Change Password
                        </Link>
                      </p>
                    )}

                    {name == "Tax Professional" && (
                      <p class="dropdown-item" style={{ cursor: "pointer" }}>
                        <i class="fa fa-sign-out"></i>
                        <Link to="/taxprofessional/change-password">
                          Change Password
                        </Link>
                      </p>
                    )}

                    <p
                      class="dropdown-item"
                      onClick={logout}
                      style={{ cursor: "pointer" }}
                    >
                      <i class="fa fa-sign-out"></i>
                      Logout
                    </p>
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
