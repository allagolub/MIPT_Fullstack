import "./Tickets.css";
import { Header } from "../Header/Header";
import { ApiService } from "../../services/ApiService";
import { SearchTicketsItem } from "./SearchTicketsItem/SearchTicketsItem";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';

import image1 from "./images/1.svg";
import image2 from "./images/2.svg";
import image3 from "./images/3.svg";
import image4 from "./images/4.svg";

export function Tickets() {
    const [cityFrom, setCityFrom] = useState("");
    const [cityTo, setCityTo] = useState("");
    const [date, setDate] = useState("");
    const [counter, setCounter] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();
    const [tickets, setTickets] = useState([]);

    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const dateFrom = searchParams.get('date');
    const passengers= searchParams.get('passengers');
  
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
      (async () => {
        if (from && to && dateFrom && passengers) {
        const data = await ApiService("flight?from=" + from + '&to=' + to + '&date='+ dateFrom + '&passengers=' + passengers);
        const formattedData = data.map(ticket => ({
          ...ticket,
          city_from: capitalizeFirstLetter(ticket.city_from),
          city_to: capitalizeFirstLetter(ticket.city_to)
        }));
        setTickets(
          formattedData.map((ticket, index) => 
            <SearchTicketsItem key={index} ticket={ticket} passengers={passengers}/>
          )
        );
        setCityFrom(from);
        setCityTo(to);
        setDate(dateFrom);
        setCounter(passengers);
        }
      })();  
    }, []);

    const navigate = useNavigate();

    const handleChangeCityFrom = (event) => {
      setCityFrom(event.target.value);
    }
    const handleChangeCityTo = (event) => {
      setCityTo(event.target.value);
    }
    const handleChangeDate = (event) => {
      setDate(event.target.value);
    }
    const handleCounter = (event) => {
      setCounter(event.target.value);
    }
    const handleSearch = async (event) => {
      navigate("/flight?from="+cityFrom + '&to=' + cityTo + '&date='+ date + '&passengers=' + counter);
      navigate(0);
    }

    return (
        <div>
         <Header />
      
         <div className="tickets">
          <div className="ticket-item">

          <div className="title-item">Авиа</div>

          <div className="ticket-item">
              <label>Откуда</label>
              <input key="cityFrom" placeholder={cityFrom} value={cityFrom} type="text" onChange={handleChangeCityFrom} />
          </div>

          <div className="ticket-item">
              <label>Куда</label>
              <input key="cityTo" placeholder={cityTo} value={cityTo} type="text" onChange={handleChangeCityTo}/>
          </div>

          <div className="ticket-item">
              <label>Дата</label>
              <input key="date" placeholder={date}  value={date} type="text" onFocus={(e) => e.target.type = 'date'} onChange={handleChangeDate}/>
          </div>

          <div className="ticket-item">
              <label>Пассажиры</label>
              <input key="countera" placeholder={counter}  value={counter} type="text" onChange={handleCounter}/>
          </div>
              <button onClick={handleSearch}>Найти</button>
          </div>
          
          <div className="results">
            { tickets }

          </div>

          </div>
        </div>
      );
    
}