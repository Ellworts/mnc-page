import React from 'react';
import './topBar.scss';

function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar-logo">
        <h1>говно</h1>
      </div>
      <div className="top-bar-menu">
        <a href="#menus">Our Menus</a>
        <a href="#offers">Offers</a>
        <a href="#steak-cocktail">Steak & Cocktail</a>
        <a href="#book">Book a Table</a>
      </div>
    </div>
  );
}

export default TopBar;