import React from "react";
import { Link } from "react-router-dom";

function NavWrapper(props) {
  const { color, logout, name, cust } = props;

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
            </ul>

            <ul class="nav navbar-nav float-right">
              <li class="dropdown dropdown-user nav-item">
                <a
                  class="dropdown-toggle nav-link dropdown-user-link"
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="pr-2">{name}</span>
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
                    {cust && (
                      <p class="dropdown-item" style={{ cursor: "pointer" }}>
                        <i class="fa fa-sign-out"></i>
                        <Link to="/customer/change-password">
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
