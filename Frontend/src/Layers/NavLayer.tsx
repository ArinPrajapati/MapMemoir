import React from "react";
import Login from "../Components/Login";
import SignUP from "../Components/SignUP";
import { useSnapshot } from "valtio";
import state from "../Helpers/state";

const NavLayer = () => {
  const snap = useSnapshot(state);

  const logouthandler = () => {
    state.user.username = "";
    state.user.email = "";
    state.isLogedIn = false;
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("logedIn");
  };

  return (
    <header className="p-4 dark:bg-gray-800 dark:text-gray-100 fixed top-0 w-full z-[99999]  backdrop-blur-2xl backdrop-filter bg-opacity-75 bg-[#1C1B40] ">
      <div className="container flex justify-between h-16 mx-auto">
        <a
          rel="noopener noreferrer"
          href="#"
          aria-label="Back to homepage"
          className="flex items-center p-2 gap-3"
        >
          <img
            className="w-[4rem]"
            src="https://cdn2.iconfinder.com/data/icons/round-varieties/60/Rounded_-_High_Ultra_Colour02_-_Maps-256.png"
            alt=""
          />
          <p className="text-4xl  font-sans  font-bold">
            Map{" "}
            <span className="font-sans text-[#482973] hover:text-[#645fa9]">
              Memoir
            </span>
          </p>
        </a>
        <div className="items-stretch hidden space-x-3 md:flex">
          {snap.isLogedIn && snap.user.username}
          <div className="items-stretch hidden space-x-3 md:flex">
            {snap.isLogedIn || snap.user.username?.length! > 0 ? (
              <button className="flex justify-end p-4" onClick={logouthandler}>
                Logout
              </button>
            ) : (
              <>
                <Login />
                <SignUP />
              </>
            )}
          </div>
        </div>
        <button className="flex justify-end p-4 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default NavLayer;
