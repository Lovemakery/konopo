import axios from "axios";

export default axios.create({
  baseURL: "http://102.130.118.244:8080/api/",
  headers: {
    "Content-type": "application/json"
  }
});