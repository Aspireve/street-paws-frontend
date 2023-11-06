import React, { useState } from 'react'
import Login from '../components/Authentication/login'
import { useAuth } from '../contexts/AuthContext'
import Signup from '../components/Authentication/signup'
import Authentication from "../pages/Authentication/Authentication";

export default function ProtectedRoutes({protect}) {
    const {currentUser} = useAuth()
    const [isLogIn, setIsLogIn] = useState(true)
    const [isSignup, setIsSignup] = useState(false)
    function signup(){
      setIsSignup(!isSignup)
    }
    function login(){
      setIsLogIn(!isLogIn)
    }

  return (
    <>
    {currentUser ? protect :  (<>
      {isSignup && <Authentication type="signup" display={signup} switchm={login}/>}
      {isLogIn &&  <Authentication type="login" display={login} switchm={signup} />}
    </>)}
    </>
  )
}
