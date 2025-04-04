import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import AddCompany from "./components/addCompany/AddCompany"
import AddEmployee from "./components/addEmployee/AddEmployee";
import Footer from "./components/footer/Footer";
import DisplayCompany from "./components/pages/DisplayCompanies";
import DisplayEmployee from "./components/pages/DisplayEmployees";
import Layout from "./components/Layout";
import Register from "./components/register/Register";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout   />}>
          <Route path="header" element={<Header />} />
          <Route path="addcompany" element={<AddCompany />} />
          <Route path="footer" element={<Footer />} />
          <Route path="displayemployee" element={<  DisplayEmployee  />} />
          <Route path="displaycompany" element={<DisplayCompany />} />
          <Route path="addemployee" element={<AddEmployee />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
