import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const NavbarTooltip = ({ content, target }) => {
  const [toolTipIsOpen, settoolTipIsOpen] = useState(false);
  const toggleToolTip = () => {
    settoolTipIsOpen(!toolTipIsOpen);
  };

  return (
    <Tooltip
      placement="bottom"
      isOpen={toolTipIsOpen}
      toggle={toggleToolTip}
      target={target}
    >
      {content}
    </Tooltip>
  );
};

export default NavbarTooltip;
