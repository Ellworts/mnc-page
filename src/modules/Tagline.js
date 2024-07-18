import React from "react";
import BullLogo from '../media/svg/CowSilhouette.svg';
import './Tagline.scss';

function Tagline() {
  return (
    <div className="tagline">
      <div className="tagline-bull-logo">
        <img src={BullLogo} alt="bullLogo"></img>
      </div>
      
      <div className="tagline-text">
        <h1>Unleash Your Inner <br /> Carnivore</h1>
      </div>

      <div className="tagline-buttons">
        <a href="#menus">Explore Us</a>
        <a href="#book">Book Now</a>
      </div>
    </div>
  );
}

export default Tagline;
