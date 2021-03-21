import React from "react";
import "../../assets/css/style.css";
import { Link, useHistory } from "react-router-dom";
// import { createBrowserHistory } from "history";

function AdminHeader({ custUserId, adminUserId, TLuserId, TPuserId }) {
  let history = useHistory();
  // const userId = window.localStorage.getItem("userid");

  const custLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("name");
    localStorage.removeItem("uid");
    localStorage.removeItem("category");
    history.push("/customer/signin");
  };

  const adminLogout = () => {
    localStorage.removeItem("adminkey");
    localStorage.removeItem("count_PFA");
    history.push("/admin/login");
  };

  const tlLogout = () => {
    localStorage.removeItem("tlkey");
    history.push("/teamleader/login");
  };

  const tpLogout = () => {
    localStorage.removeItem("tpkey");
    history.push("/taxprofessional/login");
  };

  const name = window.localStorage.getItem("name");
  // const nm = name.split("")[1].toUpperCase();
  // var a = res[1].toUpperCase()
  // console.log(nm)

  return (
    <div>
      <nav class="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light" 
      sty>
        <div class="navbar-wrapper">
          <div class="navbar-container">
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
                  {/* <a
                    class="nav-link dropdown-toggle hide"
                    data-toggle="dropdown"
                    href="#"
                  >
                    <i class="fa fa-search"></i>
                  </a> */}

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
              </ul>

              {custUserId && (
                <ul class="nav navbar-nav float-right">
                  <li class="dropdown dropdown-user nav-item">
                    <a
                      class="dropdown-toggle nav-link dropdown-user-link"
                      href="#"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span class="pr-2">{JSON.parse(name)}</span>
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
                        {/* <p class="dropdown-item" style={{ cursor: "pointer" }}>
                          <i class="fa fa-sign-out"></i>
                          Change Password
                        </p> */}

                        <p
                          class="dropdown-item"
                          onClick={custLogout}
                          style={{ cursor: "pointer" }}
                        >
                          <i class="fa fa-sign-out"></i>
                          Logout
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              )}

              {adminUserId && (
                <ul class="nav navbar-nav float-right">
                  <li class="dropdown dropdown-user nav-item">
                    <a
                      class="dropdown-toggle nav-link dropdown-user-link"
                      href="#"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span class="pr-2">Admin</span>
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
                        <p
                          class="dropdown-item"
                          onClick={custLogout}
                          style={{ cursor: "pointer" }}
                        >
                          <i class="fa fa-sign-out"></i>
                          Logout
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              )}

              {TLuserId && (
                <ul class="nav navbar-nav float-right">
                  <li class="dropdown dropdown-user nav-item">
                    <a
                      class="dropdown-toggle nav-link dropdown-user-link"
                      href="#"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span class="pr-2">Team</span>
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
                        <p
                          class="dropdown-item"
                          onClick={custLogout}
                          style={{ cursor: "pointer" }}
                        >
                          <i class="fa fa-sign-out"></i>
                          Logout
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              )}

              {TPuserId && (
                <ul class="nav navbar-nav float-right">
                  <li class="dropdown dropdown-user nav-item">
                    <a
                      class="dropdown-toggle nav-link dropdown-user-link"
                      href="#"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span class="pr-2">Ravi</span>
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
                        <p
                          class="dropdown-item"
                          onClick={custLogout}
                          style={{ cursor: "pointer" }}
                        >
                          <i class="fa fa-sign-out"></i>
                          Logout
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminHeader;

{
  /*               
              <ul class="nav navbar-nav float-right">
                <li class="dropdown dropdown-user nav-item">
                  <a
                    class="dropdown-toggle nav-link dropdown-user-link"
                    href="#"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span class="pr-2">John Doe</span>
                    <span class="avatar avatar-online">
                      <img
                        src="https://cdn1.vectorstock.com/i/1000x1000/40/30/user-glyph-icon-web-and-mobile-admin-sign-vector-18444030.jpg"
                        alt="avatar"
                      />
                      {
                        custUserId &&
                      <i style={{paddingLeft:"6px"}}> {name}</i>
                    }

                       {
                        adminUserId &&
                      <i style={{paddingLeft:"6px"}}>Admin</i>
                    }

                     {
                        TLuserId &&
                      <i style={{paddingLeft:"6px"}}>Team</i>
                    }

                          {
                        TPuserId &&
                      <i style={{paddingLeft:"6px"}}>Ravi</i>
                    }
                                       
                    </span>
                  </a>

                  <div class="dropdown-menu dropdown-menu-right">
                    <div class="arrow_box_right">
                      <a class="dropdown-item" href="#">
                        <span class="avatar avatar-online">
                          <img
                            src="https://themeselection.com/demo/chameleon-free-bootstrap-admin-template/theme-assets/images/portrait/small/avatar-s-19.png"
                            alt="avatar"
                          />
                          <span class="user-name text-bold-700 ml-1">
                            ghfgh
                          </span>
                        </span>
                      </a>
                    

                            {
                              custUserId 
                              &&
                              <p class="dropdown-item" onClick={custLogout} style={{cursor:"pointer"}}>
                      <i class="fa fa-sign-out"></i>
                       Logout
                      </p>
                            }
                      
                        {
                          adminUserId
                          &&
                          <p class="dropdown-item" onClick={adminLogout} style={{cursor:"pointer"}}>
                          <i class="fa fa-sign-out"></i>
                           Logout
                          </p>
                        }


                        {
                          TLuserId
                          &&
                          <p class="dropdown-item" onClick={tlLogout} style={{cursor:"pointer"}}>
                          <i class="fa fa-sign-out"></i>
                           Logout
                          </p>
                        }

                         {
                          TPuserId
                          &&
                          <p class="dropdown-item" onClick={tpLogout} style={{cursor:"pointer"}}>
                          <i class="fa fa-sign-out"></i>
                           Logout
                          </p>
                        }

                      
                      
                    </div>
                  </div>
                </li>
              </ul> */
}

{
  /* <a class="dropdown-item" href="#">
                          <span class="avatar avatar-online">                        
                            <span class="user-name text-bold-700 ml-1">
                              Change 
                            </span>
                          
                          </span>
                        </a> */
}
