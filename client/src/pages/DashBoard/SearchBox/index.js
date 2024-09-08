import React from "react";
import { Col, Input, Row } from "reactstrap";
import { IoSearchOutline } from "react-icons/io5";

const SearchBox = ({ setSearchTerm }) => {
  return (
    <div>
      <Row className="text-secondary border-bottom dashboard-border note-name-row align-items-center justify-content-center d-flex ">
        <Col sm={1} className="ms-1 icon-cursor">
          <IoSearchOutline size={30} />
        </Col>
        <Col sm={10}>
          <Input
            className="search-box text-secondary"
            placeholder="Search note name..."
            type="search"
            spellCheck="false"
            name="SearchBox"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SearchBox;
