import React, { Component, useEffect } from 'react';
import .env;

const Weather = () =>{
    //residence
    const [weatherApiData, setWeatherApiData] = useResidence({});
    const [getResidence, setGetResidence] = useResidence('Dublin','ie');
    const [residenceName,setResidenceName] = useResidence('Dublin','ie');

    //weather api key and url
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const weatherApiUrl = 'api.openweathermap.org/data/2.5/weather?q={residenceName}&appid={weatherApiKey}&units=metric';

    //boolean variable to see if there are any errors
    let isErrorTrue = false;

    
    useEffect(()=>{
        try{
            fetch(weatherApiUrl)
            .then((res) => res.json())
            .then((data) => setWeatherApiData(data));
        }catch (e) {
        console.log(e.message);
        isErrorTrue = true;
        }
        },[weatherApiUrl]);

    //these are necessary if we will actually implement typing the city otherwise it should do Dublin for now and we can make it take input 
    //from somewhere else later, as I am not sure how to do this 
    try{
        const inputHandler = (event) =>{
           setGetResidence(event.target.value);
        };
    }catch (e) {
    console.log(e.message);
    isErrorTrue = true;
    }

    try{
        const submitHandler = () => {
            setResidenceName(getResidence);
        };
    }catch (e) {
    console.log(e.message);
    isErrorTrue = true;
    }

    //the result is returned in kelvin so we change it to celsius (cause we are using human measurements P.S. just a joke)
    try{
        const kelvinToCelcius = (temp) =>{
            return (temp - 273.15).toFixed(2);
        }
    }catch (e) {
    console.log(e.message);
    isErrorTrue = true;
    }
    
    if(isErrorTrue == false){
        return(
            <div>
                <header className="d-flex justify-content-center align-items-center">
                    <h2>Curent Weather Forecast</h2>
                </header>

                <div className="card mt-3 mx-auto" style={{ width: '60vw' }}>
                    {weatherApiData.main ?(
                        <div class="card-body text-center">
                            //displaying  icon of the weather  e.g. if it's sunny it will display sun and etc.
                            <img
                                src={'http://openweathermap.org/img/w/${weatherApiData.weather[0].icon}.png'}
                                alt="weather status icon"
                                className="weather-icon"
                            />

                            //will display main temperature
                            <p className="h2">
                                {kelvinToCelcius(weatherApiData.main.temp)}&deg; C
                            </p>

                            //should display the name of the city
                            <p className="h5">
                                <i className="fas fa-map-marker-alt"></i>{' '}
                                <strong>{weatherApiData.name}</strong>
                            </p>

                            <div className="row mt-4">
                                <div className="col-md-6">
                                //displaying minimum degree
                                <p>
                                    <i class="fas fa-temperature-low "></i>{' '}
                                    <strong>
                                        {kelvinToCelcius(weatherApiData.main.temp_min)}&deg; C
                                    </strong>
                                </p>
                                //displaying maximum degree
                                <p>
                                    <i className="fas fa-temperature-high"></i>{' '}
                                    <strong>
                                        {kelvinToCelcius(weatherApiData.main.temp_max)}&deg; C
                                    </strong>
                                </p>
                            </div>

                            <div className="col-md-6">
                                //should display if it's cloudy or sunny in text
                                <p>
                                    {' '}
                                    <strong>{weatherApiData.weather[0].main}</strong>
                                </p>
                                //will display the country 
                                <p>
                                    <strong>
                                        {' '}
                                        {countries.getName(weatherApiData.sys.country, 'en', {
                                            select: 'official',
                                        })}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1>Loading</h1>
                )}
            </div>
        </div>
        );
    }
    else if(isErrorTrue == true){
        return(
            <div>
                <header className="d-flex justify-content-center align-items-center">
                    <h2>It seems like program has run into some kind of problem</h2>
                </header>

                <div className="card mt-3 mx-auto" style={{ width: '60vw' }}>
                    <img class="weather-error" 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHY0eumS7k-hWh4jTbrCRpuY8DQsZbO-UGrQ&usqp=CAU" 
                    alt="error image icon"/>
                </div>
            </div>
        );
    }
}

export default Weather;