import { Outlet, Link } from "react-router-dom";


const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-4 py-2">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Left side - Brand */}
          <Link className="navbar-brand fw-semibold text-success" to="/">
            Talent Verify
          </Link>

          {/* Right side - Add employee & Login */}
          <div className="d-flex align-items-center gap-3">
            <Link className="text-dark text-decoration-none small" to="/addemployee">
              Add employee
            </Link>
            <Link className="text-dark text-decoration-none small" to="/addcompany">
              Add Company
            </Link>
            <Link className="text-dark text-decoration-none small" to="/displaycompany">
              Display Companies
            </Link>
            <Link className="text-dark text-decoration-none small" to="/displayemployees">
            Display Employees
            </Link>

            <Link to="/login" className="btn btn-success btn-sm px-4">
              Login
            </Link>
          </div>
        </div>
      </nav>

   

      <Outlet />
    </>
  );
};

export default Header;
