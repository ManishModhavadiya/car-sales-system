import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { createOrder } from "../services/api";
import backImg from "../assets/images/back02.svg";

export default function Register() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    customer_name: "", customer_mobile: "", customer_email: "", customer_address: "",
    car_name: params.get("car_name") || "", car_price: params.get("car_price") || "", booked_date: today,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "customer_mobile" && !/^\d*$/.test(value)) return;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.customer_mobile.length !== 10) { setError("Mobile number must be exactly 10 digits."); return; }
    setLoading(true); setError("");
    try {
      const res = await createOrder(form);
      if (res.success) navigate(`/invoice/${res.id}`);
      else setError(res.message || "Booking failed.");
    } catch { setError("Server error. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center position-relative" style={{ background: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6))" }}>
      <Link to="/cars" style={{ position: "absolute", top: 30, left: 30 }}>
        <img src={backImg} alt="Back" style={{ width: 45, height: 45 }} />
      </Link>
      <div className="p-4 rounded-3 shadow-lg" style={{ background: "#fff", width: "100%", maxWidth: 450 }}>
        <h2 className="text-center mb-4 fw-bold" style={{ color: "red" }}>Car Booking</h2>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          {[
            { name: "customer_name", placeholder: "Customer Name", type: "text" },
            { name: "customer_mobile", placeholder: "Mobile Number", type: "text", maxLength: 10 },
            { name: "customer_email", placeholder: "Email", type: "email" },
            { name: "customer_address", placeholder: "Address", type: "text" },
          ].map(({ name, placeholder, type, maxLength }) => (
            <input key={name} className="form-control mb-2" type={type} name={name}
              placeholder={placeholder} value={form[name]} onChange={handleChange} maxLength={maxLength} required />
          ))}
          <input className="form-control mb-2" value={form.car_name} readOnly />
          <input className="form-control mb-2" value={form.car_price} readOnly />
          <input className="form-control mb-3" type="date" value={form.booked_date} readOnly />
          <button type="submit" className="btn w-100 fw-bold" style={{ background: "red", color: "#fff", fontSize: 16, padding: "12px" }} disabled={loading}>
            {loading ? "Processing..." : "Register & Generate Bill"}
          </button>
        </form>
      </div>
    </div>
  );
}
