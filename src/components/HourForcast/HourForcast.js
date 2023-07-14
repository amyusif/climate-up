import React from "react";
import "./Hour.css";
import LineForcast from "../Line/Line";

const HourForcast = ({ data }) => {

  return (
    <div className="hour">
    <h5>Hourly Forcast of the day</h5>
     {data && <LineForcast dataFetch={data} />} 
    </div>
  );
};

export default HourForcast;
