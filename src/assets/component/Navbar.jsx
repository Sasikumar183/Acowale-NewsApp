import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi'; // Import FiX for close icon
import Logo from '../image/logo.webp';

const Navbar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle mobile menu
  const [searchQuery, setSearchQuery] = useState(''); // State to handle search input

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery); // Trigger search on search icon click or "Enter"
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      onSearch(searchQuery); // Trigger search on "Enter" key press
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Site Name */}
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="logo" className="h-14 border rounded-full bg-white" />
          <h1 className="text-2xl font-bold">FlashWire</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li>
            <Link to="/" className="hover:text-gray-300 transition duration-300 ease-in-out">Home</Link>
          </li>
          <li>
            <Link to="/technology" className="hover:text-gray-300 transition duration-300 ease-in-out">Technology</Link>
          </li>
          <li>
            <Link to="/entertainment" className="hover:text-gray-300 transition duration-300 ease-in-out">Entertainment</Link>
          </li>
          <li>
            <Link to="/sports" className="hover:text-gray-300 transition duration-300 ease-in-out">Sports</Link>
          </li>
          <li>
            <Link to="/health" className="hover:text-gray-300 transition duration-300 ease-in-out">Health</Link>
          </li>
          <li>
            <Link to="/business" className="hover:text-gray-300 transition duration-300 ease-in-out">Business</Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={handleMenuToggle} className="focus:outline-none">
            {isMenuOpen ? (
              <FiX className="text-3xl" />
            ) : (
              <FiMenu className="text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <ul className="md:hidden absolute z-50 w-[60%] bg-gray-800 text-white text-center p-4 space-y-2 mt-1 ml-[30%] rounded divide-y divide-gray-600">
          <li>
            <Link to="/" className="block hover:text-gray-300 py-2 transition duration-300 ease-in-out">Home</Link>
          </li>
          <li>
            <Link to="/technology" className="block hover:text-gray-300 py-2 transition duration-300 ease-in-out">Technology</Link>
          </li>
          <li>
            <Link to="/entertainment" className="block hover:text-gray-300 py-2 transition duration-300 ease-in-out">Entertainment</Link>
          </li>
          <li>
            <Link to="/sports" className="block hover:text-gray-300 py-2 transition duration-300 ease-in-out">Sports</Link>
          </li>
          <li>
            <Link to="/health" className="block hover:text-gray-300 py-2 transition duration-300 ease-in-out">Health</Link>
          </li>
          <li>
            <Link to="/business" className="block hover:text-gray-300 py-2 transition duration-300 ease-in-out">Business</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
