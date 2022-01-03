import WeatherList from './weatherList';
import  { useState,useEffect } from 'react';
function Favorites({celsius,cityLists,setCityLists,displayedCity,setDisplayedCity, selected,setSelected}) {
    const [displayGrid, setDisplayGrid] = useState(false); //set the list/grid view
    // set the selected view to favorites 
    useEffect(()=>{
      setSelected('favorites');
    },[]);
    return (
        <div>
          <div className='text-center'>
          <div className='grid-list-container'>
            <div onClick={() => setDisplayGrid(true)} className={displayGrid===true ? "grid-list selected" : "grid-list" } >
              <img alt="" src= {require('../img/menu.png')}></img>
            </div>
            <div onClick={() => setDisplayGrid(false)} className={displayGrid===false ? "grid-list selected" : "grid-list" }>
            <img alt="" src= {require('../img/list.png')}></img>
            </div>
          </div>
          </div>
          <WeatherList setCityLists={setCityLists} cityList = {cityLists} celsius={celsius} displayedCity={displayedCity} setDisplayedCity={setDisplayedCity} selected={selected} setSelected={setSelected} displayGrid={displayGrid} />
        </div>
    );
}
export default Favorites;