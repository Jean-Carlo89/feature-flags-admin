import axios, { Axios, AxiosError } from "axios";

export const EXPRESS_API_URI = "http://app-server:8001";

export const NEST_API_URI = "http://app-server:8002";

const expressApiCall = axios.create({
  baseURL: EXPRESS_API_URI,
});

const NestApiCall = axios.create({
  baseURL: NEST_API_URI,
});

export default expressApiCall;
