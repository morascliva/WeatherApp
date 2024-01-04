import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './style.css';

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    image: '/Images/clouds.jpeg'
  });

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        const apiKey = '7b0ef793cddddc45da4f52238fb86a63';

        const response = await axios.get(apiUrl, {
          params: {
            q: 'germany',
            appid: apiKey,
            units: 'metric'
          }
        });

        console.log(response.data);

        setData({
          celcius: response.data.main.temp,
          name: response.data.name,
          humidity: response.data.main.humidity,
          speed: response.data.wind.speed,
          image: '/Images/clouds.jpeg'
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, []);

  const handleClick = async () => {
    if (name.trim() !== "") {
      try {
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        const apiKey = '7b0ef793cddddc45da4f52238fb86a63';

        const response = await axios.get(apiUrl, {
          params: {
            q: name,
            appid: apiKey,
            units: 'metric'
          }
        });

        let imagePath = '/Images/clouds.jpeg'; // Default image

        switch (response.data.weather[0].main) {
          case 'Clear':
            imagePath = '/Images/clear.jpeg';
            break;
          case 'Rain':
            imagePath = '/Images/rain.jpeg';
            break;
          case 'Drizzle':
            imagePath = '/Images/drizzle.jpeg';
            break;
          case 'Mist':
            imagePath = '/Images/mist.jpeg';
            break;
          // Add more cases as needed

          default:
            imagePath = '/Images/clouds.jpeg';
        }

        console.log(response.data);

        setData({
          celcius: response.data.main.temp,
          name: response.data.name,
          humidity: response.data.main.humidity,
          speed: response.data.wind.speed,
          image: imagePath
        });
        setError('');
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("City not found");
        } else {
          setError("An error occurred. Please try again.");
        }
        console.error(err);
      }
    }
  };

  return (
    <div className='container'>
      <div className='weather'>
        <div className='search'>
          <input
            type='text'
            placeholder='Enter City Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className='button'>
            <img className='image' src='/Images/search.png' onClick={handleClick} alt='' />
          </button>
        </div>
        <div className='error'>
          <p>{error}</p>
        </div>
        <div className='winfo'>
          <img className='icon' src={data.image} alt='' />
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className='details'>
            <div className='col'>
              <img src='/Images/humidity.jpeg' alt='' />
              <div className='humidity'>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className='col'>
              <img src={data.image} alt='' />
              <div className='wind'>
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
