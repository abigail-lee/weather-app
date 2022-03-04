import React from 'react';
import './WeatherCards.css';
import './css/weather-icons.min.css';

class WeatherCard extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			active: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(day){
		this.setState({
			active: true
		});
		this.props.onChange(day.toLowerCase());
	}

	render(){
		const forecast = this.props.forecast;
		console.log(forecast);
		if (forecast.length == 0) {
			return null;
		} else {
			return (
				<div className="weather-card-container">
					{ forecast.map((day) => {
						const dayOfWeek = this.props.type == 'week' ? new Date(day.dt * 1000).toLocaleDateString("en-US", {weekday:"long"}).slice(0,3) : day.time;

						return (
							<div className="weather-card" key={day.dt} data-active={this.state.active}>
								<span className="weather-card--day">{dayOfWeek}</span>
								<span className="weather-card--img"><i className={`wi wi-owm-${day.weather[0].id}`}></i></span>
								<div className="weather-card--temps">
									{ this.props.type == 'week' ?
										(<><span className="weather-card--temps__high">{day.temp.max.toFixed(0)}</span>
										<span className="weather-card--temps__low">{day.temp.min.toFixed(0)}</span></>) :
										(<span className="weather-card--temps__high">{day.temp.toFixed(0)}</span>)
									}
								</div>
							</div>
						)
					}) }
				</div>
			)
		}
	}
}

export default WeatherCard;