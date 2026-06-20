import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCars, updateCar } from "../../services/api";
import BackButton from "../../components/BackButton";
import updateIcon from "../../assets/images/update.png";
import successAudio from "../../assets/images/carupdate.mp3";
import bgImg from "../../assets/images/bg01.jpg";

export default function UpdateCar() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ car_id:"", car_name:"", car_image:"", car_engin:"", engin_power:"", car_price:"" });
  const [message, setMessage] = useState({ text:"", type:"" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("mahindra_admin")) { navigate("/login"); return; }
    getCars().then(res => { if (res.success) setCars(res.data); });
  }, [navigate]);

  const handleSelect = e => {
    const car = cars.find(c => c.car_id == e.target.value);
    if (car) setForm({ car_id:car.car_id, car_name:car.car_name, car_image:car.car_image, car_engin:car.car_engin, engin_power:car.engin_power, car_price:car.car_price });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateCar(form);
      if (res.success) { setMessage({ text:res.message, type:"success" }); audioRef.current?.play().catch(()=>{}); }
      else setMessage({ text:res.message, type:"danger" });
    } catch { setMessage({ text:"Server error.", type:"danger" }); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center position-relative"
      style={{ backgroundImage:`url(${bgImg})`, backgroundSize:"cover" }}>
      <audio ref={audioRef} src={successAudio} />
      <BackButton to="/admin" />
      <div className="p-4 rounded-3 text-white" style={{ background:"rgba(255,255,255,0.1)", backdropFilter:"blur(10px)", boxShadow:"0 8px 32px rgba(0,0,0,0.37)", width:"100%", maxWidth:360 }}>
        <img src={updateIcon} alt="Update" style={{ width:80, height:80, display:"block", margin:"0 auto 12px" }} />
        <h4 className="text-center mb-3">UPDATE CAR</h4>
        {message.text && <div className={`alert alert-${message.type} py-2`}>{message.text}</div>}
        <form onSubmit={handleSubmit}>
          <select className="form-select mb-2 border-0 rounded-3" onChange={handleSelect} defaultValue="" required>
            <option value="" disabled>Select Car</option>
            {cars.map(c => <option key={c.car_id} value={c.car_id}>{c.car_name}</option>)}
          </select>
          {[
            { name:"car_name", placeholder:"Car Name" },
            { name:"car_image", placeholder:"Image Filename" },
            { name:"car_engin", placeholder:"Car Engine" },
            { name:"engin_power", placeholder:"Engine Power" },
            { name:"car_price", placeholder:"Car Price" },
          ].map(({ name, placeholder }) => (
            <input key={name} className="form-control mb-2 border-0 rounded-3" placeholder={placeholder}
              value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} required />
          ))}
          <button type="submit" className="btn w-100 rounded-3 fw-bold mt-2"
            style={{ background:"#4CAF50", color:"#fff" }} disabled={loading}>
            {loading ? "Updating..." : "UPDATE CAR"}
          </button>
        </form>
      </div>
    </div>
  );
}
