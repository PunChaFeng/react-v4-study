import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

export class SearchBox extends React.Component {
  render() {
    return (
      <Consumer>
        {context => (
          <div className="search-params">
            <label htmlFor="location">Location:</label>
            <input
              id="location"
              value={context.location}
              placeholder="Location..."
              onChange={context.handleLocationChange}
            />
            <label htmlFor="animal">Animal</label>
            <select
              id="animal"
              value={context.animal}
              onChange={context.handleAnimalChange}
              onBlur={context.handleAnimalChange}
            >
              <option />
              {ANIMALS.map(animal => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ))}
            </select>
            <label htmlFor="breed">Breed</label>
            <select
              id="breed"
              value={context.breed}
              onChange={context.handleBreedChange}
              onBlur={context.handleBreedChange}
              disabled={!context.breeds.length}
            >
              <option />
              {context.breeds.map(breed => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>
        )}
      </Consumer>
    );
  }
}
