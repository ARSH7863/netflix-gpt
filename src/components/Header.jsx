import { LOGO, USER_ICON } from "../utils/constants.jsx";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice.jsx";
import { toggleGPTSearchView } from "../utils/gptSlice.jsx";
import { SUPPORTED_LANGUAGES } from "../utils/constants.jsx";
import { changeLanguage } from "../utils/configSlice.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

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

  const handleGPTSearchClick = () => {
    // Toggle GPT Search Page
    dispatch(toggleGPTSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between px-10 py-6">
        {/* Logo */}
        <img className="w-36 cursor-pointer" src={LOGO} alt="Netflix Logo" />

        {/* Right buttons */}
        {user && (
          <div className="flex items-center gap-6">
            <button
              className="border border-white px-6 py-1.5 text-sm text-white rounded  bg-purple-600 hover:bg-purple-800"
              onClick={handleGPTSearchClick}
            >
              GPT Search
            </button>
            {showGptSearch && (
              <select
                name=""
                id=""
                className="border border-white px-6 py-1.5 text-sm text-white rounded bg-black/60 hover:bg-black/80"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            {/* <button className="border border-white px-6 py-1.5 text-sm text-white rounded bg-black/60 hover:bg-black/80">
              English
            </button> */}

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
