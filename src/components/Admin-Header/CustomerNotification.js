import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link, useHistory } from "react-router-dom";


function CustomerNotification({ tokenKey, name }) {

    // const userId = window.localStorage.getItem("userid");

    const [notification, setNotification] = useState([]);
    const [countNotification, setCountNotification] = useState("");

    useEffect(() => {
        getNotification();
    }, [tokenKey]);

    const getNotification = () => {
        axios
            .get(`${baseUrl}/customers/getNotification?id=${JSON.parse(tokenKey)}&type_list=uread`)
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setNotification(res.data.result);
                    setCountNotification(res.data.result.length);
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
                }
            })
            .catch((error) => {
                console.log("erroror - ", error);
            });
    };

    return (
        <>
            <div>
                <li class="dropdown dropdown-notification nav-item">
                    {countNotification ? (
                        <div>
                            <a
                                class="nav-link nav-link-label"
                                href="#"
                                data-toggle="dropdown"
                            >
                                <a href="#" class="notification">
                                    <span>Inbox</span>
                                    <span class="badge">{countNotification}</span>
                                </a>
                            </a>

                            <div
                                class="dropdown-menu dropdown-menu-right"
                                style={{ height: "300px", overflowY: "scroll", width: "600px" }}
                            >
                                <div class="arrow_box_right">
                                    {notification.map((p, i) => (
                                        <div
                                            class="dropdown-item"
                                            style={{ padding: "0", fontSize: "12px" }}
                                        >
                                            <Link to={`/${name}/view-notification/${p.id}`}>
                                                <p
                                                    class="dropdown-item"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => readNotification(p.id)}
                                                >
                                                    {p.message}
                                                </p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </li>
            </div>
        </>
    );
}


export default CustomerNotification;



// {
//   /* <i class="ft-book"></i> */
// }

