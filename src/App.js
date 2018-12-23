import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route } from "react-router-dom";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import Switch from "react-router/es/Switch";
import About from "./About";
import Home from "./Home";
import Results from "./Results";
import SearchParams from "./SearchParams";
import "./style.css";

const petfinder = pf({
  key: "399c00db48112a3e614605a5172ee524",
  secret: "6a33d390cffccd2126c1850231b28eb4"
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };
  handleAnimalChange = event => {
    this.setState({ animal: event.target.value, breed: "" }, this.getBreeds);
  };
  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };
  getBreeds() {
    if (!this.state.animal) return this.setState({ breeds: [] });

    petfinder.breed.list({ animal: this.state.animal }).then(data => {
      if (
        data.petfinder &&
        data.petfinder.breeds &&
        Array.isArray(data.petfinder.breeds.breed)
      ) {
        this.setState({ breeds: data.petfinder.breeds.breed });
      } else {
        this.setState({ breeds: [] });
      }
    });
  }

  render() {
    return (
      <>
        <h1>Adopt me!</h1>
        <Provider value={this.state}>
          <BrowserRouter>
            <div>
              <nav>
                <Link to="/">Home</Link>
                <br />
                <Link to="/search-params">Search</Link>
                <br />
                <Link to="/pets">Pets</Link>
                <br />
                <Link to="/about">About</Link>
                <br />
                <hr />
              </nav>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/pets" component={Results} />
                <Route path="/about" component={About} />
                <Route path="/search-params" component={SearchParams} />
                <Route component={Home} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
