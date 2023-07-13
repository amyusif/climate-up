import React, { useEffect, useState } from "react";
import Searchbar from "./components/Search/Searchbar";
import LoopCloud from "./Assets/Cloud.mp4";
import "./Styles/App.css";
import { HiMenuAlt1 } from "react-icons/hi";
import {
  StyledCard,
  VideoBG,
  Wrapper,
  AppUI
} from "./components/Styled/Global_Styles/Components.styled";
import Current from "./components/CurrentWeather/Current";
import { API_KEY, weather_Api, forcast_Api, big_Data_Api } from "./Api/Api";
import HourForcast from "./components/HourForcast/HourForcast";
import DaysForcast from "./components/DaysForcast/DaysForcast";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherForcast, setWeatherFocast] = useState(null);

  useEffect(() => {
    defaultLoc();
  }, []);

  const defaultLoc = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const geoLat = position.coords.latitude;
      const geoLon = position.coords.longitude;

      const current_city_fetch = fetch(
        `${big_Data_Api}?latitude=${geoLat}&longitude=${geoLon}&localityLanguage=en`
      );
      const current_weather_fetch = fetch(
        `${weather_Api}?lat=${geoLat}&lon=${geoLon}&appid=${API_KEY}&units=metric`
      );
      const current_forcast_fetch = fetch(
        `${forcast_Api}?lat=${geoLat}&lon=${geoLon}&appid=${API_KEY}&units=metric`
      );

      Promise.all([
        current_city_fetch,
        current_weather_fetch,
        current_forcast_fetch,
      ]).then(async (res) => {
        const current_city_res = await res[0].json();
        const current_weather_res = await res[1].json();
        const current_forcast_res = await res[2].json();

        const newForcastList = current_forcast_res.list.map((item) => {
          const [date, time] = item.dt_txt.split(" ");
          const [hours, minutes, secs] = time.split(":");
          const _12hour = hours >= 12 ? `${hours % 12}pm` : `${hours}am`;

          return {
            time: _12hour,
            ...item,
          };
        });

        console.log(newForcastList);

        const [district, muni] = current_city_res.locality.split(" ");

        setCurrentWeather({
          city: district + " " + muni,
          ...current_weather_res,
        });
        setWeatherFocast(newForcastList);
      });
    });
  };

  const searchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const weather_Fetcher = fetch(
      `${weather_Api}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const forcast_Fetcher = fetch(
      `${forcast_Api}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    Promise.all([weather_Fetcher, forcast_Fetcher])
      .then(async (response) => {
        const weather_Response = await response[0].json();
        const forcast_Response = await response[1].json();

        const newForcaster = forcast_Response.list.map((item) => {
          const [date, time] = item.dt_txt.split(" ");
          const [hours, minutes, secs] = time.split(":");
          const _12hour = hours >= 12 ? `${hours % 12}pm` : `${hours}am`;

          return {
            time: _12hour,
            ...item,
          };
        });

        setCurrentWeather({
          city: searchData.label,
          ...weather_Response,
        });
        setWeatherFocast(newForcaster);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <VideoBG autoPlay muted loop>
        <source src={LoopCloud} type="video/mp4" />
      </VideoBG>
      <AppUI>
        <div className="top">
          <div className="icon">
            <HiMenuAlt1 className="icon" />
          </div>
          <Searchbar onHandleChange={searchChange} />
        </div>
        {currentWeather && <Current data={currentWeather} />}
        <StyledCard>
          {weatherForcast && <HourForcast data={weatherForcast} />}
        </StyledCard>
          <StyledCard>
            {weatherForcast && <DaysForcast data={weatherForcast} />}
          </StyledCard>
      </AppUI>
    </Wrapper>
  );
};

export default App;
