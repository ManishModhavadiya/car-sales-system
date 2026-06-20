import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "#000", padding: "40px 0 20px" }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4" id="about">
            <h5 style={{ color: "red" }}>Mahindra &amp; Mahindra</h5>
            <p style={{ color: "#ccc", fontSize: 14 }}>Authorized Mahindra Dealer<br />Sales • Service • Spare Parts</p>
            <button className="btn mt-2" style={{ background: "orange", color: "#000", fontWeight: "bold", borderRadius: 10 }}
              onClick={() => window.open("https://www.google.com/maps/search/MAHINDRA+CARS+SHWROOM+PORBADAR")}>
              MAHINDRA
            </button>
          </div>
          <div className="col-md-4" id="contact">
            <h5 style={{ color: "red" }}>Contact</h5>
            <p style={{ color: "#ccc", fontSize: 14, marginBottom: 4 }}>📞 +91 75677****9</p>
            <p style={{ color: "#ccc", fontSize: 14, marginBottom: 4 }}>✉️ Mahindra@sales.com</p>
            <p style={{ color: "#ccc", fontSize: 14 }}>📍 Porbandar, Gujarat</p>
          </div>
          <div className="col-md-4">
            <h5 style={{ color: "red" }}>Follow Us</h5>
            <div className="d-flex gap-3 mt-2">
              {["fab fa-facebook","fab fa-instagram","fab fa-youtube"].map(icon => (
                <a key={icon} href="#" style={{ color: "#ccc", fontSize: 22 }}
                  onMouseEnter={e => e.target.style.color="red"}
                  onMouseLeave={e => e.target.style.color="#ccc"}>
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-4" style={{ color: "#777", fontSize: 14, borderTop: "1px solid #333", paddingTop: 16 }}>
          © 2026 Mahindra Authorized Dealer &nbsp;|&nbsp;
          <Link to="/login" style={{ color: "#777", textDecoration: "none" }}>Admin Panel</Link>
        </div>
      </div>
    </footer>
  );
}
