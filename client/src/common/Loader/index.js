import React from "react";
import { Spinner } from "reactstrap";

const Loader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center profile-container">
      <Spinner
        style={{
          height: "10rem",
          width: "10rem",
        }}
      >
        Loading...
      </Spinner>
    </div>
  );
};

export default Loader;
