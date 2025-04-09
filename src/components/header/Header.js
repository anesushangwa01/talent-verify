import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  // State to control the collapse of the navbar
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  // Toggle navbar collapse state
  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  // Function to handle closing the navbar when a link is clicked
  const closeNavbar = () => {
    setIsNavbarCollapsed(true); // Collapse the navbar
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-4 py-2">
        <div className="container-fluid">
          {/* Left side - Brand */}
          <Link className="navbar-brand fw-semibold text-success" to="/">
            Talent Verify
          </Link>

          {/* Hamburger button for small screens */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar} // Toggle on button click
            aria-controls="navbarNav"
            aria-expanded={!isNavbarCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible navbar links */}
          <div
            className={`collapse navbar-collapse ${isNavbarCollapsed ? "" : "show"}`}
            id="navbarNav"
          >
            {/* Right side - Add employee & Login */}
            <div className="navbar-nav ms-auto">
              <Link className="nav-link text-dark" to="/addemployee" onClick={closeNavbar}>
                Add employee
              </Link>
              <Link className="nav-link text-dark" to="/addcompany" onClick={closeNavbar}>
                Add Company
              </Link>
              <Link className="nav-link text-dark" to="/displaycompany" onClick={closeNavbar}>
                Display Companies
              </Link>
              <Link className="nav-link text-dark" to="/displayemployees" onClick={closeNavbar}>
                Display Employees
              </Link>
            </div>
          </div>
        </div>
      </nav>

 
      <Outlet />
    </>
  );
};

export default Header;
