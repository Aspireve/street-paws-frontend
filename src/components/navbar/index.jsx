import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Logo from "./logo";
import Profile from "./profile";
import Menu from "./navbar-menu";
import Signout from "../Authentication/signout";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Authentication from "../../pages/Authentication/Authentication";

function Main() {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

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
    <div className="flex justify-between items-center max-width-[1240px] mx-auto px-4 h-[70px] pt-5">
      <Logo />
      {nav && <Menu />}
      <ul className="md:flex hidden md:space-x-4 items-center">
        <Link to="/"><li className="p-4">Home</li></Link>
        <Link to="/report"><li className="p-4">Report</li></Link>
        <Link to="/community"><li className="p-4">Community</li></Link>
        {!currentUser ? (
          <>
            <button
              className="px-6 rounded-xl h-11 bg-[#61b3ff] border-[#61b3ff] border-[2px] hover:bg-white transition-all"
              onClick={login}
            >
              Login
            </button>
            <button
              className="px-4 h-11 border-[2px] rounded-xl border-[#61b3ff] hover:bg-[#61b3ff] transition-all"
              onClick={signup}
            >
              SignUp
            </button>
          </>
        ) : (
          <>
            <button
              className="px-6 rounded-xl h-11 bg-[#61b3ff] border-[#61b3ff] border-[2px] hover:bg-white transition-all"
              onClick={signout}
            >
              SignOut
            </button>
          </>
        )}
      </ul>
      <div className="flex md:hidden space-x-4">
        <Profile />
        {nav ? (
          <AiOutlineClose size={20} onClick={handleNav} />
        ) : (
          <AiOutlineMenu size={20} onClick={handleNav} />
        )}
      </div>

      {isSignup && <Authentication type="signup" display={signup} switchm={login}/>}
      {isLogin &&  <Authentication type="login" display={login} switchm={signup} />}
      {isSignOut && <Signout display={signout} />}
    </div>
  );
}

export default Main;
