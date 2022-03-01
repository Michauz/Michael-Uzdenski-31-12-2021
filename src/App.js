import './App.css';
import Header from './templates/header';
import Favorites from './templates/favorites';
import Home from './templates/home';
import { BrowserRouter , Link, Route, Routes } from 'react-router-dom'
import  { useState } from 'react';
function App() {
  const [selected, setSelected] = useState(); // selected page
  const [celsius, setCelsius] = useState(true); // sets the celsius or fahrenheit
  var first = ['Tel Aviv-Yafo']; // default favorite list
  const [cityLists, setCityLists] = useState(first); // list of favorites
  const [displayedCity, setDisplayedCity] = useState(); 
  return (
    <BrowserRouter>
      <div>
          <div className="header-container">
              <div className="app-name">
                  Abra Weather Task
              </div>
              <div className="btn-container">
                  <div className={celsius===true ? "btn selected" : "btn"} onClick={()=> { setCelsius(true)}} >
                      Celsius ° C
                  </div>
                  <div className={celsius===false ? "btn selected" : "btn"} onClick={()=> { setCelsius(false)}} >
                      Fahrenheit ° F
                  </div>
              </div>
              <div className="btn-container">
                  <Link to='/templates/home'> 
                    <div className={selected==="home" ? "btn selected" : "btn"} onClick={() => {setSelected('home')}}>
                        Home
                    </div>
                  </Link>
                  <Link to='/templates/favorites'>
                    <div className={selected==="favorites" ? "btn selected" : "btn"} onClick={() => {setSelected('favorites')}}>
                        Favorites
                    </div>
                  </Link>
              </div>
          </div>
          <Routes>
          <Route path="/templates/home" element={<Home celsius={celsius} cityName={displayedCity} cityLists={cityLists} setCityLists={setCityLists} city = {displayedCity} setCity = {setDisplayedCity} setSelected={setSelected}/>}></Route>
            <Route path="/templates/favorites" element={<Favorites celsius={celsius} cityLists={cityLists} setCityLists={setCityLists} displayedCity={displayedCity} setDisplayedCity={setDisplayedCity} selected={selected} setSelected={setSelected} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
