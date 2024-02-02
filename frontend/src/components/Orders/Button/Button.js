import "./Button.css";
import { Link } from "react-router-dom";

export function Button() {
    return (
      <div>
        <Link to="/"><button className="new-passengers-button"> Добавить новую поездку</button></Link>
        </div>
      );
    
}