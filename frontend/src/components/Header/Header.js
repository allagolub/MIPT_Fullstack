import "./Header.css";
import { Link } from "react-router-dom";
import React from 'react';
import { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";



export function Header() {
  const [user, setUser] = useState(null);

  const onLogout = () => {
    window.localStorage.removeItem("access");
    window.localStorage.removeItem("refresh");
    window.location.reload();
    window.location.href = "/";
  };

  const isAuth = Boolean(window.localStorage.getItem("access"));

  useEffect(() => {
    (async () => {
      if (isAuth) {
        const user = await ApiService("user/current");
        setUser(user);
      }
    })();
  }, []);

  return (
    <div className="header">
       <div className="header-container">
      <Link to="/" style={{ textDecoration: 'none' }}><span className="title"> Aero&Travel </span></Link>
      
      <div className="header-items">
      {isAuth && (<Link to="/passenger">
        <button className="header-button"> Поездки</button>
      </Link>)}
      {isAuth ? (
        <button className="profile" onClick={onLogout}>
          <span> Выйти </span> </button>
      ) : (
        <Link to="/login">
          <button className="login-button"> Войти</button>
        </Link>
      )}
    
      </div>
      </div>
    </div>
  );
}
