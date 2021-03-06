import { NavLink } from "react-router-dom";
import React, { useState } from "react";

function Sidebar({adminDashboard , custDashboard , TLDashboard , TPDashboard}) {

  const [toggleState, setToggleState] = useState('active');

  const toggleTab = (index) =>{
    console.log(index)
    setToggleState(index)
  }

  return (
    <>
      <div
        class="main-menu menu-fixed menu-light menu-accordion  menu-shadow "
        data-scroll-to-active="true"
        data-img="https://themeselection.com/demo/ chameleon-free-bootstrap-admin-template/theme-assets/images/backgrounds/02.jpg"
      >
        <div class="navbar-header">
          <ul class="nav navbar-nav flex-row">
            <li class="nav-item mr-auto">
              <a class="navbar-brand" href="questionnaire.html">
                <img
                  class="brand-logo"
                  alt="Chameleon admin logo"
                  src="https://themeselection.com/demo/chameleon-free-bootstrap-admin-template/theme-assets/images/logo/logo.png"
                />
                <h3 class="brand-text">Mazars</h3>
              </a>
            </li>
            <li class="nav-item d-md-none">
              <a class="nav-link close-navbar">
                <i class="fa fa-times"></i>
              </a>
            </li>
          </ul>
        </div>

        <div class="main-menu-content">     
          {
            custDashboard
            && 
            <ul
            class="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            
            <li class={toggleState === "active" ? "active ": "nav-item"}>
            <NavLink to={"/customer/dashboard"}>
              <i class="fa fa-home"></i>
              <span class="menu-title" data-i18n="">
                  Dashboard
                </span>
              </NavLink>           
            </li>

            <li class={toggleState === "query" && "active nav-item"} onClick={() => toggleTab("query")}>
              <NavLink to={"/customer/queries"}>
              <i class="fa fa-clone"></i>
              <span class="menu-title" data-i18n="">
              Queries
                </span>
              </NavLink> 
            </li>  

            <li class="nav-item">
              <NavLink to={"/customer/proposal"}>
              <i class="fa fa-envelope-o"></i>
              <span class="menu-title" data-i18n="">
              Proposal
                </span>
              </NavLink> 
            </li>  

            <li class="nav-item">
              <NavLink to={"/customer/assignment"}>
              <i class="fa fa-sticky-note-o"></i>
              <span class="menu-title" data-i18n="">
              Assignment
                </span>
              </NavLink> 
            </li>  

           
            <li class="nav-item">
              <NavLink to={"/customer/feedback"}>
              <i class="fa fa-rss-square"></i>
              <span class="menu-title" data-i18n="">
              Feedback
                </span>
              </NavLink> 
            </li>          
          </ul>
          }
        
       {
        adminDashboard 
        && 
        <ul
          class="navigation navigation-main"
          id="main-menu-navigation"
          data-menu="menu-navigation"
        >
         
         <li class="active nav-item">
            <NavLink to={"/admin/dashboard"}>
            <i class="fa fa-home"></i>
              <span class="menu-title" data-i18n="">
                  Dashboard
                </span>
              </NavLink>           
            </li>

            <li class="nav-item">
            <NavLink to={"/admin/proposal"}>
            <i class="fa fa-envelope-o"></i>
              <span class="menu-title" data-i18n="">
              Proposals
                </span>
              </NavLink>           
            </li>
            

            <li class="nav-item">
            <NavLink to={"/admin/queriestab"}>
            <i class="fa fa-clone">
            </i>
              <span class="menu-title" data-i18n="">
              Queries
                </span>
              </NavLink>           
            </li>

            <li class="nav-item">
            <NavLink to={"/admin/assignment"}>
            <i class="fa fa-sticky-note-o"></i>
              <span class="menu-title" data-i18n="">
              Assignments
                </span>
              </NavLink>           
            </li>

            <li class="nav-item">
            <NavLink to={"/admin/paymentstatus"}>
            <i class="fa fa-file-text"></i>
              <span class="menu-title" data-i18n="">
              Payment Status
                </span>
              </NavLink>           
            </li>

            <li class="nav-item">
            <NavLink to={"/admin/teamleaders"}>
            <i class="fa fa-users"></i>
              <span class="menu-title" data-i18n="">
              Team Leaders
                </span>
              </NavLink>           
            </li>

            <li class="nav-item">
            <NavLink to={"/admin/taxprofessionals"}>
            <i class="fa fa-users"></i>
              <span class="menu-title" data-i18n="">
              Tax Professionals
                </span>
              </NavLink>           
            </li>

            <li class="nav-item">
            <NavLink to={"/admin/feedback"}>
            <i class="fa fa-file-text"></i>
              <span class="menu-title" data-i18n="">
                Feedback
                </span>
              </NavLink>           
            </li>


            
        </ul>
      }
          

          {
            TLDashboard  &&
            <ul
          class="navigation navigation-main"
          id="main-menu-navigation"
          data-menu="menu-navigation"
        >
         
         <li class="active nav-item">
            <NavLink to={"/teamleader/dashboard"}>
            <i class="fa fa-home"></i>
              <span class="menu-title" data-i18n="">
                  Dashboard
                </span>
              </NavLink>           
            </li>

            <li class="nav-item">
            <NavLink to={"/teamleader/proposal"}>
            <i class="fa fa-file-text"></i>
              <span class="menu-title" data-i18n="">
              Proposal
                </span>
              </NavLink>           
            </li>


            <li class="nav-item">
            <NavLink to={"/teamleader/addteamprof"}>
            <i class="fa fa-users"></i>
              <span class="menu-title" data-i18n="">
              Add / Modify T.P
                </span>
              </NavLink>           
            </li>

        </ul>
          }

          {
            TPDashboard
            &&
             <ul
             class="navigation navigation-main"
             id="main-menu-navigation"
             data-menu="menu-navigation"
           >
            
            <li class="active nav-item">
               <NavLink to={"/taxprofessional/dashboard"}>
               <i class="fa fa-home"></i>
                 <span class="menu-title" data-i18n="">
                     Dashboard
                   </span>
                 </NavLink>           
               </li>
   
               <li class="nav-item">
               <NavLink to={"/taxprofessional/proposal"}>
               <i class="fa fa-file-text"></i>
                 <span class="menu-title" data-i18n="">
                 Proposal
                   </span>
                 </NavLink>           
               </li>
   
           </ul>
          }
        </div>
        <div class="navigation-background"></div>

      </div>
    </>
  );
}

export default Sidebar;
