import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black w-full sticky top-0 left-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className=" flex items-center gap-2">
          <img src="/logo-mines.webp" alt="logo" className="h-10"/>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className={`font-medium transition-colors duration-300 ${
              location.pathname === "/" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            to="/rules"
            className={`font-medium transition-colors duration-300 ${
              location.pathname === "/rules" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Rules
          </Link>

          {/* Optional: Score / Bomb Count Icon */}
          <div className="relative text-white flex items-center gap-1">
            <span className="text-red-500 text-xl">💣</span>
            <span className="font-semibold">{0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
