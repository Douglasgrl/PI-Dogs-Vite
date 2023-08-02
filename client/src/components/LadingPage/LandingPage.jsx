import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="Landing__Container">
    

      <div className="Landing__text">
        <h1 className="Landing__title">Soy el componente LandingPage</h1>

        <Link className="Landing__Button" to={"/home"}>Home</Link>
      </div>
    </div>
  );
}
