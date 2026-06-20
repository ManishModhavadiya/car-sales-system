import { useNavigate } from "react-router-dom";

export default function CarCard({ car }) {
  const navigate = useNavigate();

  // Try multiple image sources
  const imgSrc = `/IMAGES/${car.car_image}`;

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm" style={{ border: "2px solid red", borderRadius: 8 }}>
        <img
          src={imgSrc}
          alt={car.car_name}
          style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: "6px 6px 0 0" }}
          onError={e => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/400x200/cc0000/white?text=${encodeURIComponent(car.car_name)}`;
          }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">{car.car_name}</h5>
          <p className="mb-1 small"><strong>Engine:</strong> {car.car_engin}</p>
          <p className="mb-1 small"><strong>Power:</strong> {car.engin_power}</p>
          <p className="mb-3 small fw-bold" style={{ color: "red", fontSize: 16 }}>
            ₹{Number(car.car_price).toLocaleString("en-IN")}
          </p>
          <button
            className="btn w-100 fw-bold"
            style={{ background: "red", color: "#fff" }}
            onClick={() => navigate(`/register?car_name=${encodeURIComponent(car.car_name)}&car_price=${encodeURIComponent(car.car_price)}`)}
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
