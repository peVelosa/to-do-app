import axios from "axios";
import { parseCookies } from "nookies";

const { "nextauth.token": token } = parseCookies();

if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
