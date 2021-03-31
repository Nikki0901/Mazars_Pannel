import React from "react";
import "../../assets/css/style.css";
import { Link, useHistory } from "react-router-dom";
import NavWrapper from "./NavWrapper";

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

  const nm = window.localStorage.getItem("name");
  console.log(name);
  var name = JSON.parse(nm);
  // const nm = name.split("")[1].toUpperCase();
  // var a = res[1].toUpperCase()
  // console.log(nm)

  return (
    <div>
      <nav
        class="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light"
        sty
      >
        {custUserId && (
          <NavWrapper color="#5E96AE" logout={custLogout} name={name} cust="cust"/>
        )}

        {adminUserId && (
          <NavWrapper color="#262d47" logout={adminLogout} name="Admin" />
        )}

        {TLuserId && <NavWrapper color="#BC85A3" logout={tlLogout} name="Team" />}

        {TPuserId && <NavWrapper color="#9799BA" logout={tpLogout} name="Ravi" />}
      </nav>
    </div>
  );
}

export default AdminHeader;

// {adminUserId && (
//   <ul class="nav navbar-nav float-right">
//     <li class="dropdown dropdown-user nav-item">
//       <a
//         class="dropdown-toggle nav-link dropdown-user-link"
//         href="#"
//         data-toggle="dropdown"
//         aria-expanded="false"
//       >
//         <span class="pr-2">Admin</span>
//         <span class="avatar avatar-online">
//           <img
//             src="https://cdn1.vectorstock.com/i/1000x1000/40/30/user-glyph-icon-web-and-mobile-admin-sign-vector-18444030.jpg"
//             alt="avatar"
//           />
//           <i style={{ paddingLeft: "6px" }}></i>
//         </span>
//       </a>

//       <div class="dropdown-menu dropdown-menu-right">
//         <div class="arrow_box_right">
//           <p
//             class="dropdown-item"
//             onClick={custLogout}
//             style={{ cursor: "pointer" }}
//           >
//             <i class="fa fa-sign-out"></i>
//             Logout
//           </p>
//         </div>
//       </div>
//     </li>
//   </ul>
// )}

// {TLuserId && (
//   <ul class="nav navbar-nav float-right">
//     <li class="dropdown dropdown-user nav-item">
//       <a
//         class="dropdown-toggle nav-link dropdown-user-link"
//         href="#"
//         data-toggle="dropdown"
//         aria-expanded="false"
//       >
//         <span class="pr-2">Team</span>
//         <span class="avatar avatar-online">
//           <img
//             src="https://cdn1.vectorstock.com/i/1000x1000/40/30/user-glyph-icon-web-and-mobile-admin-sign-vector-18444030.jpg"
//             alt="avatar"
//           />
//           <i style={{ paddingLeft: "6px" }}></i>
//         </span>
//       </a>

//       <div class="dropdown-menu dropdown-menu-right">
//         <div class="arrow_box_right">
//           <p
//             class="dropdown-item"
//             onClick={custLogout}
//             style={{ cursor: "pointer" }}
//           >
//             <i class="fa fa-sign-out"></i>
//             Logout
//           </p>
//         </div>
//       </div>
//     </li>
//   </ul>
// )}

// {TPuserId && (
//   <ul class="nav navbar-nav float-right">
//     <li class="dropdown dropdown-user nav-item">
//       <a
//         class="dropdown-toggle nav-link dropdown-user-link"
//         href="#"
//         data-toggle="dropdown"
//         aria-expanded="false"
//       >
//         <span class="pr-2">Ravi</span>
//         <span class="avatar avatar-online">
//           <img
//             src="https://cdn1.vectorstock.com/i/1000x1000/40/30/user-glyph-icon-web-and-mobile-admin-sign-vector-18444030.jpg"
//             alt="avatar"
//           />
//           <i style={{ paddingLeft: "6px" }}></i>
//         </span>
//       </a>

//       <div class="dropdown-menu dropdown-menu-right">
//         <div class="arrow_box_right">
//           <p
//             class="dropdown-item"
//             onClick={custLogout}
//             style={{ cursor: "pointer" }}
//           >
//             <i class="fa fa-sign-out"></i>
//             Logout
//           </p>
//         </div>
//       </div>
//     </li>
//   </ul>
// )}

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
