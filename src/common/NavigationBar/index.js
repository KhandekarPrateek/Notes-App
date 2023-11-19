import React, { useEffect } from "react";
import { useState } from "react";
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
} from "reactstrap";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

const NavigationBar = ({ name }) => {
  const [Data, setParsedData] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(storedData);
    setParsedData(parsedData);
  }, []);

  const routeToDashboard = () => {
    navigate(`/dashboard/${Data.displayName}`);
  };
  const routeToProfile = () => {
    navigate(`/profile/${Data.displayName}`);
  };

  return (
    <>
      <Container fluid>
        <Navbar color="dark" light expand="md" dark>
          <GiNotebook
            size={35}
            className="mx-3 text-light  icon-cursor"
            onClick={routeToDashboard}
          />
          <NavbarToggler onClick={toggle} />
          {location.pathname === `/dashboard/${Data?.displayName}/${name}` && (
            <NavbarText>
              <h5>{name}</h5>
            </NavbarText>
          )}
          {location.pathname === `/dashboard/${Data?.displayName}/` && (
            <NavbarText>
              <h5>notes</h5>
            </NavbarText>
          )}
          {location.pathname === `/profile/${Data?.displayName}` && (
            <NavbarText>
              <h5>Go to dashboard</h5>
            </NavbarText>
          )}

          <Collapse isOpen={isOpen} navbar className="navbar-text">
            <Nav className="ml-auto " navbar>
              <NavItem>
                <VscAccount
                  size={35}
                  className="mt-2 text-light icon-cursor"
                  onClick={routeToProfile}
                />
              </NavItem>
              <NavItem>
                <NavLink href="/signin">
                  <PiSignOut size={35} className="mx-3 icon-cursor" />
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
