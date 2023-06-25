import React, { useState } from "react";
import Searchbar from "./components/Search/Searchbar";
import LoopCloud from "./Assets/Cloud.mp4";
import "./Styles/App.css";
import { HiMenuAlt1 } from "react-icons/hi";
import { StyledCard } from "./components/Styled/Components.styled";
import Current from "./components/CurrentWeather/Current";

function App() {

  

  const searchChange = (searchData) => {
    console.log(searchData);
  }
  return (
    <div className="container">
      <video autoPlay muted loop>
        <source src={LoopCloud} type="video/mp4" />
      </video>
      <div className="ui-container">
        <div className="top">
          <div className="icon">
            <HiMenuAlt1 className="icon" />
          </div>
          <Searchbar onHandleChange={searchChange}/>
        </div>
        <div className="upper-mid">
        <Current />
        </div>
        <div className="mid">
          <StyledCard />
        </div>
        <div className="bot">
          <StyledCard />
        </div>
      </div>
    </div>
  );
}

export default App;
