import React from "react";

export default function recvMessage(props) {
  return (
    <div class="flex justify-start items-start px-5 py-2 pr-[65px]">
      <div class="bg-white border border-black text-black font-semibold px-4 py-2 rounded-lg shadow-md">
        <h3 className="text-blue-500">{props.display}</h3>
        {props.msg}
        </div>
    </div>
  );
}
