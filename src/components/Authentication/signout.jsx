import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

export default function Signout(props) {
  const { signout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      setError("");
      signout();
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
        height={200}
        width={350}
      >
        <div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col space-y-4"
          >
            <h1 className="text-center font-semibold text-xl">Do you really want to leave</h1>
            <button type="button" onClick={props.display} className="px-4 h-11 mx-28 border-[2px] bg-[#61b3ff] rounded-xl border-[#61b3ff] hover:bg-[#61b3ff] transition-all">
              Cancel
            </button>
            <button type="submit" className="px-4 h-11 mx-28 border-[2px] rounded-xl border-[#61b3ff] hover:bg-[#61b3ff] transition-all">
              SignOut
            </button>
            </form>
        </div>
      </Rodal>
    </div>
  );
}
