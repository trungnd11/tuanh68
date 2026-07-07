import axios from "axios";
import { appConfig } from "@/shared/config/app";

const http = axios.create({
  baseURL: appConfig.ipoUrl,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default http;
