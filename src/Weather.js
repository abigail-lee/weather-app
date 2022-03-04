import React from 'react';
import WeatherCard from './WeatherCards';
import HourlyWeather from './Hourly';

const forecast = [
	{day: "Monday", high:70, low:44, condition: "wi wi-cloudy" },
	{day: "Tuesday", high:60, low:54, condition: "wi wi-day-sunny"},
	{day: "Wednesday", high:50, low:44, condition: "wi wi-thunderstorm" },
	{day: "Thursday", high:45, low:34, condition: "wi wi-windy"}
];
const hourly = [
	{ day: "monday", temps: [ 
		{day: "9AM", high:70, low:44, condition: "wi wi-cloudy" },
		{day: "12PM", high:60, low:54, condition: "wi wi-day-sunny"},
		{day: "3PM", high:50, low:44, condition: "wi wi-thunderstorm" },
		{day: "6PM", high:45, low:34, condition: "wi wi-windy"},
		{day: "9PM", high:80, low:64, condition: "wi wi-day-cloudy"}
	] },
	{ day: "tuesday", temps: [ 
		{day: "9AM", high:80, low:66, condition: "wi wi-cloudy" },
		{day: "12PM", high:64, low:54, condition: "wi wi-day-sunny"},
		{day: "3PM", high:33, low:24, condition: "wi wi-thunderstorm" },
		{day: "6PM", high:50, low:44, condition: "wi wi-windy"},
		{day: "9PM", high:52, low:30, condition: "wi wi-day-cloudy"}
	] },
	{ day: "Wednesday", temps: [ 
		{day: "9AM", high:80, low:66, condition: "wi wi-cloudy" },
		{day: "12PM", high:64, low:54, condition: "wi wi-day-sunny"},
		{day: "3PM", high:33, low:24, condition: "wi wi-thunderstorm" },
		{day: "6PM", high:50, low:44, condition: "wi wi-windy"},
		{day: "9PM", high:52, low:30, condition: "wi wi-day-cloudy"}
	] },
	{ day: "thursday", temps: [ 
		{day: "9AM", high:80, low:66, condition: "wi wi-cloudy" },
		{day: "12PM", high:64, low:54, condition: "wi wi-day-sunny"},
		{day: "3PM", high:33, low:24, condition: "wi wi-thunderstorm" },
		{day: "6PM", high:50, low:44, condition: "wi wi-windy"},
		{day: "9PM", high:52, low:30, condition: "wi wi-day-cloudy"}
	] }
];
const API = "6d9ddd3e3109a9c2633258e92127007b";

class Weather extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			error: null,
			day: 'tuesday',
			daily: [],
			hourly: []
		}

		this.makeAPICall = this.makeAPICall.bind(this);
	}

	makeAPICall(){
		fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.props.location.lat}&lon=${this.props.location.lon}&exclude=alerts,minutely&units=imperial&appid=${API}`)
			.then((res) => res.json())
			.then((result) => {
				this.setState({
					daily: result.daily.slice(0,5),
					hourly: result.hourly,
					error: null
				});
				console.log(this.state);
			},
			(error) => {
				this.setState({error})
			});
	}

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.makeAPICall();
		}
	}

	render(){
		const location = this.props.location;
		const error = this.state.error;

		if (error) {
			return (<div>Error handling this.</div>)
		} else if (this.state.daily.length == 0) { 
			return (<h2>Select a location</h2>)
		} else {
			return (
				<div className="weather-component-container">
					<h2>{location.length == 0 ? "Select a location" : "5-Day Forecast in " +  `${location.name}, ${location.state}`}</h2>
					<WeatherCard type="week" forecast={this.state.daily} />
					<HourlyWeather day={`${location.name}, ${location.state}`} forecast={this.state.hourly} />
				</div>
			)
		}
	}
}

export default Weather;