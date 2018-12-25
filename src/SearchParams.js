import React from "react";
import { SearchBox } from "./SearchBox";
import { Redirect } from "react-router";

export default class SearchParams extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToHome: false };
  }
  handleSearchSubmit = () => {
    this.setState({ redirectToHome: true });
  };
  render() {
    return this.state.redirectToHome ? (
      <Redirect to="/" push={true} />
    ) : (
      <div className="search-route">
        <SearchBox search={this.handleSearchSubmit} />
      </div>
    );
  }
}
