import React from "react";
import { useState } from "react";
import { SiGithub } from "react-icons/si";
import { AiFillLinkedin, AiFillHeart } from "react-icons/ai";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

const Footer = () => {
  const [toggle, setToggle] = useState(false);
  const Footertoggle = (oldToggle) => {
    setToggle((oldToggle) => !oldToggle);
  };

  return (
    <Navbar light expand="md" className="bg-light w-100 ps-5" fixed="bottom">
      <NavbarToggler onClick={Footertoggle} />
      <Collapse isOpen={toggle} navbar>
        <Nav className="ms-1" navbar>
          <NavItem className="pt-2">
            Made with <AiFillHeart size={30} className="text-danger" /> by
            Prateek Khandekar
          </NavItem>

          <NavItem>
            <NavLink href="https://www.linkedin.com/in/prateek-khandekar-54966824b/">
              <AiFillLinkedin size={30} />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/KhandekarPrateek">
              <SiGithub size={30} />
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
export default Footer;
