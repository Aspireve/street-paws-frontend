import React, { useRef, useState } from "react";
import Navbar from "../../components/navbar";
import { animals, sickness } from "../../preset";
import Puppy from "../../assets/poor-puppy.jpg";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import {
  setDoc,
  doc,
  getFirestore,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import FinalReport from "./finalreport";

function Main() {
  let count = 0;
  const { currentUser } = useAuth();
  const r_id = v4();
  const storage = getStorage();
  const [outputImg, setOutputImg] = useState();
  const [docName, setDocName] = useState();
  const [prediction, setPrediction] = useState();
  const [getVal, setVal] = useState("");
  const [gmapURL, setGmapURL] = useState();
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [loc_url, setLocURL] = useState();
  const [showReport, setShowReport] = useState(false);
  const [lati, setLati] = useState();
  const [longi, setLongi] = useState();
  const animalRef = useRef();
  const symp1Ref = useRef();
  const symp2Ref = useRef();
  const symp3Ref = useRef();
  const notesRef = useRef();
  const db = getFirestore();
  const [showMsg, setShowMsg] = useState(false);
  const loadFile = (e) => {
    setOutputImg(URL.createObjectURL(e.target.files[count]));
    count += 1;
  };

  function display() {
    setShowReport(!showReport);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const d = new Date();

    // get prediction based on illness
    const HOST = "https://street-paws-backend.36se-comp-astev.repl.co/disease";
    const predict = `${HOST}?ani=${animalRef.current.value}&s1=${symp1Ref.current.value}&s2=${symp2Ref.current.value}&s3=${symp3Ref.current.value}`;
    await axios
      .get(predict)
      .then((data) => setPrediction(data.data))
      .catch((err) => {});

    // get location
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const lo_url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      setGmapURL(`https://www.google.com/maps/@${latitude},${longitude},20z`);
      await fetch(lo_url)
        .then((res) => res.json())
        .then((data) => setAddress(data.address));
      if (outputImg == null) {
        alert("Please also take an image of the animal");
        return;
      }
      const imgName = `reportImages/${currentUser.uid + v4()}`;
      try {
        uploadBytes(ref(storage, imgName), outputImg).then((e) => {}
        );
      } catch (error) {
        alert(error);
      }
      setShowReport(!showReport);
      alert("An email regarding the animal and its treatment has been sent to your email account")
      setDocName(`${currentUser.uid}+${v4()}`);

      updateDoc(doc(db, "reports", currentUser.uid), {
        unsolved: arrayUnion({
          accessToken: currentUser.accessToken,
          animal: animalRef.current.value,
          city: address.city,
          country: address.country,
          createTime: d.toString(),
          email: currentUser.email,
          gMapLink: gmapURL,
          latitude: latitude,
          longitude: longitude,
          notes: notesRef.current.value,
          phoneNumber: currentUser.phoneNumber,
          photoURL: currentUser.photoURL,
          predictedIllness: prediction,
          state: address.state,
          symptom1: symp1Ref.current.value,
          symptom2: symp2Ref.current.value,
          symptom3: symp3Ref.current.value,
          uid: currentUser.uid,
          solved: false,
          animalPhoto: imgName,
        }),
      })
        .then(() => {
          setShowMsg(!showMsg);
        })
        .catch((e) => {
          
        });
    });
  };
  return (
    <>
      <Navbar />

      <div className="overflow-x-hidden max-w-full">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col"
        >
          <input
            type="file"
            accept="image/*"
            name="picture"
            id="file"
            capture="user"
            onChange={loadFile}
            style={{ display: "none" }}
          ></input>

          <p className="sm:text-4xl text-xl font-bold px-5 py-2">
            Save a life with a click
          </p>

          <div className="flex items-center justify-between flex-col bg-[#73bafcb1] h-[50px] w-[90%] mx-5 rounded-md py-[0.20rem]">
            <div className="flex items-center justify-between">
              <p className="sm:text-4xl text-md font-semibold px-2 py-2">
                {outputImg ? "Re-Upload" : "Upload"} picture
              </p>
              <label
                for="file"
                className=" bg-white mx-3 px-4 py-2 h-11 border-[2px] rounded-xl border-[#61b3ff] hover:bg-[hsla(209,96%,72%,1)] transition-all"
              >
                {outputImg ? "Reupload" : "Upload"} Image
              </label>
            </div>
          </div>
          {outputImg ? (
            <img
              id="output"
              src={outputImg}
              width="400"
              className=" w-[90%] border-[2px] border-blue-500 rounded-lg p-[10px] my-2 mx-5"
            />
          ) : (
            <img
              id="output"
              src={Puppy}
              width="400"
              className=" w-[90%] border-[2px] border-blue-500 rounded-lg p-[10px] my-2 mx-5"
            />
          )}
          {showMsg && (
            <h1 className="w-full px-5 text-3xl font-bold m-4">
              Your animal has {prediction}
            </h1>
          )}
          <input
            required
            list="data"
            onChange={(e) => setVal(e.target.value)}
            placeholder="Select Animal (required)"
            ref={animalRef}
            className="px-4 w-[89%] mx-5 h-9 flex items-center justify-center bg-transparent border-[2px] border-[hsla(209,96%,72%,1)] rounded-md sm:mx-4 my-4 drop-shadow-md transition-all duration-300 focus:placeholder-opacity-25 focus:outline-none focus:border-[#7da5c9] placeholder-gray-500"
          />
          <datalist
            id="data"
            className="absolute max-h-20 overflow-x-hidden overflow-y-scroll"
          >
            {animals.map((op) => (
              <option className="px-0 mx-0">{op}</option>
            ))}
          </datalist>
          <input
            list="symptoms"
            onChange={(e) => setVal(e.target.value)}
            placeholder="Symptoms 1 (required)"
            ref={symp1Ref}
            className="px-4 w-[89%] mx-5 h-9 flex items-center justify-center bg-transparent border-[2px] border-[hsla(209,96%,72%,1)] rounded-md sm:mx-4 my-4 drop-shadow-md transition-all duration-300 focus:placeholder-opacity-25 focus:outline-none focus:border-[#7da5c9] placeholder-gray-500"
          />
          <datalist
            id="symptoms"
            className="absolute max-h-20 overflow-x-hidden overflow-y-scroll"
          >
            {sickness.map((op) => (
              <option className="px-0 mx-0">{op}</option>
            ))}
          </datalist>
          <input
            list="symptoms"
            onChange={(e) => setVal(e.target.value)}
            placeholder="Symptoms 2"
            ref={symp2Ref}
            className="px-4 w-[89%] mx-5 h-9 flex items-center justify-center bg-transparent border-[2px] border-[hsla(209,96%,72%,1)] rounded-md sm:mx-4 my-4 drop-shadow-md transition-all duration-300 focus:placeholder-opacity-25 focus:outline-none focus:border-[#7da5c9] placeholder-gray-500"
          />
          <input
            list="symptoms"
            onChange={(e) => setVal(e.target.value)}
            ref={symp3Ref}
            placeholder="Symptoms 3"
            className="px-4 w-[89%] mx-5 h-9 flex items-center justify-center bg-transparent border-[2px] border-[hsla(209,96%,72%,1)] rounded-md sm:mx-4 my-4 drop-shadow-md transition-all duration-300 focus:placeholder-opacity-25 focus:outline-none focus:border-[#7da5c9] placeholder-gray-500"
          />
          <textarea
            id="textarea"
            ref={notesRef}
            placeholder="Any additional notes"
            className="px-4 w-[89%] mx-5 h-[55px] flex items-center justify-center bg-transparent border-[2px] border-[hsla(209,96%,72%,1)] rounded-md sm:mx-4 my-4 drop-shadow-md transition-all duration-300 focus:placeholder-opacity-25 focus:outline-none focus:border-[#7da5c9] placeholder-gray-500"
          ></textarea>

          <input
            type="submit"
            value="Send Report"
            className="w-[170px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4 my-4 cursor-pointer"
          />
        </form>
        {showReport && (
          <FinalReport
            display={display}
            imgSrc={outputImg}
            symp={[
              symp1Ref.current.value,
              symp2Ref.current.value,
              symp3Ref.current.value,
            ]}
            notes={notesRef.current.value}
            prediction={prediction}
          />
        )}
      </div>
    </>
  );
}

export default Main;
