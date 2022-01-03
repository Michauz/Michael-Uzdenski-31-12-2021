
import SingleWeather from './singleWeather'
import './style/style-weatherList.css';
// the list of favorite cities
function WeatherList({cityList,celsius,setCityLists,displayedCity,setDisplayedCity, selected,setSelected, displayGrid} ) {
    return ( 
        <div className='weather-list'>
            {cityList.map((cityName,index) => <SingleWeather setCityLists={setCityLists} cityList={cityList} key={index} cityName={cityName} celsius={celsius} displayedCity={displayedCity} setDisplayedCity={setDisplayedCity} selected={selected} setSelected={setSelected} displayGrid={displayGrid} />)}
        </div>
    )
}

export default WeatherList
