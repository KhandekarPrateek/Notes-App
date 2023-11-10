import React from "react";
import { useState } from "react";

import NavigationBar from "../../common/NavigationBar";
import { Container } from "reactstrap";

const DashBoard = () => {
  return (
    <>
      <Container fluid>
        <NavigationBar />
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          Open Offcanvas
        </button>

        <div
          class="offcanvas offcanvas-start "
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">
              Offcanvas Panel
            </h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">ho</div>
        </div>
      </Container>
    </>
  );
};

export default DashBoard;
