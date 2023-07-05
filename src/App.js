import React, { useEffect, useState } from "react";
import Searchbar from "./components/Search/Searchbar";
import LoopCloud from "./Assets/Cloud.mp4";
import "./Styles/App.css";
import { HiMenuAlt1 } from "react-icons/hi";
import { StyledCard } from "./components/Styled/Components.styled";
import Current from "./components/CurrentWeather/Current";
import { API_KEY } from "./Api/Api";


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherForcast, setWeatherFocast] = useState(null);

  useEffect(() => {
    defaultLoc()
  }, [])
 
const defaultLoc = () => {
   navigator.geolocation.getCurrentPosition((position) => {
    const geoLat = position.coords.latitude
    const geoLon = position.coords.longitude

    const current_city_fetch = fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${geoLat}&longitude=${geoLon}&localityLanguage=en`)
    const current_weather_fetch = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLat}&lon=${geoLon}&appid=${API_KEY}&units=metric`)
    const current_forcast_fetch = `https://api.openweathermap.org/data/2.5/forecast?lat=${geoLat}&lon=${geoLon}&appid=${API_KEY}&units=metric`

    Promise.all([current_city_fetch, current_weather_fetch])
    .then(async (res) => {
      const current_city_res = await res[0].json();
      const current_weather_res = await res[1].json();

      setCurrentWeather({city: current_city_res.locality, ...current_weather_res})
      console.log(current_city_res)

    })
    })
  }


  const searchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const weather_Fetcher = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const forcast_Fetcher = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    Promise.all([weather_Fetcher, forcast_Fetcher])
      .then(async (response) => {
        const weather_Response = await response[0].json();
        const forcast_Response = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weather_Response });
        setWeatherFocast({ city: searchData.label, ...forcast_Response });
      })
      .catch((err) => console.log(err));
  }

  console.log(currentWeather);
  console.log(weatherForcast);

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
          <Searchbar onHandleChange={searchChange} />
        </div>
        <div className="upper-mid">
         {currentWeather && <Current data={currentWeather} />}
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
