import React from "react";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full px-10 py-6 flex items-center justify-around bg-gradient-to-b from-black z-50">
      {/* Logo */}
      <img
        className="w-40 flex mr-96"
        src="https://imgs.search.brave.com/f2CHh0TvPaB3eYplyoxrp1aiMV9dXqI-kRoXOPHjyaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L25ldGZsaXgtdHYt/bG9nby1wbmctOS5w/bmc"
        alt="Netflix Logo"
      />

      {/* Right buttons */}
      <div className="flex items-center gap-4">
        <button className="border border-white px-8 py-1 text-white rounded bg-black bg-opacity-60 hover:bg-opacity-80">
          English
        </button>

        <button className="bg-red-600 px-8 py-1 text-white rounded hover:bg-red-700">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Header;
