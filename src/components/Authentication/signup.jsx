import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

export default function Signup(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  function switchMethod (){
    props.display()
    props.switchm()
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setLoading(false);
      return setError("Passwords do not match");
    }
    try {
      setError("");
      signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value,
        phoneRef.current.value
      );
      props.display()
    } catch (e) {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  return (
    <div>
      <Rodal
        visible={true}
        onClose={props.display}
        enterAnimation="slideDown"
        leaveAnimation="slideDown"
        height={575}
        width={350}
      >
        <div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col space-y-4"
          >
            <h1 className="text-center font-semibold text-xl">Sign Up</h1>
            <div className="flex flex-col">
              <label htmlFor="text/plain" className="px-4 pb-2"></label>
              <input
                type="text"
                placeholder="Enter your username"
                className="border px-4 py-2 mx-4 rounded-full outline-none hover:border-[#61b3ff]"
                ref={nameRef}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="px-4 pb-2"></label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border px-4 py-2 mx-4 rounded-full outline-none hover:border-[#61b3ff]"
                ref={emailRef}
              />
            </div>
            <div className="flex flex-col">
              <label className="px-4 pb-2"></label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
                className="border px-4 py-2 mx-4 rounded-full outline-none hover:border-[#61b3ff]"
                ref={phoneRef}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="px-4 pb-2"></label>
              <input
                type="Password"
                placeholder="Password"
                className="border px-4 py-2 mx-4 rounded-full outline-none hover:border-[#61b3ff]"
                ref={passwordRef}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="px-4 pb-2"></label>
              <input
                type="Password"
                placeholder="Confirm Password"
                className="border px-4 py-2 mx-4 rounded-full outline-none hover:border-[#61b3ff]"
                ref={confirmPasswordRef}
              />
            </div>
            <button
              type="submit"
              className="px-4 h-11 mx-28 border-[2px] rounded-xl border-[#61b3ff] hover:bg-[#61b3ff] transition-all"
            >
              SignUp
            </button>
            <h1 className="text-center font-semibold text-md">
              Already have account?{" "}
              <a href="#">
                <span onClick={switchMethod} className="text-center font-semibold text-md text-blue-500">
                  Login
                </span>
              </a>
            </h1>
          </form>
          <div className="flex flex-col">
            <div className="text-center text-lg"> Or Sign In with</div>
            <div className="flex space-x-16 py-4 justify-center items-center">
              <FcGoogle size={30} />
              <FaFacebook size={30} color="#4267B2" />
              <FaApple size={30} color="#555555" />
            </div>
          </div>
        </div>
      </Rodal>
    </div>
  );
}
