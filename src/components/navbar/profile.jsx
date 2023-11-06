import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../contexts/AuthContext";

function Profile() {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ? (
        currentUser.photoURL ? (
          <img src={currentUser.photoURL} className="h-20 w-20 rounded-full" />
        ) : (
          <CgProfile size={20} color="#61b3ff" />
        )
      ) : (
        <CgProfile size={20} color="#61b3ff" />
      )}
    </>
  );
}

export default Profile;
