import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Card({
  id,
  name,
  weight,
  image,
  temperament,
}) {
  return (
    <div className="Container_Card">

      <div className="face front">
        <img className="Card__img" src={image} alt={name} />

        <h2 className="Card__h3">{name}</h2>
      </div>

      <div className="face back">
        <h3>Weight : {weight} Pounds</h3>
        <h3>Temperaments: </h3>
        <p>{temperament}</p>


        <div className="Link">
      <Link className="Link__Details" to={`/detail/${id}`}>See More +</Link>
      </div>


      </div>


    </div>
  );
}
