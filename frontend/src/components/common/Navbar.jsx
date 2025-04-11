import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import studyNotionLogo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../../data/navbar-links";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi"; // Using Feather icons for cleaner look

const Navbar = () => {
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const staticCategories = [
    { name: "Web Development" },
    { name: "Data Science" },
    { name: "Design" },
  ];

  const [showNavbar, setShowNavbar] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY) {
          setShowNavbar("hide");
        } else {
          setShowNavbar("show");
        }
      } else {
        setShowNavbar("top");
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-900 text-white ${
        showNavbar === "hide" ? "-translate-y-full" : "translate-y-0"
      } transition-transform duration-300`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to={"/"}>
          <img src={studyNotionLogo} alt="StudyNotion" width={160} height={42} className="h-8" />
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-x-6">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="group relative flex cursor-pointer items-center gap-1">
                    <p className={`${
                      matchRoute("/catalog/:catalogName")
                        ? "bg-yellow-25 text-black"
                        : "text-richblack-25"
                      } rounded-xl p-1 px-3`}>
                      {link.title}
                    </p>
                    <MdKeyboardArrowDown />
                    
                    {/* Dropdown for Catalog */}
                    <div className="invisible absolute left-0 top-full z-[1000] w-[200px] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                      <div className="absolute left-[30%] top-0 h-4 w-4 -translate-y-1/2 rotate-45 select-none rounded bg-richblack-5"></div>
                      {staticCategories.map((category, i) => (
                        <Link
                          to={`/catalog/${category.name.split(" ").join("-").toLowerCase()}`}
                          className="block rounded-lg py-2 pl-4 hover:bg-richblack-50"
                          key={i}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`${
                        matchRoute(link.path)
                          ? "bg-yellow-25 text-black"
                          : "text-richblack-25"
                      } rounded-xl p-1 px-3`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Login/Signup Buttons */}
          <div className="flex gap-x-4 items-center">
            <Link to="/login">
              <button className={`px-3 py-2 text-sm text-richblack-100 rounded-md 
                ${matchRoute('/login') ? 'border-[2px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'}`}>
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className={`px-3 py-2 text-sm text-richblack-100 rounded-md 
                ${matchRoute('/signup') ? 'border-[2px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'}`}>
                Sign up
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-richblack-900 border-b border-richblack-700 md:hidden">
            <ul className="flex flex-col text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index} className="border-b border-richblack-700 last:border-b-0">
                  {link.title === "Catalog" ? (
                    <div className="relative">
                      <button
                        className={`flex w-full items-center justify-between p-4 ${
                          matchRoute("/catalog/:catalogName")
                            ? "bg-richblack-800 text-yellow-25"
                            : "text-richblack-25"
                        }`}
                        onClick={(e) => {
                          const dropdown = e.currentTarget.nextElementSibling;
                          dropdown.classList.toggle("hidden");
                        }}
                      >
                        <span>{link.title}</span>
                        <MdKeyboardArrowDown />
                      </button>
                      <div className="hidden bg-richblack-800">
                        {staticCategories.map((category, i) => (
                          <Link
                            to={`/catalog/${category.name.split(" ").join("-").toLowerCase()}`}
                            className="block p-4 pl-8 border-t border-richblack-700 hover:bg-richblack-700"
                            key={i}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      to={link.path}
                      className={`block p-4 ${
                        matchRoute(link.path)
                          ? "bg-richblack-800 text-yellow-25"
                          : "text-richblack-25"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Mobile Login/Signup */}
            <div className="flex p-4 gap-4">
              <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                <button className={`w-full py-2 text-center text-richblack-100 rounded-md ${
                  matchRoute('/login') ? 'border-[2px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'
                }`}>
                  Log in
                </button>
              </Link>
              <Link to="/signup" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                <button className={`w-full py-2 text-center text-richblack-100 rounded-md ${
                  matchRoute('/signup') ? 'border-[2px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'
                }`}>
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;