import React from "react";
import "./Create.css";
import { useState } from "react";
import "../Validation/Validation";
import validation from "../Validation/Validation";
import { createDog } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Create() {

  const navigate = useNavigate()

  const temperaments = useSelector((state) => state.temperaments);

  const [selectTemp, setSelectTemp] = useState([]);

  const dispatch = useDispatch();

  const [dogsData, setDogsData] = useState({
    id: 0,
    name: "",
    image: "",
    height1: "",
    height2: "",
    weight1: "",
    weight2: "",
    life_span: "",
    temperament: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    height1: "",
    height2: "",
    weight1: "",
    weight2: "",
    life_span: "",
    temperament: [],
  });

  const handleChange = (event) => {
    setDogsData({
      ...dogsData,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validation({
        ...dogsData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalyData = {
      ...dogsData,
      id: Math.floor(Math.random() * 1000) + 300,
      height: `${dogsData.height1} - ${dogsData.height2}`,
      weight: `${dogsData.weight1} - ${dogsData.weight2}`,
    };

    dispatch(createDog(finalyData));
    alert("Su perro se ha creado correctamente");
    navigate("/home")
    resetForm();
  };

  const resetForm = () => {
    setDogsData({
      name: "",
      image: "",
      height1: "",
      height2: "",
      weight1: "",
      weight2: "",
      life_span: "",
      temperament: [],
    });
  };

  const handleTemps = (event) => {
    const select = event.target.value;

    if (!selectTemp.includes(select)) {
      setSelectTemp((prevSelectTemp) => [...prevSelectTemp, select]);
      setDogsData((prevDogsData) => ({
        ...prevDogsData,
        temperament: [...prevDogsData.temperament, select],
      }));
    }
  };

  const handleRemoveTemp = (tempToRemove) => {
    const updatedSelectTemp = selectTemp.filter(
      (temp) => temp !== tempToRemove
    );
    setSelectTemp(updatedSelectTemp);
  };

  const hasErrors = Object.values(errors).some((error) => error !== "");

  return (
    <div className="Container__Create">
      <img
        className="Create__Img"
        src="https://images.unsplash.com/photo-1585072857532-4bffcc57aaee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
        alt=""
      />

      <form className="Form__Create" action="post" onSubmit={handleSubmit}>
        <label className="Form__Label" htmlFor="name">
          Name
          <input
            className="Form__Input"
            id="name"
            type="text"
            value={dogsData.name}
            onChange={handleChange}
            name="name"
          />
          {errors.name && <p>{errors.name}</p>}
        </label>

        <label className="Form__Label" htmlFor="image">
          Imagen
          <input
            className="Form__Input"
            id="image"
            type="text"
            onChange={handleChange}
            value={dogsData.image}
            name="image"
          />
          {errors.image && <p>{errors.image}</p>}
        </label>

        <label className="Form__Label" htmlFor="height">
          Height
          <div className="Label__Height">
            <input
              className="Form__Input Form__Input--Height"
              id="height-1"
              type="number"
              onChange={handleChange}
              value={dogsData.height1}
              name="height1"
              placeholder="Minimum"
            />

            <input
              className="Form__Input Form__Input--Height"
              id="height-2"
              type="number"
              onChange={handleChange}
              value={dogsData.height2}
              name="height2"
              placeholder="Maximum"
            />
          </div>
          {errors.height1 && <p>{errors.height1}</p>}
        </label>

        <label className="Form__Label" htmlFor="weight">
          Weight
          <div className="Label__Height">
            <input
              className="Form__Input"
              id="weight-1"
              type="number"
              onChange={handleChange}
              value={dogsData.weight1}
              name="weight1"
              placeholder="Minimum"
            />

            <input
              className="Form__Input"
              id="weight-2"
              type="number"
              onChange={handleChange}
              value={dogsData.weight2}
              name="weight2"
              placeholder="Maximium"
            />
          </div>
        </label>
        {errors.weight1 && <p>{errors.weight1}</p>}

        <label className="Form__Label" htmlFor="life_span">
          Life Span
          <input
            className="Form__Input"
            id="life_span"
            type="text"
            onChange={handleChange}
            value={dogsData.life_span}
            name="life_span"
          />
          {errors.life_span && <p>{errors.life_span}</p>}
        </label>

        <label className="Form__Label" htmlFor="temperament">
          Temperaments
          <select onChange={handleTemps}>
            {Array.isArray(temperaments) &&
              temperaments?.map((temperament, index) => {
                return (
                  <option value={temperament} key={index}>
                    {temperament}
                  </option>
                );
              })}
          </select>

          <div className="cls">
          {selectTemp.map((selectedTemp, index) => (
            <div key={index} className="SelectedTemp__Container">
              <button className="SelectedTemp__RemoveButton" onClick={() => handleRemoveTemp(selectedTemp)}>x</button>
              <p className="SelectedTemp__Text">{selectedTemp}</p>
            </div>

))}
            </div>


          {errors.temperament && <p>{errors.temperament}</p>}
        </label>

        {!hasErrors && (
          <input className="Form__submit" type="submit" value="Submit" />
        )}
      </form>
    </div>
  );
}
