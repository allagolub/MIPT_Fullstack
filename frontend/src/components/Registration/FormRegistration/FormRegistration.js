import "./FormRegistration.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ApiService } from "../../../services/ApiService";

export function FormRegistration() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleChangeName = (event) => {
        setName(event.target.value);
    }
    const handleChangeSurname = (event) => {
        setSurname(event.target.value);
    }



    const onAuth = async (event) => {
      event.preventDefault();
  
      window.localStorage.removeItem("access");
      window.localStorage.removeItem("refresh");
  
      const { access, refresh } = await ApiService("token/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username : email, password }),
      });
  
      window.localStorage.setItem("access", access);
      window.localStorage.setItem("refresh", refresh);
      window.location.href = "/";
    };
  
    
    const onRegister = async (event) => {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      formData.append("first_name", name);
      formData.append("last_name", surname);
  
      await ApiService("user/", {
        method: "post",
        body: formData,
      });
  
      await onAuth(event);
    };

  return (
    <div>
        <button className="main-button-registration" onClick={onRegister}>
           Зарегистрироваться</button>
        <Link to="/login"><button className="login-button-registration"> Вход </button></Link>

        <label className="email-registration">
            <input type="text" placeholder="Email(логин)" value={email} onChange={handleChangeEmail}/>
        </label>

        <label className="password-registration">
            <input type="password" placeholder="Пароль" value={password} onChange={handleChangePassword}/>
        </label>

        <label className="name-registration">
            <input type="text" placeholder="Имя" value={name} onChange={handleChangeName}/>
        </label>

        <label className="surname-registration">
            <input type="text" placeholder="Фамилия" value={surname} onChange={handleChangeSurname}/>
        </label>


    </div>
    
  );
}
