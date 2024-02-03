import React, { useState, useEffect } from "react";
import "./MyOrders.css";
import { ApiService } from "../../../services/ApiService";
import { MyOrderItem } from "../MyOrderItem/MyOrederItem";

export function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  
  useEffect(() => {
    (async () => {
      const data = await ApiService("order/", {
        method: "GET",
        headers: {}
      });
      console.log(data);
      setMyOrders(
        data.map((order, index) => <MyOrderItem key={index + 1} order={order}/> )
      );
    })();
  }, []);
  
  return (
    <div>
      <div className="my-passengers"> Мои поездки</div>
      <div className="info-passenger">
      { myOrders }
      </div>
    </div>
  );

  
}
