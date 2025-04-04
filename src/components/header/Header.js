import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Talent verify</Link>
          </li>
          <li>
            <Link to="/displayemployee">View Employees</Link>
          </li>
          <li>
            <Link to="/displaycompany"> View Companys</Link>
          </li>
          <li>
            <Link to="/addcompany">Add Company</Link>
          </li>
          <li>
            <Link to="/addemployee">Add Employee</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Header;