import React, { useRef, useState, useEffect } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Puppy from "../../assets/poor-puppy.jpg";
import { useAuth } from "../../contexts/AuthContext";
import {
  getFirestore,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { v4 } from "uuid";
import ClosestVet from "../../components/footer/closestvets";

function FinalReport(props) {
  const { currentUser } = useAuth();
  const db = getFirestore();
  const [visible, setVisible] = useState(false);
  const [userName, setUsername] = useState();

  function sendEmail() {
    // props.display();
  }

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.displayName);
    } else {
      setUsername(null);
    }
  }, [currentUser]);

  //for vets
  const vets = [
    { name: "Vet 1", phone: "1234567899", email: "vet1@gmail.com" },
  ];

  return (
    <>
      <Rodal
        visible={true}
        onClose={props.display}
        enterAnimation="slideDown"
        leaveAnimation="slideDown"
        height={650}
        width={375}
      >
        {/* image and name */}
        <div className="flex-col justify-center items-center">
          <div>
            {props.outputImg ? (
              <img
                id="output"
                src={props.outputImg}
                width="400"
                className=" w-20 border-[2px]  border-blue-500 rounded-lg p-[10px] my-2 mx-5"
              />
            ) : (
              <img
                id="output"
                src={Puppy}
                width="400"
                className=" w-[60%] border-[2px] border-blue-500 rounded-lg p-[10px] my-2 mx-5"
              />
            )}
          </div>

          <div>
            <p className="font-medium text-xl px-5 py-3">
              Reported by, {currentUser.displayName}
            </p>
          </div>
        </div>
        {/* //symptoms and description */}
        <div className="flex px-5 font-medium">
          <div>
            <p>{props.symp[0]}</p>
            <p>{props.symp[1]}</p>
            <p>{props.symp[2]}</p>
          </div>
          <div></div>
        </div>
        <h3 className="px-5 font-medium">Description: {props.notes}</h3>
        <h1 className="w-full px-5 text-2xl font-bold ">
          Your animal has {props.prediction}
        </h1>
        <button
          type="submit"
          onClick={sendEmail}
          className="px-4 h-11 mx-28 border-[2px] rounded-xl border-[#61b3ff] hover:bg-[#61b3ff] transition-all"
        >
          Send Mail
        </button>
        {vets.map((e, idx) => {
          return (
            <ClosestVet
              name={e.name}
              email={e.email}
              phone={e.phone}
              key={idx}
            />
          );
        })}
      </Rodal>
    </>
  );
}

export default FinalReport;
