// Header.js

import React from 'react';
import './Header.css';
import { RocketTakeoff } from 'react-bootstrap-icons';

const Header = () => {
  return (
    <div>
      <span onClick={() => window.scroll(0, 0)} className="header">
        NUTFLIX<i class="bi bi-rocket-takeoff"></i>
      <RocketTakeoff color="white" size={24} />
      </span>
    </div>
  );
};

export default Header;
