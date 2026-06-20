import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/api";
import bgImg from "../assets/images/bg02.avif";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ uname: "", pass: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const res = await adminLogin(form.uname, form.pass);
      if (res.success) { localStorage.setItem("mahindra_admin", "1"); navigate("/admin"); }
      else setError(res.message || "Invalid credentials");
    } catch { setError("Server error. Is XAMPP running?"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="p-4 rounded-4 text-white" style={{
        background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.37)", width: 320,
      }}>
        <h4 className="text-center mb-4">Admin Panel</h4>
        {error && <div className="alert alert-danger py-2 text-dark">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3 border-0 rounded-3" placeholder="AdminName"
            value={form.uname} onChange={e => setForm(f => ({ ...f, uname: e.target.value }))} required />
          <input className="form-control mb-3 border-0 rounded-3" type="password" placeholder="Password"
            value={form.pass} onChange={e => setForm(f => ({ ...f, pass: e.target.value }))} required />
          <button type="submit" className="btn w-100 rounded-3 fw-bold"
            style={{ background: "#4CAF50", color: "#fff", fontSize: 16 }} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
