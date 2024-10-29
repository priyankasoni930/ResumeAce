import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { FiFileText, FiBook, FiList } from "react-icons/fi";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 bg-black left-0 right-0 z-50 w-full text-gray-800 h-16 shadow-lg">
      <div className="h-full flex  items-center justify-between w-[60%] mx-auto">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          Resume Builder
        </Link>
        <div className="flex items-center space-x-6">
          <div className="relative" ref={dropdownRef}>
            <button
              className="hover:text-purple-600 transition-colors text-indigo-300 focus:outline-none"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Cover Letter
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-white rounded-lg shadow-xl py-4 px-6">
                <div className="grid grid-cols-3 gap-6">
                  <Link
                    to="/cover-letter/builder"
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-purple-200 transition-colors">
                      <FiFileText className="text-2xl text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                      Cover Letter Builder
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Create your cover letter with our easy-to-use builder
                    </p>
                  </Link>
                  <Link
                    to="/cover-letter/guides"
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-purple-200 transition-colors">
                      <FiBook className="text-2xl text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                      Cover Letter Writing Guides
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Learn how to write an effective cover letter
                    </p>
                  </Link>
                  <Link
                    to="/cover-letter/examples"
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-purple-200 transition-colors">
                      <FiList className="text-2xl text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                      Cover Letter Examples
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Browse cover letter examples for various industries
                    </p>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
