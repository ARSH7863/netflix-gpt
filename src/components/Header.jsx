import React from "react";
import { signOut } from "firebase/auth";

import { auth } from "../utils/firebase.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between px-10 py-6">
        {/* Logo */}
        <img
          className="w-36 cursor-pointer"
          src="https://imgs.search.brave.com/f2CHh0TvPaB3eYplyoxrp1aiMV9dXqI-kRoXOPHjyaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L25ldGZsaXgtdHYt/bG9nby1wbmctOS5w/bmc"
          alt="Netflix Logo"
        />

        {/* Right buttons */}
        {user && (
          <div className="flex items-center gap-4">
            <button className="border border-white px-6 py-1.5 text-sm text-white rounded bg-black/60 hover:bg-black/80">
              English
            </button>

            <button
              className="bg-red-600 px-6 py-1.5 text-sm text-white rounded hover:bg-red-700"
              onClick={handleSignOut}
            >
              Sign Out
            </button>

            <img
              className="h-8 w-8 rounded"
              src="https://occ-0-2087-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e"
              alt="User Icon"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
