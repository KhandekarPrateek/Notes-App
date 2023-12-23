import React, { useState } from "react";
import { Tooltip } from "reactstrap";

function ToolTip(args, props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <Tooltip
        {...args}
        isOpen={tooltipOpen}
        target="TooltipExample"
        toggle={toggle}
      >
        {props.content}
      </Tooltip>
    </div>
  );
}

ToolTip.args = {
  autohide: true,
  flip: true,
};

ToolTip.argTypes = {
  placement: {
    control: { type: "select" },
    options: ["top", "left", "right", "bottom"],
  },
};

export default ToolTip;
