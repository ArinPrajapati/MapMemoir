import React from "react";
import { useSnapshot } from "valtio";
import state from "../Helpers/state";
import axios from "axios";
import toast from "react-hot-toast";
const SignUP = () => {
  const snap = useSnapshot(state);
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (user.username === "" || user.email === "" || user.password === "") {
        toast.error("Please fill all the fields");
        return;
      }
      console.log(user);
      const res = await axios.post(
        "http://localhost:8888/map/user/signup",
        user
      );
      console.log(res);
      toast.success("Registered successfully");
      setUser({
        username: "",
        email: "",
        password: "",
      });
      state.isRegister = true;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return snap.isRegister ? (
    <button
      type="button"
      onClick={() => (state.isRegister = false)}
      disabled={!snap.isLogin}
      className="px-8 py-3 font-semibold rounded bg-[#482973] disabled:bg-slate-600 text-white font-sans text-xl dark:bg-gray-100 dark:text-gray-800"
    >
      Sign Up
    </button>
  ) : (
    <>
      <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-transparent py-6 sm:py-12">
        <div className="relative py-3 sm:w-96 mx-auto text-center">
          <span className="text-2xl font-light ">Register to your account</span>
          <div className="mt-4 bg-white shadow-md rounded-lg text-left">
            <div className="h-2 bg-purple-400 rounded-t-md"></div>
            <div className="px-8 py-6 ">
              <label className="block font-semibold"> Username </label>
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
                placeholder="Username"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
              <label className="block font-semibold"> Email </label>
              <input
                type="Email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
              <label className="block mt-3 font-semibold">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
              <div className="flex justify-between items-baseline">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 "
                >
                  Login
                </button>
                <button
                  onClick={() => (state.isRegister = true)}
                  className="text-sm hover:underline"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUP;
