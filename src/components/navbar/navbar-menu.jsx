import React, { useState } from "react";
import Login from "../Authentication/login";
import Signup from "../Authentication/signup";
import Signout from "../Authentication/signout";
import { useAuth } from "../../contexts/AuthContext";
import Authentication from "../../pages/Authentication/Authentication";
import { Link } from "react-router-dom";

function Menu() {
  const [isLogin, setIsLogIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isSignOut, setIsSignOut] = useState(false);
  const { currentUser } = useAuth();
  function login() {
    setIsLogIn(!isLogin);
  }
  function signup() {
    setIsSignup(!isSignup);
  }
  function signout() {
    setIsSignOut(!isSignOut);
  }
  return (
    <div
      className={
        "absolute top-0 left-0  min-w-[60%] h-screen border-r border-r-gray-900 bg-[#61b3ff] md:hidden ease-in-out duration-500 z-10"
      }
    >
      <h1 className="w-full text-3xl font-bold m-4">Street Paws</h1>
      <ul className="pt-4 uppercase">
        <Link to="/">
          <li className="p-4 mx-4 border-b border-gray-600">Home</li>
        </Link>
        <Link to="/report">
          <li className="p-4 mx-4 border-b border-gray-600">Report</li>
        </Link>
        <Link to="/community">
          <li className="p-4 mx-4 border-b border-gray-600">Community</li>
        </Link>
        {!currentUser ? (
          <>
            <li className="p-4 mx-4 border-b border-gray-600" onClick={signup}>
              Sign Up
            </li>
            <li className="p-4 mx-4 border-b border-gray-600" onClick={login}>
              Log In
            </li>
          </>
        ) : (
          <>
            <li className="p-4 mx-4 border-b border-gray-600" onClick={signout}>
              Sign out
            </li>
          </>
        )}
      </ul>
      {isSignup && (
        <Authentication type="signup" display={signup} switchm={login} />
      )}
      {isLogin && (
        <Authentication type="login" display={login} switchm={signup} />
      )}
      {isSignOut && <Signout display={signout} />}
    </div>
  );
}

export default Menu;
