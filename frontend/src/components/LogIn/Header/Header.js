import "./Header.css";
import { Link } from "react-router-dom";
import bgImg from "./images/1.jpeg";


export function Header() {
  return (

    <div>
      <div className="background-login">
             <img src={bgImg}/>
        </div>
     <div><Link to="/" style={{ textDecoration: 'none' }}><span className="title-login"> Aero&Travel </span></Link></div>
      <button className="header-login"> Вход </button>
    </div>
  );
}
