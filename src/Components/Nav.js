import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { useUser } from '../context/UserContext'; // Importing UserContext

const Nav = ({ cartCount}) => {
  
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // Default profile image
  const [isScrolled, setIsScrolled] = useState(false); // To track scroll state
  const dropdownRef = useRef(null);
  const { user, logout } = useUser(); // Access user and logout from context
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  useEffect(() => {
    // Fetch the profile image from localStorage
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }

   
      // Fetch name from localStorage
      const storedFirstName = localStorage.getItem("userFirstName") || "User";
      const storedLastName = localStorage.getItem("userLastName") || "";
      setFirstName(storedFirstName);
      setLastName(storedLastName);
  

    // Close dropdown on outside click
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Handle scroll event to shrink navbar
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Shrink navbar
      } else {
        setIsScrolled(false); // Reset navbar
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout(); // Call logout from context
    navigate("/signin");
  };

  const name = user?.name || "User";
  const email = user?.email || "Email not available";
  

  const navbarStyle = isScrolled
    ? { padding: "0px 0", transition: "all 0.3s ease" }
    : { padding: "0px 0", transition: "all 0.3s ease" };

  const logoStyle = isScrolled
    ? { width: "150px", height:"70px", transition: "all 0.3s ease" }
    : { width: "200px", height:"100px", transition: "all 0.3s ease" };

  const navLinkStyle = isScrolled
    ? { fontSize: "14px", transition: "font-size 0.3s ease" }
    : { fontSize: "16px", transition: "font-size 0.3s ease" };

  return (
    <header className="navbar-light navbar-sticky-on header-static">
      <nav className="navbar navbar-expand-xl sticky-top" style={navbarStyle}>
        <div className="container-fluid px-3 px-xl-5">
          <Link className="navbar-brand" to="/">
            <img
              className="light-mode-item logo navbar-brand-item"
              src="./assets/images/LMS.jpg"
              alt="logo"
              style={logoStyle}
            />
          </Link>

          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-animation">
              <span />
              <span />
              <span />
            </span>
          </button>

          <div className="navbar-collapse w-100 collapse" id="navbarCollapse">
            <ul className="navbar-nav navbar-nav-scroll me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" style={navLinkStyle} activeClassName="active">Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/Course"
                  id="courseDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={navLinkStyle}
                  activeClassName="active"
                >
                  Courses
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="courseDropdown">
                  <li><NavLink className="dropdown-item" to="/course" activeClassName="active">Networking</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/frontendcourse" activeClassName="active">Front-end</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/backendcourse" activeClassName="active">Back-end</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/digitalmarketing" activeClassName="active">Digital Marketing</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/graphicscourse" activeClassName="active">Graphics Designing</NavLink></li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/coursecategory" style={navLinkStyle} activeClassName="active">Packages</NavLink>
              </li>
              <li className="nav-item dropdown">
  <a
    className="nav-link dropdown-toggle"
    href="#"
    id="dashboardDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Dashboard
  </a>
  <ul className="dropdown-menu" aria-labelledby="dashboardDropdown">
    <li>
      <NavLink
        className={({ isActive }) =>
          isActive ? "dropdown-item active" : "dropdown-item"
        }
        to="/adminlogin"
      >
        Admin
      </NavLink>
    </li>
    <li>
      <NavLink
        className={({ isActive }) =>
          isActive ? "dropdown-item active" : "dropdown-item"
        }
        to="/instructorlogin"
      >
        Instructor
      </NavLink>
    </li>
    <li>
      <NavLink
        className={({ isActive }) =>
          isActive ? "dropdown-item active" : "dropdown-item"
        }
        to="/studentdashboard"
      >
        Student
      </NavLink>
    </li>
  </ul>
</li>


            </ul>

            <div className="d-flex align-items-center ms-3">
              <div className="position-relative">
                <Link to="/cart">
                  <IoMdCart size={28} />
                  <span>{cartCount}</span>
                </Link>
              </div>  


              {user ? ( 
                <div className="dropdown ms-3" ref={dropdownRef}>
                   <button onClick={toggleDropdown}>
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="avatar-img rounded-circle"
                      style={{ width: 30, height: 30 }}
                    />
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown-menu dropdown-menu-end show mt-3">
                      <li className="dropdown-item-text">
                        <strong>Welcome, {firstName} {lastName}!</strong>
                        {/* <strong>{`Welcome, ${name}`}</strong>     */}
                        <p className="small mb-0">{` ${email}`}</p>  
                      </li>
                      <div className="dropdown-divider"></div>
                      <li>
                        <NavLink className="dropdown-item" to="/studenteditprofile">Edit Profile</NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/profile">Account Settings</NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item bg-danger-soft-hover"
                          onClick={handleLogout}
                        >
                          Log Out
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <ul className="navbar-nav sign ms-3">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signin" style={navLinkStyle} activeClassName="active">Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup" style={navLinkStyle} activeClassName="active">Sign Up</NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
