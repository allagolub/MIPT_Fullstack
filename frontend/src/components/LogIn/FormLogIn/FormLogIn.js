import "./FormLogIn.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ApiService } from "../../../services/ApiService";

export function FormLogIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeLogin = (event) => {
    setLogin(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
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
      body: JSON.stringify({ username: login, password }),
    });


    if (access) {
      window.localStorage.setItem("access", access);
      window.localStorage.setItem("refresh", refresh);
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div>
      <button className="main-button-login" onClick={onAuth}> Войти</button>
      <Link to="/registration"><button className="registration-button-login"> Регистрация </button></Link>
      <label className="email-login">
        <input type="text" value={login} placeholder="Email(логин)" onChange={handleChangeLogin}/>
      </label>
      <label className="password-login">
        <input type="password" value={password} placeholder="Пароль" onChange={handleChangePassword}/>
      </label>
    </div>
  );
}
