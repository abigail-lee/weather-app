import React from 'react';
import './App.css';
import Weather from './Weather';
import Location from './Location';

const API = "6d9ddd3e3109a9c2633258e92127007b";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      state: "",
      zipCode: "",
      result: [],
      selection: {},
      scrollDisabled: false,
      error: null
    };

    this.receiveLocation = this.receiveLocation.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.sendSelection = this.sendSelection.bind(this);
    this.scrollSection = this.scrollSection.bind(this);
  }

  receiveLocation(lat){
    console.log("words");
  }

  handleForm(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendForm(e){
    e.preventDefault();

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.state.city},${this.state.state},USA&limit=5&appid=${API}`)
      .then(res => res.json())
      .then((result) => {
          this.setState({result: result});
        },
        (error) => { this.setState({error}) }
      )
    
    return false
  }

  sendSelection(e, bloop){
    let parent = e.target.parentElement.parentElement;

    parent.querySelectorAll(".active").forEach(x => {
      x.classList.remove("active");
    });

    e.target.classList.add("active");

    this.setState({
      selection: bloop
    });

    setTimeout(function(){
      document.querySelector("main").scrollIntoView({behavior:'smooth'})
    }, 250);
  }

  componentDidUpdate(prevState){
    if (this.state.scrollDisabled !== prevState.scrollDisabled) {
      if (this.state.scrollDisabled) {
        document.body.style.overflow = "hidden";
      } else if (!this.state.scrollDisabled) {
        document.body.style = null;
      }
    }
  }

  scrollSection(){
    document.querySelector("section").scrollIntoView({behavior:'smooth'});

    this.setState({scrollDisabled: true});
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>My Weather App</h1>
          <h3>See your weather in real-time</h3>
          <button id="app-intro" onClick={this.scrollSection}>Scroll for more</button>
        </header>
        <section>
          <span className="weather-location--eyebrow">Location</span>
          <Location sendForm={this.sendForm} handleForm={this.handleForm} results={this.state.result} sendSelection={this.sendSelection} />
        </section>
        <main>
          <span className="weather-cards--eyebrow">Weather</span>
          <Weather location={this.state.selection} />
        </main>
      </div>
    );
  }
}

export default App;
