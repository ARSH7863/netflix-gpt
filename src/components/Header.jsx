import React from "react";
import { LOGO, USER_ICON } from "../utils/constants.jsx";

import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../utils/firebase.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { addUser, removeUser } from "../utils/userSlice.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between px-10 py-6">
        {/* Logo */}
        <img className="w-36 cursor-pointer" src={LOGO} alt="Netflix Logo" />

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

            <img className="h-8 w-8 rounded" src={USER_ICON} alt="User Icon" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
