import { proxy, useSnapshot } from "valtio";

const state = proxy({
  user: {
    username: "" || localStorage.getItem("username"),
    email: "" || localStorage.getItem("email"),
  },
  isLogin: true,
  isRegister: true,
  isLogedIn: false,
});

export default state;
