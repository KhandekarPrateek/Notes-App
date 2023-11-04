import React from "react";
import { useState } from "react";
import { GiNotebook } from "react-icons/gi";
import { GoSignOut } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { useLocation } from "react-router";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  return (
    <>
      <Container fluid>
        <Navbar color="dark" light expand="md" dark>
          <NavbarBrand href="/dashboard">
            <GiNotebook size={35} className="mx-3" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          {location.pathname === "/dashboard" ? (
            <NavbarText>
              <h5>Note name</h5>
            </NavbarText>
          ) : (
            <NavbarText>
              <h5>Go to Dashboard</h5>
            </NavbarText>
          )}

          <Collapse isOpen={isOpen} navbar className="navbar-text">
            <Nav className="ml-auto " navbar>
              <NavItem>
                <NavLink href="/profile">
                  <CgProfile size={30} className="mx-3" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signin">
                  <GoSignOut size={30} className="mx-3" />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </>
  );
};

export default NavigationBar;
