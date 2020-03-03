import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from "./app_component/weather.component";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "./app_component/form.component";

//api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key="f9ea53184161994e54ce0fa644b25ed5";

class App extends React.Component {
  constructor(){
    super();
    this.state={
      city : undefined,
      country:undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    
  }

  calCelsius(temp) {
    let cell = Math.floor(temp-273.15);
    return cell;
  }

  getWeather = async(e)=>{

    e.preventDefault();

    const city= e.target.elements.city.value;
    const country= e.target.elements.country.value;

    if(city && country){

      const api_call= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
      const response=await api_call.json();
      console.log(response);
      this.setState({
          city: `${response.name},${response.sys.country}`, 
          celsius: this.calCelsius(response.main.temp),
          temp_max: this.calCelsius(response.main.temp_max),
          temp_min: this.calCelsius(response.main.temp_min),
          description: response.weather[0].description,
          error: false
      });
    }
    else{
      this.setState({error:true});
    }
    
  };

  render() {
    return(
      <div className="App">
      <Form loadweather={this.getWeather} error={this.state.error}/>
      <Weather
        city={this.state.city}
        country={this.state.country}
        temp_celsius = {this.state.celsius}
        temp_max = {this.state.temp_max}
        temp_min = {this.state.temp_min}
        description = {this.state.description}
      />
      </div>
    );
  }
}


export default App;
