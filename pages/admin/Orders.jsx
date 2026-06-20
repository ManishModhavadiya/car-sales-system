import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../services/api";
import BackButton from "../../components/BackButton";
import bgImg from "../../assets/images/bg01.jpg";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("mahindra_admin")) { navigate("/login"); return; }
    getOrders()
      .then(res => { if (res.success) setOrders(res.data); else setError(res.message); })
      .catch(() => setError("Server error."))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center position-relative py-5"
      style={{ backgroundImage:`url(${bgImg})`, backgroundSize:"cover" }}>
      <BackButton to="/admin" />
      <div className="rounded-3 shadow-lg p-4" style={{ background:"rgba(255,255,255,0.93)", width:"95%", maxWidth:1100, overflowX:"auto" }}>
        <h2 className="text-center fw-bold mb-3" style={{ color:"#2c3e50" }}>Car Bookings</h2>
        {loading && <div className="text-center"><div className="spinner-border text-danger" /></div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          orders.length === 0 ? <p className="text-center text-muted">No orders found.</p> :
          <table className="table table-hover table-bordered align-middle" style={{ fontSize:14 }}>
            <thead style={{ background:"#2c3e50", color:"#fff" }}>
              <tr>{["ID","Name","Mobile","Email","Address","Car","Price","Booked Date"].map(h => <th key={h} className="py-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.c_id}>
                  <td>{o.c_id}</td><td>{o.c_name}</td><td>{o.c_mobile}</td>
                  <td>{o.c_email}</td><td>{o.c_address}</td><td>{o.car_name}</td>
                  <td>₹{Number(o.car_price).toLocaleString("en-IN")}</td><td>{o.book_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
