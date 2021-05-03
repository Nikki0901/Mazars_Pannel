import axios from "axios";

export default axios.create({
  baseURL: "https://mazarsapi.multitvsolution.com/mazarapi/v1",
  headers: {
    "Content-type": "application/json",
  },
});
