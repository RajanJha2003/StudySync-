import React, { useEffect, useState, useRef } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import studyNotionLogo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../../data/navbar-links";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  
  // Static categories with improved organization
  const staticCategories = [
    { name: "Web Development", icon: "💻" },
    { name: "Data Science", icon: "📊" },
    { name: "Design", icon: "🎨" },
    { name: "Business", icon: "📈" },
    { name: "Marketing", icon: "📱" },
  ];

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // Handle scroll behavior with debounce for performance
  useEffect(() => {
    let scrollTimer;
    
    const controlNavbar = () => {
      clearTimeout(scrollTimer);
      
      scrollTimer = setTimeout(() => {
        if (window.scrollY > 100) {
          if (window.scrollY > lastScrollY) {
            setShowNavbar("hide");
          } else {
            setShowNavbar("show");
          }
        } else {
          setShowNavbar("top");
        }
        setLastScrollY(window.scrollY);
      }, 10);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
      clearTimeout(scrollTimer);
    };
  }, [lastScrollY]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-center border-b border-richblack-700 bg-richblack-900 text-white backdrop-blur-sm bg-opacity-90 ${
        showNavbar === "hide" ? "-translate-y-full" : "translate-y-0"
      } transition-all duration-300 ease-in-out shadow-lg shadow-richblack-900/10`}
      aria-label="Main navigation"
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo with hover effect */}
        <Link 
          to="/" 
          className="transition-transform duration-200 hover:scale-105 focus:scale-105 focus:outline-none"
          aria-label="StudyNotion Home"
        >
          <img 
            src={studyNotionLogo} 
            alt="StudyNotion Logo" 
            width={160} 
            height={42} 
            className="h-9" 
          />
        </Link>

        {/* Mobile Menu Button with animation */}
        <button 
          className="block md:hidden text-white p-2 rounded-full hover:bg-richblack-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-6">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="group relative flex cursor-pointer items-center gap-1">
                    <p className={`${
                      matchRoute("/catalog/:catalogName")
                        ? "bg-yellow-25 text-richblack-900 font-medium"
                        : "text-richblack-25 hover:text-yellow-25 transition-colors"
                      } rounded-xl p-1 px-3 transition-all duration-200`}>
                      {link.title}
                    </p>
                    <MdKeyboardArrowDown className="group-hover:rotate-180 transition-transform duration-200" />
                    
                    {/* Enhanced Dropdown for Catalog */}
                    <div className="invisible absolute left-0 top-full z-[1000] w-[250px] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="absolute left-[30%] top-0 h-4 w-4 -translate-y-1/2 rotate-45 select-none rounded bg-richblack-5"></div>
                      {staticCategories.map((category, i) => (
                        <Link
                          to={`/catalog/${category.name.split(" ").join("-").toLowerCase()}`}
                          className="flex items-center gap-2 rounded-lg py-2 pl-4 hover:bg-richblack-50 transition-colors duration-200"
                          key={i}
                        >
                          <span className="text-lg">{category.icon}</span>
                          <span>{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`${
                        matchRoute(link.path)
                          ? "bg-yellow-25 text-richblack-900 font-medium"
                          : "text-richblack-25 hover:text-yellow-25"
                      } rounded-xl p-1 px-3 transition-colors duration-200`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Improved Login/Signup Buttons */}
          <div className="flex gap-x-4 items-center">
            <Link to="/login">
              <button className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                ${matchRoute('/login') 
                  ? 'border-2 border-yellow-50 text-yellow-50' 
                  : 'border border-richblack-700 bg-richblack-800 text-richblack-100 hover:bg-richblack-700'}`}
                aria-current={matchRoute('/login') ? 'page' : undefined}>
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                ${matchRoute('/signup') 
                  ? 'border-2 border-yellow-50 text-yellow-50' 
                  : 'bg-yellow-50 text-richblack-900 hover:bg-yellow-200'}`}
                aria-current={matchRoute('/signup') ? 'page' : undefined}>
                Sign up
              </button>
            </Link>
          </div>
        </div>

        {/* Enhanced Mobile Menu with animation */}
        <div 
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`absolute top-16 left-0 right-0 bg-richblack-900 border-b border-richblack-700 md:hidden shadow-lg transform ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
          } transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="border-b border-richblack-700 last:border-b-0">
                {link.title === "Catalog" ? (
                  <div className="relative">
                    <button
                      className={`flex w-full items-center justify-between p-4 ${
                        matchRoute("/catalog/:catalogName")
                          ? "bg-richblack-800 text-yellow-25 font-medium"
                          : "text-richblack-25"
                      } hover:bg-richblack-800 transition-colors duration-200`}
                      onClick={(e) => {
                        const dropdown = e.currentTarget.nextElementSibling;
                        dropdown.classList.toggle("hidden");
                      }}
                      aria-expanded="false"
                    >
                      <span>{link.title}</span>
                      <MdKeyboardArrowDown />
                    </button>
                    <div className="hidden bg-richblack-800">
                      {staticCategories.map((category, i) => (
                        <Link
                          to={`/catalog/${category.name.split(" ").join("-").toLowerCase()}`}
                          className="flex items-center gap-2 p-4 pl-8 border-t border-richblack-700 hover:bg-richblack-700 transition-colors duration-200"
                          key={i}
                        >
                          <span className="text-lg">{category.icon}</span>
                          <span>{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    to={link.path}
                    className={`block p-4 ${
                      matchRoute(link.path)
                        ? "bg-richblack-800 text-yellow-25 font-medium"
                        : "text-richblack-25"
                    } hover:bg-richblack-800 transition-colors duration-200`}
                    aria-current={matchRoute(link.path) ? 'page' : undefined}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          {/* Mobile Login/Signup with improved styling */}
          <div className="flex p-4 gap-4">
            <Link to="/login" className="flex-1">
              <button className={`w-full py-2 text-center font-medium rounded-md transition-all duration-200 ${
                matchRoute('/login') 
                  ? 'border-2 border-yellow-50 text-yellow-50' 
                  : 'border border-richblack-700 bg-richblack-800 text-richblack-100'
              }`}
              aria-current={matchRoute('/login') ? 'page' : undefined}>
                Log in
              </button>
            </Link>
            <Link to="/signup" className="flex-1">
              <button className={`w-full py-2 text-center font-medium rounded-md transition-all duration-200 ${
                matchRoute('/signup') 
                  ? 'border-2 border-yellow-50 text-yellow-50' 
                  : 'bg-yellow-50 text-richblack-900'
              }`}
              aria-current={matchRoute('/signup') ? 'page' : undefined}>
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;