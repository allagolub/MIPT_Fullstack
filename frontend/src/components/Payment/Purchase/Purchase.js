import "./Purchase.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { PurchaseItem } from "../PurchaseItem/PurhaseItem";
import { ApiService } from "../../../services/ApiService";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';

export function Purchase() { 
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [passengerData, setPassengerData] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const flightId= searchParams.get('flightId');
  const passengers = searchParams.get('passengers');
  const navigate = useNavigate();

    useEffect(() => {
      (async () => {
        const numPassengers = Number(passengers);
      setPassengerData(Array.from({ length: numPassengers }, () => ({
        name: "",
        surname: "",
        document_type: "",
        document_id: "",
        birth_date: "",
        gender: "",
        middlename: "",
        email:"-"
      })));
    })();
    }, []);

  useEffect(() => {
    (async () => {
      const numPassengers = Number(passengers);
      const data = await ApiService(`flight/${flightId}`);
      setTotalPrice(`${data.flight_sum * numPassengers}Р`);
  
      const gItems = Array.from({ length: numPassengers }, (_, i) => (
        <PurchaseItem key={i} index={i} onPassengerUpdate={handlePassengerUpdate} />
      ));
      setItems(gItems);
    })();
  }, [flightId, passengers]);

  const handlePassengerUpdate = (index, data) => {
    setPassengerData(current => current.map((item, idx) => idx === index ? { ...item, ...data } : item));
  };
  let newPassengersID = [];

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (const passenger of passengerData) {
    const response = await ApiService("passenger/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passenger)
    });
    newPassengersID = [...newPassengersID, response.id]
  }

  const response = await ApiService("order/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ flight_id:flightId, passengers : newPassengersID }),
  });
  navigate("/passenger");
};


  return (
    <div>
      <div className="check-payment-purchase">Проверка и оплата</div>
      {items.map((item, index) => (
        React.cloneElement(item, { index, onPassengerUpdate: handlePassengerUpdate })
      ))}
      <div className="rectangle-purchase">
        <div className="money-label-purchase">К оплате:</div>
        <div className="money-purchase">{totalPrice}</div>
        <div><button className="main-button-purchase" onClick={handleSubmit}>
          Oформить
        </button></div>
      </div>
    </div>
  );
}  