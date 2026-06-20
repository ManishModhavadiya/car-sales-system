import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { addCar } from "../../services/api";
import BackButton from "../../components/BackButton";
import addIcon from "../../assets/images/add.png";
import successAudio from "../../assets/images/newcar.mp3";
import bgImg from "../../assets/images/bg01.jpg";

export default function AddCar() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [form, setForm] = useState({ car_name:"", car_image:"", car_engin:"", engin_power:"", car_price:"" });
  const [message, setMessage] = useState({ text:"", type:"" });
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (!localStorage.getItem("mahindra_admin")) navigate("/login"); }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    const ext = form.car_image.split(".").pop().toLowerCase();
    if (!["jpg","jpeg","webp"].includes(ext)) { setMessage({ text:"Only JPG, JPEG, WEBP allowed!", type:"danger" }); return; }
    if (!/^\d{7}$/.test(form.car_price)) { setMessage({ text:"Price must be 7 digits.", type:"danger" }); return; }
    setLoading(true);
    try {
      const res = await addCar(form);
      if (res.success) { setMessage({ text: res.message, type:"success" }); audioRef.current?.play().catch(()=>{}); setForm({ car_name:"", car_image:"", car_engin:"", engin_power:"", car_price:"" }); }
      else setMessage({ text: res.message, type:"danger" });
    } catch { setMessage({ text:"Server error.", type:"danger" }); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center position-relative"
      style={{ backgroundImage:`url(${bgImg})`, backgroundSize:"cover" }}>
      <audio ref={audioRef} src={successAudio} />
      <BackButton to="/admin" />
      <div className="p-4 rounded-3 text-white" style={{ background:"rgba(255,255,255,0.1)", backdropFilter:"blur(10px)", boxShadow:"0 8px 32px rgba(0,0,0,0.37)", width:"100%", maxWidth:360 }}>
        <img src={addIcon} alt="Add" style={{ width:80, height:80, display:"block", margin:"0 auto 12px" }} />
        <h4 className="text-center mb-3">Car Registration</h4>
        {message.text && <div className={`alert alert-${message.type} py-2`}>{message.text}</div>}
        <form onSubmit={handleSubmit}>
          {[
            { name:"car_name", placeholder:"Car Name" },
            { name:"car_image", placeholder:"Image Filename (e.g. thar.webp)" },
            { name:"car_engin", placeholder:"Car Engine" },
            { name:"engin_power", placeholder:"Engine Power" },
            { name:"car_price", placeholder:"Car Price (7 digits)" },
          ].map(({ name, placeholder }) => (
            <input key={name} className="form-control mb-2 border-0 rounded-3" placeholder={placeholder}
              value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} required />
          ))}
          <button type="submit" className="btn w-100 rounded-3 fw-bold mt-2"
            style={{ background:"#4CAF50", color:"#fff" }} disabled={loading}>
            {loading ? "Adding..." : "Add Car"}
          </button>
        </form>
      </div>
    </div>
  );
}
