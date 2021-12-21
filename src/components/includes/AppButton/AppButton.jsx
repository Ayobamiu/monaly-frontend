/** @format */

import React from "react";
import "./style.css";

export default function AppButton({
  text,
  rounded = true,
  secondary = false,
  small = false,
  onPress = () => {},
  large = false,
  fullWidth = false,
  inverse = false,
  IconComponent,
  className,
  onCLick,
  ...props
}) {
  return (
    <button
      id='app-btn'
      className={`
      ${rounded && "app-btn-rounded"} 
      ${fullWidth && "app-btn-fullWidth"}
      ${inverse && "app-btn-inverse"}
      ${secondary && "app-btn-secondary"}
      ${large && "app-btn-large"}
      ${small && "app-btn-small"}
      ${className}
      `}
      onClick={onCLick}
      {...props}>
      {IconComponent && <span className='mx-2'>{IconComponent}</span>}
      <span>{text}</span>
    </button>
  );
}
