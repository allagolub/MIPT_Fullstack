import "./SearchTicketsItem.css";
import Img from "../images/1.jpeg";
import { ApiService } from "../../../services/ApiService";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export function SearchTicketsItem({key, ticket, passengers}) {
  const navigate = useNavigate();
  const handleChoose= async (event) => {
    event.preventDefault();
    const accessToken = window.localStorage.getItem("access");
    if (!accessToken) {
      navigate("/login");
      return;
    }
      const path = {
        pathname: '/order',
        search: createSearchParams({
          "flightId": ticket.id,
          "passengers": passengers,
        }).toString()
        };
        navigate(path);
  }


    return (
        <div key={key} className="search-tickets-item">
            <img src={Img}className="img"/>

            <div className="from-item">
            <div className="from-all-time-item">
            <span className="from-time-item">{ticket.formatted_time_from} </span>
              <span className="from-date-item">{ticket.formatted_date_from}</span>
            </div>
            <div className="from-city-item">
              <span className="from-airport-item">{ticket.airport_from}, </span>
              <span className="from-city-item">{ticket.city_from}</span>
            </div>
            </div>

            <div className="to-item">
            <div className="to-all-time-item">
              <span className="to-time-item">{ticket.formatted_time_to}, </span>
              <span className="to-date-item">{ticket.formatted_date_to}</span>
            </div>
            <div className="to-city-item">
              <span className="to-airport-item">{ticket.airport_to}, </span>
              <span className="to-city-item">{ticket.city_to}</span>
            </div>
            </div>


            <div className="result-time-item">
              <span className="result-time">{ticket.time_in_flight_display} <br/>в пути</span>
            </div>


            <div className="details-item">
              <span className="sum-item">{ticket.flight_sum * passengers}Р</span>
              <span className="luggage-item">Багаж {ticket.luggage} кг</span>
              <span className="hand-luggage-item">Ручная кладь {ticket.hand_laggage}кг</span>
              <span className="refund-item">{ticket.refund} </span>
              <Link to="/order"><button className="button-buy" onClick={handleChoose}>Выбрать</button></Link>
            </div>
        </div>
      );
    
}