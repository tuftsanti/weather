// import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import Weather from './components/Weather'
import { Dimmer, Loader} from 'semantic-ui-react'

export default function  App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    // console.log("Latitude: ", lat)
    // console.log("Longitude: ", long)
    fetchData();
  }, [lat, long])
  // console.log("Latitude: ", lat)
  // console.log("Longitude: ", long)
  // console.log(`typeof data.main: ${typeof data.main}`)
  // console.log(`data.main: ${data.main}`)
  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (<Weather weatherData={data}/>) 
        : (<div>
            <Dimmer active>
              <Loader>Loading...</Loader>
            </Dimmer>
        </div>)}
    </div>
  );
}
