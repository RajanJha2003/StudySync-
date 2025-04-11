import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import studyNotionLogo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../../data/navbar-links";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  // when user click Navbar link then it will hold yellow color
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

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  });

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShowNavbar("hide");
      } else {
        setShowNavbar("show");
      }
    } else {
      setShowNavbar("top");

      setLastScrollY(window.scrollY);
    }
  };
  return (
    <nav
      className={`z-[10] flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-700 text-white translate-y-0 transition-all ${showNavbar}`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to={"/"}>
          <img src={studyNotionLogo} alt="" width={160} height={42} />
        </Link>
        <ul className="hidden sm:flex gap-x-6 text-richblack-25">
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === "Catalog" ? (
                <div
                  className={`group relative flex cursor-pointer items-center gap-1 ${
                    matchRoute("/catalog/:catalogName")
                      ? "bg-yellow-25 text-black rounded-xl p-1 px-3"
                      : "text-richblack-25 rounded-xl p-1 px-3"
                  } `}
                >
                  <p>{link.title}</p>
                  <MdKeyboardArrowDown />
                  <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]  ">
                    <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5">  </div>
                      {staticCategories.map((category, i) => (
                        <Link
                          to={`/catalog/${category.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}`}
                          className="rounded-lg bg-transparent py-2 pl-4 hover:bg-richblack-50"
                          key={i}
                        >
                          <p>{category.name}</p>
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

        <div className='flex gap-x-4 items-center'>
                    <Link to="/login">
                        <button className={`px-[12px] py-[8px] text-richblack-100 rounded-md 
                            ${matchRoute('/login') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'}`}>
                            Log in
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className={`px-[12px] py-[8px] text-richblack-100 rounded-md 
                            ${matchRoute('/signup') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'}`}>
                            Sign up
                        </button>
                    </Link>
                </div>
      </div>
    </nav>
  );
};

export default Navbar;
