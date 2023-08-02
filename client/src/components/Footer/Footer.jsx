import React from "react";
import { LogoLinkedin, LogoGithub } from "../../svg/Logos";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="Footer">
      <h2>Copyright © 2023</h2>

      <div className="Footer__Logos">

        <a className="Footer__Link" href="https://www.linkedin.com/in/douglasgrl27/" target="_blank">
          <LogoLinkedin />
        </a>

        <a className="Footer__Link" href="https://github.com/Douglasgrl" target="_blank">
          <LogoGithub />
        </a>

      </div>
    </div>
  );
}
