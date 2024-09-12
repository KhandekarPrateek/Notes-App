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
  Col,
  Container,
  Row,
} from "reactstrap";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeContext";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

import NavbarTooltip from "../NavbarToolTip";
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
    const storedData = localStorage.getItem("name");
    
    setParsedData(storedData);
  }, []);

  const routeToDashboard = () => {
    navigate(`/dashboard/${Data}`);
  };
  const routeToProfile = () => {
    navigate(`/profile/${Data}`);
  };
  const handleLogout = () => {
    localStorage.removeItem("theme");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/signin");
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
                  id="dashboard"
                />
                <NavbarTooltip
                  placement="bottom"
                  target="dashboard"
                  content="Go to dashboard"
                />
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
                    id="newNote"
                  />
                  <NavbarTooltip
                    placement="bottom"
                    target="newNote"
                    content="Create New Note"
                  />
                </div>
                <BsLayoutSidebar
                  size={35}
                  className="ms-2 icon-cursor"
                  onClick={() => togglePageSizeChange(openNoteContainer)}
                  id="openNoteSidePanel"
                />
                <NavbarTooltip
                  placement="bottom"
                  target="openNoteSidePanel"
                  content="Toggle Focus Mode"
                />
              </div>
            )}

            <Collapse isOpen={isOpen} navbar className="navbar-text">
              <Nav className="ml-auto " navbar>
                <NavItem>
                  <div
                    onClick={toggleTheme}
                    className="m-2 text-light icon-cursor"
                    id="darkmode"
                  >
                    {!isDark ? (
                      <IoMoonOutline size={35} />
                    ) : (
                      <IoSunnyOutline size={35} />
                    )}
                  </div>
                  <NavbarTooltip
                    placement="bottom"
                    target="darkmode"
                    content={`${
                      !isDark ? "Switch to Dark Mode" : "Switch to Light Mode"
                    }`}
                  />
                </NavItem>
                <NavItem>
                  <VscAccount
                    size={35}
                    className="mt-2 text-light icon-cursor"
                    onClick={routeToProfile}
                    id="profile"
                  />
                  <NavbarTooltip
                    placement="bottom"
                    target="profile"
                    content="Profile Section"
                  />
                </NavItem>
                <NavItem>
                  <NavLink >
                    <PiSignOut
                      size={35}
                      className="mx-3 icon-cursor"
                      id="logout"
                      onClick={handleLogout}
                    />
                  </NavLink>
                  <NavbarTooltip
                    placement="bottom"
                    target="logout"
                    content="logout"
                  />
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
