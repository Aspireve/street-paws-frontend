import React from "react";

export default function sentMessage(props) {
  return (
    <div class="flex justify-end  px-5 py-2 pl-[65px]">
      <div class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md">
        {props.msg}
        </div>
    </div>
  );
}
