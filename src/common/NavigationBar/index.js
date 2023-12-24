import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { GiNotebook } from "react-icons/gi";
import { PiSignOut } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import { FiEdit3 } from "react-icons/fi";
import { BsLayoutSidebar } from "react-icons/bs";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Col,
  Container,
  Row,
} from "reactstrap";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeContext";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
const NavigationBar = ({
  openNoteContainer,
  createNewNote,
  togglePageSizeChange,
}) => {
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
    navigate(`/dashboard/${Data}`);
  };
  const routeToProfile = () => {
    navigate(`/profile/${Data}`);
  };
  const [{ isDark }, toggleTheme] = useContext(ThemeContext);
  return (
    <Container fluid>
      <Row>
        <Col className="border-bottom dashboard-border">
          <Navbar expand="md" className="navbar-rules">
            {location.pathname === `/profile/${Data}` && (
              <>
                <GiNotebook
                  size={35}
                  className="mx-3 text-light  icon-cursor"
                  onClick={routeToDashboard}
                />
                <NavbarText>
                  <h5>Go to dashboard</h5>
                </NavbarText>
              </>
            )}

            <NavbarToggler onClick={toggle} />

            {location.pathname !== `/profile/${Data}` && (
              <div className="d-flex">
                <div className="border-end">
                  <FiEdit3
                    onClick={createNewNote}
                    size={35}
                    className="icon-cursor"
                  />
                </div>
                <BsLayoutSidebar
                  size={35}
                  className="ms-2 icon-cursor"
                  onClick={() => togglePageSizeChange(openNoteContainer)}
                />
              </div>
            )}

            <Collapse isOpen={isOpen} navbar className="navbar-text">
              <Nav className="ml-auto " navbar>
                <NavItem>
                  <div
                    onClick={toggleTheme}
                    className="m-2 text-light icon-cursor"
                  >
                    {!isDark ? <FaRegMoon size={35} /> : <FaRegSun size={35} />}
                  </div>
                </NavItem>
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
        </Col>
      </Row>
    </Container>
  );
};

export default NavigationBar;
