import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCars, deleteCar } from "../../services/api";
import BackButton from "../../components/BackButton";
import deleteIcon from "../../assets/images/delete.png";
import deleteAudio from "../../assets/images/cardelete.mp3";
import bgImg from "../../assets/images/bg01.jpg";

export default function RemoveCar() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState("");
  const [message, setMessage] = useState({ text:"", type:"" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("mahindra_admin")) { navigate("/login"); return; }
    getCars().then(res => { if (res.success) setCars(res.data); });
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await deleteCar(carId);
      if (res.success) { setMessage({ text:res.message, type:"success" }); audioRef.current?.play().catch(()=>{}); setCars(cars.filter(c => c.car_id != carId)); setCarId(""); }
      else setMessage({ text:res.message, type:"danger" });
    } catch { setMessage({ text:"Server error.", type:"danger" }); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center position-relative"
      style={{ backgroundImage:`url(${bgImg})`, backgroundSize:"cover" }}>
      <audio ref={audioRef} src={deleteAudio} />
      <BackButton to="/admin" />
      <div className="p-4 rounded-3 text-white" style={{ background:"rgba(255,255,255,0.1)", backdropFilter:"blur(10px)", boxShadow:"0 8px 32px rgba(0,0,0,0.37)", width:"100%", maxWidth:360 }}>
        <img src={deleteIcon} alt="Delete" style={{ width:80, height:80, display:"block", margin:"0 auto 12px" }} />
        <h4 className="text-center mb-4" style={{ color:"#ff4c4c" }}>DELETE CAR</h4>
        {message.text && <div className={`alert alert-${message.type} py-2`}>{message.text}</div>}
        <form onSubmit={handleSubmit}>
          <select className="form-select mb-4 border-0 rounded-3" value={carId} onChange={e => setCarId(e.target.value)} required>
            <option value="" disabled>Select Car</option>
            {cars.map(c => <option key={c.car_id} value={c.car_id}>{c.car_name}</option>)}
          </select>
          <button type="submit" className="btn w-100 rounded-3 fw-bold"
            style={{ background:"#ff4c4c", color:"#fff" }} disabled={loading}>
            {loading ? "Deleting..." : "Delete Car"}
          </button>
        </form>
      </div>
    </div>
  );
}
