import React from "react";
import pf from "petfinder-client";
import { Navigate } from "react-router";

const petfinder = pf({
  key: "399c00db48112a3e614605a5172ee524",
  secret: "6a33d390cffccd2126c1850231b28eb4"
});

export default class Details extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    console.log(this.props);
    petfinder.pet
      .get({ output: 'full', id: this.props.match.params.petId })
      .then(data => {
        const { pet } = data.petfinder;
        let breed = pet.breeds.breed;
        if (Array.isArray(breed)) breed = breed.join(",");
        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city} - ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          loading: false
        });
      })
      .catch(() => this.props.history.push("/"));
  }

  render() {
    if (this.state.loading) return <h1>loading...</h1>;

    const { name, animal, breed, location, description } = this.state;
    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
