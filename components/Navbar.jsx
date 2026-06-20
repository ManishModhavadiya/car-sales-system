import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/mahindra.jpg";

export default function Navbar() {
  const { pathname } = useLocation();
  const links = [
    { to: "/", label: "Home" },
    { to: "/cars", label: "Cars" },
    { to: "/#about", label: "About Us" },
    { to: "/#contact", label: "Contact Us" },
  ];
  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ background: "#000" }}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={logo} alt="Mahindra" style={{ height: 55, width: 50, objectFit: "cover" }} />
          <span style={{ fontSize: 26, fontWeight: "bold", color: "red" }}>Mahindra</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" style={{ borderColor: "#fff" }}>
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navMenu">
          <ul className="navbar-nav gap-2">
            {links.map(({ to, label }) => (
              <li className="nav-item" key={label}>
                <Link className="nav-link px-3 py-1" to={to} style={{
                  color: pathname === to ? "#000" : "#fff",
                  fontSize: 18,
                  background: pathname === to ? "#fff" : "transparent",
                  borderRadius: 4,
                }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
