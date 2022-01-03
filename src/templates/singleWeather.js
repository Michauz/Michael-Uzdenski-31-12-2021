import  { useState } from 'react'
import './style/style-singleWeather.css';
import {  Link, Route, Routes } from 'react-router-dom'
import Home from './home';
//a single city
function SingleWeather( {cityName,celsius,setCityLists,cityList,displayedCity,setDisplayedCity, selected,setSelected,displayGrid } ) {
    const apiKey = "e1b7301772ff4827a0f75502212912";
    const [city, setCity] = useState(null); // sets the city
    const [country, setCountry] = useState(null); // sets the country
    const [temp_c, setTemp_c] = useState(null); // set the temperture in celsius of the chosen city
    const [temp_f, setTemp_f] = useState(null); // set the temperture in fahrenheite of the chosen city
    const [condition, setCondition] = useState(null); // sets the city weather condition
    const [img, setImg] = useState(null); // sets the image to display
    // changes the displayed view in case home button is clicked
    function changeHomeScreen(){
        setDisplayedCity(city);
        setSelected('home');
    }
    // updates the city list in case the delete button is pressed
    function updateCityList(){
        if (cityList.includes(cityName)){
            setCityLists(cityList.filter(item => item !== cityName));
          }
    }
    // fetches the current weather of the city
    async function fetchWeather(city) {
        try {
            fetch('https://api.weatherapi.com/v1/current.json?key='+apiKey+'&q='+city+'&aqi=no')
            .then(res => res.json())
            .then(
                (result) => {
                    setCity(result['location']['name']);
                    setCountry(result['location']['country']);
                    setTemp_c(result['current']['temp_c']);
                    setTemp_f(result['current']['temp_f']);
                    setCondition(result['current']['condition']['text']);
                    setImg(result['current']['condition']['icon']);
                },
                (error) => {
                    console.log(error);
                    return;
                }
            )
            } catch(err)  {
                console.log("err");
              }
    }
    fetchWeather(cityName);
    return (
        <div className={displayGrid===true ? 'single-weather-favorites-grid': 'single-weather-favorites' }>
            <div className='cross-sign' onClick={updateCityList}></div>            
            <Link to='/templates/home' className="top-text" onClick={changeHomeScreen}>
                <div className='city-name-favorites'>
                    {city}
                </div>
                <div>
                    {country}
                </div>
                <div>
                    {celsius===true ? temp_c + " ° C" : temp_f + " ° F"}
                </div>
            </Link>
            <div>
                <div className='bottom-text-favorites'>
                    <img alt="" src={img} /> 
                    <div>{condition}</div>
                </div>
            </div>
        <Routes>
          <Route path="/templates/home" element={<Home celsius={celsius} cityName={city} cityLists={cityList} setCityLists={setCityLists} city = {displayedCity} setCity = {setDisplayedCity}/>}></Route>
        </Routes>
        </div>
    )

}

export default SingleWeather;
