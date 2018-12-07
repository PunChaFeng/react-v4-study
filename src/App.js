import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Switch from "react-router/es/Switch";
import About from "./About";
import Home from "./Home";
import Results from "./Results";
import "./style.css";

class App extends React.Component {
  render() {
    return (
      <>
        <h1>Adopt me!</h1>
        <BrowserRouter>
          <div>
            <nav>
              <Link to="/">Home</Link>
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
              <Route component={Home} />
            </Switch>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
