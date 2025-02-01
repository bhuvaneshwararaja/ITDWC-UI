import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Layout = ({ children }) => {
  const { role } = useContext(UserContext);
  const navigate = useNavigate(); // To redirect after logout

  const menuItems = [
    { name: "Entry", link: "/entry" },
    ...(role === "Admin"
      ? [
          { name: "Create User", link: "/create-user" },
          { name: "View Entries", link: "/view-entry" },
        ]
      : []),
    { name: "Logout", link: "/" },
  ];

  const [isMenuOpen, setMenuOpen] = useState(false);
  const logoUrl = "http://62.72.29.180/itdwc/images/favicon.png"; // Set the logo URL

  // Logout function
  const logout = () => {
    sessionStorage.clear();  // Clears all sessionStorage items
    navigate("/");  // Redirect to the login page
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Navbar */}
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logoUrl} alt="Logo" className="w-16" />
          <h1 className="text-2xl font-bold">ITDWC Panel</h1>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Menu Items (Desktop) */}
        <div className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <Link
              to={item.link}
              key={item.name}
              className="text-white hover:text-blue-200 transition-all duration-200"
              onClick={item.name === "Logout" ? logout : undefined} // Call logout when Logout is clicked
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu (Hamburger toggle) */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500 text-white p-4 space-y-4">
          {menuItems.map((item) => (
            <Link
              to={item.link}
              key={item.name}
              className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
              onClick={item.name === "Logout" ? logout : undefined} // Call logout when Logout is clicked
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="p-8 flex-grow">{children}</div>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center p-4 mt-auto">
        <p>&copy; Powered and Developed by <a target="_blank" href="https://bluontech.com/" className="hover:text-blue-200">
          Bluon Tech
          </a></p>

      </footer>
    </div>
  );
};

export default Layout;
