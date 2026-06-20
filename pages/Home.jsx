import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bgImage from "../assets/images/RR.jpg";

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1 d-flex align-items-center" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${bgImage})`,
        backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", minHeight: "80vh",
      }}>
        <div className="ms-5 ps-4">
          <p style={{ fontFamily: "Comic Sans MS, cursive", fontSize: "clamp(40px,7vw,80px)", color: "#fff", lineHeight: 1.3, cursor: "default", transition: "all 0.4s" }}
            onMouseEnter={e => { e.target.style.color="red"; e.target.style.fontSize="clamp(48px,8vw,100px)"; }}
            onMouseLeave={e => { e.target.style.color="#fff"; e.target.style.fontSize="clamp(40px,7vw,80px)"; }}>
            Live Young ,<br />Live Free
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
