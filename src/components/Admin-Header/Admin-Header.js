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
    history.push("/");
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



  const CustEmail = window.localStorage.getItem("email");
  const adminEmail = window.localStorage.getItem("adminss");
 
  
  return (
    <div>
      <nav
        class="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light"
        sty
      >
        {custUserId && (
          <NavWrapper color="#5E96AE" logout={custLogout}
            name="customer" email={CustEmail}
          />
        )}

        {adminUserId && (
          <NavWrapper color="#262d47" logout={adminLogout}
            name="admin" email={adminEmail}
          />
        )}

        {TLuserId && <NavWrapper color="#BC85A3" logout={tlLogout}
          name="teamleader" email={adminEmail}
        />}

        {TPuserId && <NavWrapper color="#9799BA" logout={tpLogout}
          name="taxprofessional" email={adminEmail}
        />}
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
