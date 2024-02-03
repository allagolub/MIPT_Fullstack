import "./HeaderRegistration.css";
import { Link } from "react-router-dom";


export function HeaderRegistration() {
  return (
    <header>
      <Link to="/"><div id="AeroRailRoot" className="title-registration"> Aero<span>&Rail</span> </div></Link>
      <button className="header-registration"> Регистрация </button>
    </header>
  );
}
