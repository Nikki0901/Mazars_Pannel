import axios from "axios";

export default axios.create({
  baseURL: "http://13.232.121.233/mazarapi/v1",
  headers: {
    "Content-type": "application/json",
  },
});
