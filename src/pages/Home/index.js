import React, {useEffect, useState} from "react";
import Navbar from "../../components/navbar";
import Cards from "../../components/carousel/Cards";
import ClosestVet from "../../components/footer"
import { useAuth } from "../../contexts/AuthContext";

function Main() {
  const { currentUser } = useAuth()
  const [userName, setUsername] = useState()

  useEffect(() => {
    if(currentUser) {
      setUsername(currentUser.displayName)
    } else {
      setUsername(null)
    }
  }, [currentUser])

  return (
    <>
      <Navbar />
      {userName && <h2 className="font-bold text-2xl pb-2 mb-2 px-5">Hello, Animal Helper!</h2>}
      <Cards className="w-screen" />
      <ClosestVet />
    </>
  );
}

export default Main;
