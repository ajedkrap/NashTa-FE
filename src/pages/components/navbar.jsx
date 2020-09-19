import React from 'react';
import {
  Navbar as NavigateBar,
  NavbarText
} from 'reactstrap';

import { Link } from "react-router-dom"

// import color from "../../configs/color"

const Navbar = (props) => {
  return (
    <>
      <NavigateBar>
        <NavbarText className="text-center px-2 brand">
          <Link to={{ pathname: "/", search: "" }}>
            Navbar Brand
            </Link>
        </NavbarText>
        <div>
          <NavbarText className="text-center px-2 event">
            <Link to={{ pathname: "/event", search: "" }}>
              + Add Event
            </Link>
          </NavbarText>
          <NavbarText className="text-center px-2 dashboard">
            <Link to={{ pathname: "/dashboard", search: "" }}>
              Dashboard
            </Link>
          </NavbarText>
        </div>

      </NavigateBar>
    </>
  );

}


export default Navbar;
