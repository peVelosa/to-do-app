import axios from "axios";
import { parseCookies } from "nookies";

const { "nextauth.token": token } = parseCookies();

if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}
// web_url=https://to-do-app-six-rust.vercel.app/
export default axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://to-do-app-six-rust.vercel.app/api",
});
