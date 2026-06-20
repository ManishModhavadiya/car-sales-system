import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CarCard from "../components/CarCard";
import { getCars } from "../services/api";

export default function Cars() {
  const [cars, setCars]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo]     = useState(false);

  useEffect(() => {
    getCars()
      .then(res => {
        if (res.success) {
          setCars(res.data);
          if (res.demo) setDemo(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Navbar />
      <div className="container-fluid py-4">
        <h2 className="text-center fw-bold mb-2" style={{ letterSpacing: 2 }}>
          Mahindra Car Models
        </h2>

        {demo && (
          <div className="alert alert-warning text-center mx-auto mb-3 py-2" style={{ maxWidth: 500, fontSize: 14 }}>
            ⚠️ XAMPP not running — showing demo data. Start Apache + MySQL for live data.
          </div>
        )}

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status" />
            <p className="mt-2 text-muted">Loading cars...</p>
          </div>
        )}

        {!loading && (
          <div className="row g-3 px-3">
            {cars.map(car => <CarCard key={car.car_id} car={car} />)}
          </div>
        )}
      </div>
    </div>
  );
}
