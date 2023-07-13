import React from "react";
import './dayForcast.css'
import ForcastCard from "../ForcastHCards/ForcastCard";

const DaysForcast = ({data}) => {

  return (
    <div className="forcast-cont"> 
    <h5 className="week">Daily forcast of the week</h5>
    {data && <ForcastCard fetchForcast={data}/> }
  </div>
  );
};

export default DaysForcast;
