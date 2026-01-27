import React, { useRef, useState } from "react";
import { BACKGROUND_IMAGE } from "../utils/constants.jsx";
import Header from "./Header.jsx";
import { checkValidData } from "../utils/validate.jsx";

import { auth } from "../utils/firebase.jsx";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.jsx";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleButtonClick = () => {
    const message = checkValidData(
      isSignInForm ? null : fullName.current.value,
      email.current.value,
      password.current.value,
    );
    setErrorMessage(message);

    if (message) return;

    // Sign in/Sign Up Logic
    if (!isSignInForm) {
      // Sign Up Logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName }),
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });

          navigate("/browse");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      <Header />

      {/* Background */}
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src={BACKGROUND_IMAGE}
        alt="background"
      />

      {/* Form wrapper */}
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md bg-black text-white bg-opacity-80 p-8 sm:p-10 rounded-md"
        >
          <h1 className="text-3xl font-bold mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={fullName}
              type="text"
              placeholder="Full name"
              className="w-full p-3 mb-4 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none"
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email address"
            className="w-full p-3 mb-4 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-2 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <button
            className="w-full py-3 mt-4 bg-red-600 hover:bg-red-700 rounded font-semibold transition"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="text-gray-400 text-sm mt-6 cursor-pointer hover:underline"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to Netflix? Sign up now."
              : "Already have an account? Sign in."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
