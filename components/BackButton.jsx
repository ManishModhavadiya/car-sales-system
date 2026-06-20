import { useNavigate } from "react-router-dom";
import backImg from "../assets/images/back02.svg";

export default function BackButton({ to }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => to ? navigate(to) : navigate(-1)}
      style={{ position: "absolute", top: 30, left: 30, background: "none", border: "none", cursor: "pointer", transition: "transform 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.transform="scale(1.1)"}
      onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
      <img src={backImg} alt="Back" style={{ width: 45, height: 45, boxShadow: "2px 2px 2px 3px white" }} />
    </button>
  );
}
