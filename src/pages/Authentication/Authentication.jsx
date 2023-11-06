import React from 'react'
import Signup from "../../components/Authentication/signup"
import Login from '../../components/Authentication/login'
import Signout from '../../components/Authentication/signout'

export default function Authentication({type, display,switchm}){
    function switchMethod(){
        switchm()
    }

    function signUp(){
        display()
    }
    function logIn(){
        display()
    }
    return (
        <>
        {
            type==="signup" ? <Signup display={signUp} switchm={switchMethod}/> : <Login display={logIn} switchm={switchMethod}/>
        }
        </>
    )
}

