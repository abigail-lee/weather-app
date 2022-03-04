import './LocationForm.css';

function LocationForm(props) {
	
	return (
		<div className="weather-location-selection">
			<div className="weather-location-input-container">
				<form onSubmit={props.onSubmit}>
					<div className="weather-location--input__city-state">
						<label htmlFor="weather-location--input__city">City</label>
						<input name="city" onChange={props.handleForm} className="weather-location--input" id="weather-location--input__city" type="text" placeholder="City" />

						<label htmlFor="weather-location--input__state">State Abbreviation</label>
						<input name="state" maxLength="2" onChange={(e) => props.handleForm} className="weather-location--input" id="weather-location--input__state" type="text" placeholder="State" />
					</div>
					<span>OR</span>
					<div className="weather-location--input__zip-code">
						<label htmlFor="weather-location--input__zip">Zip Code</label>
						<input name="zipCode" onChange={(e) => props.handleForm} className="weather-location--input" id="weather-location--input__zip" type="text" placeholder="Zip Code" />
					</div>

					<div className="weather-location--input__button">
						<button id="sub" type="submit">Search</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LocationForm;