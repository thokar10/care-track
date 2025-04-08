import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/residents">Residents</Link></li>
        <li><Link to="/add-resident">Add Resident</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;