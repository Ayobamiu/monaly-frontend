/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from "react";
import {
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import "./css/style.css";

const CustomPopUp = ({ id, placement = "bottom", children, title, style }) => {
  return (
    <div>
      <Button id={id} type="button" style={style}>
        {title}
      </Button>

      <UncontrolledPopover trigger="legacy" placement={placement} target={id}>
        <PopoverBody>{children}</PopoverBody>
      </UncontrolledPopover>
    </div>
  );
};

export default CustomPopUp;
