import React, { useState } from "react";
// import firebase from "firebase"
import {
  collection,
  query,
  where,
  getFirestore,
  orderBy,
  limit,
  addDoc,
  Timestamp
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRef } from "react";
import SentMessage from "../../components/communityChat/sentMessage";
import RecvMessage from "../../components/communityChat/recievedMessage";
import Community from "../../components/communityChat"
import Navbar from "../../components/navbar";
import { useAuth } from "../../contexts/AuthContext";

export default function Main() {
  const {currentUser} = useAuth()
  const db = getFirestore();
  const messagesRef = collection(db, "communityChat");
  const q = query(messagesRef, orderBy("createdAt"), limit(40));
  const [values] = useCollectionData(q, { idField: "uid" });

  const [formValue, setFormValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const dummy = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true)
    const time = new Date()
    console.log(time.toISOString)
    console.log("first")
    await addDoc(collection(db, "communityChat"), {
      createdAt: time.toISOString(),
      displayName: currentUser.displayName,
      text: formValue,
      userId:currentUser.uid
    }).catch(e => {
      alert("Database Error")
  })
  console.log("handled");

    setDisabled(false);
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex-col">
      <div className="bg-white sticky top-0 mb-2">
      <Navbar />

      </div>
      <div className="flex-col justify-center h-screen">
        <div >
          {values && values.map(msg => (<Community message={msg.text} uid={msg.userId} display={msg.displayName}/>))}

        <span ref={dummy}></span>
        </div>


        <div className="flex sticky bottom-0">


          <form className="px-5 w-screen" onSubmit={handleSubmit}>


            <div className="bg-white flex items-center border-b border-blue-500 py-1">
              <input
                onChange={(e) => setFormValue(e.target.value)}
                className="appearance-none bg-white border-none w-full text-gray-700 mr-3 py-1 px-2 leading-[1.75px] focus:outline-none"
                type="text"
                placeholder="Type your message here..."
                aria-label="Message input"
              />
              <button
                className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit" disabled={disabled}
              >
                Send
              </button>
            </div>


          </form>


        </div>
      </div>
    </div>

    // <>
    // <Navbar />
    //   <main>
    //     {/* {messages &&
    //       messages.map((msg) => console.log("first"))} */}

    //     <span ref={dummy}></span>
    //   </main>

    //   <form onSubmit={sendMessage}>
    //     <input
    //       value={formValue}
    //       onChange={(e) => setFormValue(e.target.value)}
    //       placeholder="say something nice"
    //     />

    //     <button type="submit" disabled={!formValue}>
    //       🕊️
    //     </button>
    //   </form>
    // </>
  );
}
