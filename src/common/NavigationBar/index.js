import React from "react";
import { useState, useContext } from "react";
import { GiNotebook } from "react-icons/gi";
import { PiSignOut } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";

import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
} from "reactstrap";
import { useLocation } from "react-router";
import { UserContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const { currentUser } = useContext(UserContext);

  console.log(currentUser, "currentUser from navbar");
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  const navigate = useNavigate();

  const routeToDashboard = () => {
    navigate(`/dashboard/${currentUser.displayName}`);
  };
  const routeToProfile = () => {
    navigate(`/profile/${currentUser.displayName}`);
  };

  return (
    <>
      <Container fluid>
        <Navbar color="dark" light expand="md" dark>
          <GiNotebook
            size={35}
            className="mx-3 text-light cursor-pointer"
            onClick={routeToDashboard}
          />
          <NavbarToggler onClick={toggle} />
          {location.pathname === `/dashboard/${currentUser.displayName}` ? (
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
                <VscAccount
                  size={35}
                  className="mt-2 text-light"
                  onClick={routeToProfile}
                />
              </NavItem>
              <NavItem>
                <NavLink href="/signin">
                  <PiSignOut size={35} className="mx-3" />
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
