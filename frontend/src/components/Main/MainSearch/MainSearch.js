import "./MainSearch.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate, createSearchParams } from 'react-router-dom';
import {host} from '../../../App.js';

import image1 from "./images/1.svg";
import image2 from "./images/2.svg";
import image3 from "./images/3.svg";
import image4 from "./images/4.svg";


export function MainSearch() {
    const navigate = useNavigate();
    const [cityFrom, setCityFrom] = useState("");
    const [cityTo, setCityTo] = useState("");
    const [date, setDate] = useState("");
    const [counter, setCounter] = useState(1)
    const decreaseCounter = () => {
        if (counter > 1) { 
          setCounter(counter - 1);
        }
      };


    const handleChangeCityFrom = (event) => {
      setCityFrom(event.target.value);
    }
    const handleChangeCityTo = (event) => {
      setCityTo(event.target.value);
    }
    const handleChangeDate = (event) => {
      setDate(event.target.value);
    }
    const handleSearch = async (event) => {
      event.preventDefault();
      const path = {
        pathname: '/flight',
        search: createSearchParams({
          "from": cityFrom,
          "to": cityTo,
          "date": date,
          "passengers": counter,
        }).toString()
        };
        navigate(path);
    }

    return (
        <div className="button_search">
            <div className="rectangle">
            <button className="avia">Авиа</button>

            <label className="from">
            <input type="text" placeholder="Откуда" value={cityFrom} onChange={handleChangeCityFrom}/>
            </label>

            <label className="to">
            <input type="text" placeholder="Куда" value={cityTo} onChange={handleChangeCityTo}/>
            </label>

            <input className="date" type="date" value={date} onChange={handleChangeDate}/>
    
            <button className="passengers"> Пассажиры : {counter} </button>
            <button className="passenger-count-inc" value={counter} onClick={() => setCounter(counter + 1)}> + </button>
            <button className="passenger-count-dec" value={counter} onClick={decreaseCounter}> - </button>

            <button className="button-search" onClick={handleSearch}>
                <img src={image4} color="white" className="button-icon" />
              </button>
            </div>
        </div>
      );
    
}
