import "./PurchaseItem.css";
import { ApiService } from "../../../services/ApiService";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export function PurchaseItem({index, onPassengerUpdate}) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [document_type, setDocument] = useState("");
    const [document_id, setDocumentID] = useState("");
    const [birth_date, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [middlename, setMiddlename] = useState("");
    
    const updatePassengerData = () => {
        const updatedData = {
            name,
            surname,
            document_type,
            document_id,
            birth_date,
            gender,
            middlename
        };
        onPassengerUpdate(index, updatedData);
    };

    const handleChangeDocument = (event) => {
        setDocument(event.target.value);
        updatePassengerData();
    }
    const handleChangeDocumentID = (event) => {
        setDocumentID(event.target.value);
        updatePassengerData();
    }
    const handleChangeBirthDate = (event) => {
        setBirthDate(event.target.value);
        updatePassengerData();
    }
    const handleChangeName = (event) => {
        setName(event.target.value);
        updatePassengerData();
    }
    const handleChangeSurname = (event) => {
        setSurname(event.target.value);
        updatePassengerData();
    }
    const handleChangeGender = (event) => {
        const updatedGender = event.target.value;
        setGender(updatedGender);
        onPassengerUpdate(index, {
            name,
            surname,
            document_type,
            document_id,
            birth_date,
            gender: updatedGender,
            middlename
        });
    };
    
    const handleChangeMiddlename = (event) => {
        setMiddlename(event.target.value);
        updatePassengerData();
    }
    

    return (
        <div className="purchase">
        <div className="main-rectangle-purchase">
            <label className="passenger-purchase">Пассажир</label>

            <div className="surname-purchase">
            <input
            type="text" placeholder="Фамилия" value={surname} onChange={handleChangeSurname}
            />
        </div>

            <div className="name-purchase">
            <input type="text" placeholder="Имя" value={name} onChange={handleChangeName} />
            </div>

            <div className="patronymic-purchase">
            <input type="text" placeholder="Отчество" value={middlename} onChange={handleChangeMiddlename} />
            </div>
            <input className="birth-date-purchase" placeholder="Дата рождения" value={birth_date} type="text" 
            onFocus={(e) => e.target.type = 'date'} onChange={handleChangeBirthDate} />

            <div className="document-purchase">
            <input type="text" placeholder="Документ" value={document_type} onChange={handleChangeDocument} />
            </div>

            <div className="document-id-purchase">
            <input type="text" placeholder="Серия, номер" value={document_id} onChange={handleChangeDocumentID} />
            </div>

            <div className="gender-purchase">
            <select value={gender} onChange={handleChangeGender} style={{ color: gender ? 'black' : 'gray' }}>
                <option disabled selected value="">Пол</option>
                <option value="М">Мужской</option>
                <option value="Ж">Женский</option>
            </select>
            </div>

        </div>
        </div>
    );
        
}