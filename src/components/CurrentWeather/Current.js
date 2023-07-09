import React from "react";
import "./Current.css";

const Current = ({ data }) => {
  return (
    <div className="current-weather">
      <h3>{data.city} </h3>
      <h1 className="celsius">{`${Math.round(data.main.temp)}°C`}</h1>
      <h4>{data.weather[0].description}</h4>
      <p>{`H:${data.main.humidity}`}  {`L:${Math.round(data.main.feels_like)}`}</p>
    </div>
  );
};

export default Current;
   