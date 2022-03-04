import React from 'react';
import WeatherCard from './WeatherCards';



class HourlyWeather extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false
		}

		this.getDailyForecast = this.getDailyForecast.bind(this);
	}

	titlecase(phrase){
		let arr = phrase.split(" "),
		arr2 = [];

		arr.forEach(word => {
			let firstLetter = word.slice(0,1).toUpperCase();

			arr2.push(firstLetter + word.substring(1));
		})

		return arr2.join(" ");
	}

	getDailyForecast(){
		let arr = this.props.forecast.slice();

		arr.forEach(x => {
			x.time = new Date(x.dt * 1000).toLocaleTimeString("en-US").replace(":00:00", "");
		});

		return arr.slice(0,12);
	}

	render(){
		const day = this.props.day;

		return (
			<div className="hourly-card-container">
				<h3>Next 12 hours in {this.props.day}</h3>
				<WeatherCard forecast={this.getDailyForecast()} />
			</div>
		)
	}
}

export default HourlyWeather;