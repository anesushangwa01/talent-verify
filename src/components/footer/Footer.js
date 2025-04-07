import { Outlet, Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <p>Copyright &copy; 2025</p>
        <Link to="/register">Register</Link>
      </footer>
    </>
  )
};

export default Footer;