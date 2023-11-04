import React from "react";

import NavigationBar from "../../common/NavigationBar";

import { Container, Row, Col } from "reactstrap";

const DashBoard = () => {
  return (
    <>
      <Container fluid>
        <NavigationBar />
        <Row>
          <Col sm={1}>
            <button
              class="btn btn-secondary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              notes
            </button>
            <div
              class="offcanvas offcanvas-start"
              data-bs-scroll="true"
              tabindex="-1"
              id="offcanvasWithBothOptions"
              aria-labelledby="offcanvasWithBothOptionsLabel"
            >
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
                  NOTES
                </h5>
                <button
                  type="button"
                  class="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body">
                <p>work</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashBoard;
