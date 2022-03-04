import './LocationResults.css';

const locationResults = (props) => {
	var results = props.results;

	return (
		<div className="weather-location-result-container">
			<h3>Did you mean...</h3>
			<div className="weather-location-results">
				{
					results.length == 0 ? (<span>No results found</span>) : results.map((result) => {
						return (
						<>
							<div className="weather-location-results--entry" key={`result_${Math.round(result.lat)}`}>
								<span className="weather-location-results--entry__option" onClick={(e) => props.sendSelection(e,result)}>{result.name}, {result.state}, {result.country}</span>
							</div>
						</>
						)
					})
				}
			</div>
		</div>
	)
}

export default locationResults;