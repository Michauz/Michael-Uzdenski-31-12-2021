import  { useState,useEffect } from 'react';
import './style/style-home.css';

function Home({celsius,cityName,cityLists,setCityLists,city,setCity,setSelected}) {
    var tempArr = []; //this is array helps me set data from api
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; //this array helps set the dates on each day view
    const [country, setCountry] = useState(); // set the country of the chosen city
    const [maxtemp_c, setMaxtemp_c] = useState(); // set the max temperture in celcius of the chosen city
    const [maxtemp_f, setMaxtemp_f] = useState(); // set the max temperture in fahrenheite of the chosen city
    const [mintemp_c, setMintemp_c] = useState(); // set the min temperture in celcius of the chosen city
    const [mintemp_f, setMintemp_f] = useState(); // set the min temperture in fahrenheite of the chosen city
    const [forcast, setForcast] = useState([]); // array for the forcast of the next few days
    const [errorMsg, setErrorMsg] = useState(false);  // sets the view of the error message 
    const [serachResult, setSerachResult] = useState([]); // array for the search results
    const [favoriteBtn, setFavoriteBtn] = useState(cityLists.includes(city)); // favorites indicator
    const apiKey = "e1b7301772ff4827a0f75502212912";
    const apikeyTwo = 'dpMwVJbZPksI4zB2o1Av3H2LZ7hFpTWw'
    // this useEffect sets the selected window and 
    // sets the default city to tel aviv unless says otherwise
    useEffect(()=>{
        setSelected('home');
        if (cityName !== undefined){
            setCity(cityName);
            chooseCity(city);
        }
        else{
            chooseCity('Tel Aviv-Yafo');
        }
    },[]);
    // updates the city forecast if the input is valid
    function updateCity(){
        if(serachResult.length===0){
            setErrorMsg(true);
            document.getElementById('inputToList').value = "";
            return;
        }
        else{
            chooseCity(serachResult[0]);
            document.getElementById('inputToList').value = serachResult[0];
            setSerachResult([]);
        } 
    }
    // function that fetches data from the api and updates the view
    // handles errors
    function chooseCity(city){
        try {
            fetch('https://api.weatherapi.com/v1/forecast.json?key='+apiKey+'&days=5&q='+city+'&aqi=no')
            .then(res => res.json())
            .then(
                (result) => {
                    tempArr = [];
                    var forecastday = result['forecast']['forecastday'];
                    setCity(result['location']['name']);
                    setCountry(result['location']['country']);
                    setMaxtemp_c(forecastday[0]['day']['maxtemp_c']);
                    setMintemp_c(forecastday[0]['day']['mintemp_c']);
                    setMaxtemp_f(forecastday[0]['day']['maxtemp_f']);
                    setMintemp_f(forecastday[0]['day']['mintemp_c']);
                    forecastday.map((single,index)=>{
                        tempArr.push([single.date,single.day.avgtemp_c,single.day.avgtemp_f,single.day.condition.icon,single.day.condition.text]);
                        return;
                    })

                    setForcast(tempArr);
                    if (cityLists.includes(city)){
                        setFavoriteBtn(true);
                    }
                    else{
                        setFavoriteBtn(false);
                    }
                },
                (error) => {
                    console.log(error);
                    console.log("err");
                    return;
                }
            )
            } catch(err)  {
                console.log("err");
            }
    }
    // fetches data for the search results
    function autoSearch(word){
        try {
            fetch('https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey='+apikeyTwo+'&q='+word)
            .then(res => res.json())
            .then(
                (result) => {
                    tempArr = [];
                    result.map((single,index)=>{
                        if (index<5){
                            tempArr.push(single.LocalizedName);
                        }
                    })
                    setSerachResult(tempArr);
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
    // sets the favorites array
    function addToFavorites(){
        if (!cityLists.includes(city)){
            setFavoriteBtn(true);
            setCityLists([...cityLists,city]);
        }
        else{
            setFavoriteBtn(false);
            setCityLists(cityLists.filter(item => item !== city));
        }
    }
    // sets calls the function that sets the results array
    function inputLetters(e){
        e.preventDefault();
        let value = e.target.value;
        value = value.replace(/[^A-Za-z]/ig, '')
        e.target.value=value;
        if (value.length>=2){
            autoSearch(value);
            setErrorMsg(false);
        }
    }
    // changes views of clicked city
    function clickRes(e){
        let value = e.target.innerHTML;
        document.getElementById('inputToList').value = value;
        setSerachResult([]);
        chooseCity(value);
    }
    return (
        <div>
            <div className='search-container'>
                {errorMsg===true ? (<div className="error-field">City doesen't exists!</div>):(<div></div>)}
                <input id="inputToList" onChange={(e)=>{inputLetters(e)}}></input>
                <button className="search-btn" onClick={updateCity} >Search</button>
                <div className="search-result">
                {serachResult.map((res,index)=>{ // maps the search results
                    return(<div onClick={(e)=>{clickRes(e)}} key={index} className="res">{res}</div>)
                    })}
                </div>
            </div>
            <div className='weather-container'>
            <div className='top-menuInfo'>
                <div>
                    <h2 className='city-name-home' >{city}</h2>
                    <h2 className='country-name-home' >{country}</h2>
                    {celsius===true ? ( //sets the celsius or fahrenheit view
                        <div>
                            <h3 className='temp-high-home' >H: {maxtemp_c} ° C</h3>
                            <h3 className='temp-low-home' >L: {mintemp_c} ° C</h3>
                        </div>) : (
                        <div>
                            <h3 className='temp-high-home' >H: {maxtemp_f} ° F</h3>
                            <h3 className='temp-low-home' >L: {mintemp_f} ° F</h3>
                        </div>)}
                </div>
                    {favoriteBtn===true ? (
                        <div className='favorite-btn' onClick={addToFavorites}>
                            <div className='heart'></div>
                            <div className='add-favorites' >Remove from Favorites</div>
                        </div>
                    ) : (
                        <div className='favorite-btn' onClick={addToFavorites}>
                            <div className='heartWhite'></div>
                            <div className='add-favorites' >Add to Favorites</div>
                        </div>
                    )}

            </div>
            <div className='multiply-weather' >
                {forcast.map((single,index)=>{ //maps the 5 days forecast
                return(
                    <div key={index} className='single-weather'>
                        <div className="top-text">
                            <div>
                                {index===0 ? <div className='bold-today'>{ days[(new Date(single[0])).getDay()]} </div> : <div>{ days[(new Date(single[0])).getDay()]} </div>}
                                <div>{ single[0]} </div>
                                
                            </div>
                        </div>
                        <div>
                            <div className='bottom-text'>
                                <img src={single[3]} alt="" />
                                <div>{single[4]}</div>
                            </div>
                            <div className='temp-home-number'>
                                {celsius===true ? single[1] + " ° C" : single[2] + " ° F"}
                            </div>
                        </div>
                    </div>
                )})}
           </div>
           </div>
        </div>
    )
}

export default Home
