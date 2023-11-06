import React, { useEffect, useState } from "react";
import VetPic from "../../assets/default-vet.jpg";
import ClosestVet from "./closestvets";
// import api from "api";

export default function Main() {
  const [nearVets, setNearVets] = useState()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
    //   const sdk = api("@fsq-developer/v1.0#2ehz6bc12len5ghzp");
    //   // sdk.auth("API KEY HERE");
    //   sdk
    //     .placeSearch({ query: "vet", ll: `${latitude}%2C${longitude}`, limit: "3" })
    //     .then(({ data }) => setNearVets(data.results))
    //     .catch((err) => console.error(err));
    });
  }, []);

  const vets = [
    { name: "Vet 1", phone: "9819312345", email: "animalhelp@gmail.com" },
    { name: "Vet 2", phone: "8164532576", email: "helpsPaws@gmail.com" },
    { name: "Vet 3", phone: "9825432456", email: "janwarsevak@gmail.com" },
  ];
  return (
    <>
      <h2 className="font-bold text-xl mb-2 pt-5 px-5">Vets near you</h2>
      {vets.map((e, idx) => {
        return (
          <ClosestVet name={e.name} email={e.email} phone={e.phone} key={idx} />
        );
      })}
    </>
  );
}
