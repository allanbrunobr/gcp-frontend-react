// FixedMenu.js
import React from 'react';
import './FixedMenu.css'; // Importe o arquivo CSS

const FixedMenu = () => {
  return (
    <div className="fixed-menu">
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default FixedMenu;
