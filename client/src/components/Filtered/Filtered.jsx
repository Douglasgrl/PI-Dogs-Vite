import React, { useEffect } from "react";
import "./Filtered.css";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAz,
  filterOrigins,
  filterTemperaments,
  filterWeight,
  reset,
} from "../../redux/actions";

export default function Filtered() {
  const temperaments = useSelector((state) => state.temperaments);

  const dispatch = useDispatch();

  const handleAoZ = (event) => {
    dispatch(filterAz(event.target.value));
  };

  const handleOrigin = (event) =>{
    dispatch(filterOrigins(event.target.value))
  }

  const handleFilterTemp = (event) => {
    dispatch(filterTemperaments(event.target.value));
  };

  const handleFilterWeight = (event) => {
    dispatch(filterWeight(event.target.value));
  };


  return (
    <div className="Container__Filtered">

    <div className="Filters__Cont">
      <h3>Origins</h3>
    <select className="Container__select" name="Origin" onChange={handleOrigin}>
          <option value="">ALL</option>
          <option value="API">API</option>
          <option value="DB">DB</option>
        </select>
    </div>


      <div className="Filters__Cont">
        <h3>Alphabetic</h3>
        <select className="Container__select" name="A_Z" onChange={handleAoZ}>
          <option value="A">A - Z</option>
          <option value="Z">Z - A</option>
        </select>
      </div>

      <div className="Filters__Cont">
        <h3>Temperaments</h3>
        <select
          className="Container__select"
          name="temperaments"
          onChange={handleFilterTemp}
        >
          <option value="Alldogs">All Dogs</option>
          {Array.isArray(temperaments) &&
            temperaments?.map((temperament, index) => {
              return (
                <option value={temperament} key={index}>
                  {temperament}
                </option>
              );
            })}
        </select>
      </div>

      <div className="Filters__Cont">
        <h3>Weight</h3>
        <select
          className="Container__select"
          name="Weight"
          onChange={handleFilterWeight}
        >
          <option value="maximum">Maximum</option>
          <option value="minimun">Minimum</option>
        </select>
      </div>

      <button className="Button__Reset" onClick={() => dispatch(reset())}>
        Reset{" "}
      </button>
    </div>
  );
}
