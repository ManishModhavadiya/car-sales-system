import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../services/api";
import bgImg from "../../assets/images/bg01.jpg";

export default function AdminDashboard() {
  const navigate = useNavigate();
  useEffect(() => { if (!localStorage.getItem("mahindra_admin")) navigate("/login"); }, [navigate]);

  const handleLogout = async () => {
    await adminLogout();
    localStorage.removeItem("mahindra_admin");
    navigate("/");
  };

  const buttons = [
    { label: "➕ Add Car", path: "/admin/add" },
    { label: "✏️ Update Car", path: "/admin/update" },
    { label: "❌ Remove Car", path: "/admin/remove" },
    { label: "📦 Orders", path: "/admin/orders" },
  ];

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }}>
      <div className="bg-white rounded-3 p-5 shadow-lg" style={{ width: "100%", maxWidth: 600 }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#2c3e50" }}>Admin Dashboard</h2>
          <p className="text-muted">Mahindra Car Sales Management</p>
        </div>
        <div className="row g-3">
          {buttons.map(({ label, path }) => (
            <div className="col-6" key={path}>
              <button className="btn w-100 py-4 fw-semibold fs-5 rounded-1 text-white"
                style={{ background: "#203a43" }}
                onMouseEnter={e => { e.target.style.background="#0f2027"; e.target.style.transform="translateY(-3px)"; }}
                onMouseLeave={e => { e.target.style.background="#203a43"; e.target.style.transform="translateY(0)"; }}
                onClick={() => navigate(path)}>{label}</button>
            </div>
          ))}
          <div className="col-12">
            <button className="btn w-100 py-3 fw-semibold fs-5 text-white rounded-1"
              style={{ background: "#c0392b" }}
              onMouseEnter={e => e.target.style.background="#922b21"}
              onMouseLeave={e => e.target.style.background="#c0392b"}
              onClick={handleLogout}>🚪 Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
