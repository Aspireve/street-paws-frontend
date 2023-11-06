import React from "react";
import VetPic from "../../assets/default-vet.jpg";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

export default function ClosestVet({ name, email, phone}) {
  function openEmail(email){
    window.location = `mailto:${email}`;
  }
  function openPhone(phone){
    window.location = `tel:${phone}`;
  }
  return (
    <>
      <div className="py-2 px-5">
        <div
          className=" bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex ">
            <div >
              <img src={VetPic} className="h-10 w-10 rounded-full  border-2	"></img>
            </div>
            <div className="pl-2">
              <p className="font-bold">{name}</p>
              <div className="flex">

              <div className="flex text-base justify-center items-center ">
                <AiOutlineMail className="inline " />
                <div className="pl-1 pr-1" onClick={() => openEmail(email)} target="_top">{email}</div>
              </div>
              <div className="flex text-base justify-center items-center">
                <AiOutlinePhone className="inline " />
                <div className="pl-1" onClick={()=>openPhone(phone)}>{phone}</div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
