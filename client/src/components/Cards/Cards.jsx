import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import Paginated from "../Paginated/Paginated";
import Filtered from "../Filtered/Filtered";
import "./Cards.css";

export default function Cards() {

  const { dogs, pageNumber } = useSelector((state) => state);

  const cantCharPerPage = 8;

  let from = (pageNumber - 1) * cantCharPerPage;

  let until = pageNumber * cantCharPerPage;

  let cantPage = Math.floor(dogs.length / cantCharPerPage);

  const viewCharacters = dogs?.slice(from, until);

  console.log(viewCharacters)

  return (
    <div className="Container">
      <div className="Container__Cards">
        <Filtered></Filtered>

        <div className="Cards__Cont">
          {Array.isArray(viewCharacters) && viewCharacters?.map(
            ({ id, name, weight, height, life_span, image, temperament }) => {
              return (
                <Card
                  key={id}
                  id={id}
                  name={name}
                  weight={weight}
                  height={height}
                  life_span={life_span}
                  image={image}
                  temperament={temperament}
                />
              );
            }
          )}
        </div>
      </div>
      <Paginated pageNumber={pageNumber} cantPage={cantPage}></Paginated>
    </div>
  );
}
