import "./MyOrderItem.css";
import { ApiService } from "../../../services/ApiService";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function MyOrderItem({ key, order }) {
    const navigate = useNavigate();
    const [flightDetails, setFlightDetails] = useState(null);
    useEffect(() => {
        (async () => {
            const data = await ApiService(`flight/${order.flight.id}`, {
                method: "GET",
                headers: {}
            });
            setFlightDetails(data);
        })();
    }, [order.flight.id]);

    if (!flightDetails) {
        return <div>Loading...</div>;
    }

    const handleDeleteOrder = async (orderId) => {
        const response = await ApiService(`order/delete/${orderId}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        navigate("/passenger");
        navigate(0);
    };


    return (
        <div key={key}>
              <div className="info-name-passenger"> Город вылета: {capitalizeFirstLetter(flightDetails.city_from)}</div>
            <div className="info-details-passengers"> Город прилета: {capitalizeFirstLetter(flightDetails.city_to)} </div>
            <div className="info-details-passengers"> Аэропорт вылета: {flightDetails.airport_from}</div>
            <div className="info-details-passengers"> Аэропорт прилета: {flightDetails.airport_to}</div>
            <div className="info-details-passengers"> Дата вылета: {flightDetails.formatted_date_from}, {flightDetails.formatted_time_from}</div>
            <div className="info-details-passengers"> Дата прилета: {flightDetails.formatted_date_to}, {flightDetails.formatted_time_to}</div>
            <div className="button-container">
            <button className="delete-button" onClick={() => handleDeleteOrder(order.id)}> Удалить поездку</button>
              </div>
            </div>
    )
}