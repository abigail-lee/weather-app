import LocationForm from './LocationForm';
import LocationResults from './LocationResults';

const Location = (props) => {
	return (
		<>
			<div className="weather-location-container">
				<h2>Whose weather do you want to check?</h2>
				<LocationForm handleForm={props.handleForm} onSubmit={props.sendForm} />
			</div>
			<LocationResults sendSelection={(e, result) => props.sendSelection(e,result)} results={props.results} />
		</>
	)
}

export default Location;