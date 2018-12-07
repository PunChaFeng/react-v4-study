import "./style.css";
import React from "react";
import { Route } from "react-router";
import Details from "./Details";
import { Pet } from "./Pet";
import pf from "petfinder-client";

const petfinder = pf({
  key: "399c00db48112a3e614605a5172ee524",
  secret: "6a33d390cffccd2126c1850231b28eb4"
});

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pets: [] };
  }

  componentDidMount() {
    petfinder.pet
      .find({ output: "full", location: "Seattle, WA" })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({ pets });
      });
  }

  render() {
    return (
      <>
        <Route path="/pets/:petId" component={Details} />
        <div>
          <Route
            exact
            path={this.props.match.url}
            render={() => {
              return this.state.pets.map(pet => {
                let breed = pet.breeds.breed || "N/A";
                if (Array.isArray(breed)) breed = pet.breeds.breed.join(",");
                return (
                  <Pet
                    key={pet.id}
                    animal={pet.animal}
                    name={pet.name}
                    breed={breed}
                    media={pet.media}
                    location={`${pet.contact.city}, ${pet.contact.state}`}
                    id={pet.id}
                  />
                );
              });
            }}
          />
        </div>
      </>
    );
  }
}
