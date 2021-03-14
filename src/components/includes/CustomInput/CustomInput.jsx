import React, { useState } from "react";
import hide from "../../../assets/images/hide.png";
import Close from "../../../assets/images/Close.png";

import "./css/style.css";

const CustomInput = ({
  onChange,
  icon,
  secured,
  placeholder,
  type,
  id,
  required,
}) => {
  const [inputType, setInputType] = useState(type);
  const [showLabel, setShowLabel] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [error, setError] = useState(null);

  return (
    <>
      <div className="custom-input" id={id}>
        <div className="input-inner">
          {showLabel && <label htmlFor={placeholder}>{placeholder}</label>}
          <input
            type={inputType}
            placeholder={placeholder}
            id={placeholder}
            security="true"
            onChange={(e) => {
              onChange(e);
              if (e.target.value.length !== 0) {
                setShowLabel(true);
              }
              if (e.target.value.length === 0) {
                setShowLabel(false);
              }
            }}
            required={required}
            onFocus={() => {
              document.getElementById(id).classList.add("active");
            }}
            onBlur={() => {
              setShowLabel(false);
              document.getElementById(id).classList.remove("active");
            }}
          />
        </div>
 
        {!secured ? (
          <img
            src={Close}
            onClick={() => {
              if (inputType === "text") {
                setInputType("password");
              } else {
                setInputType("text");
              }
            }}
            id="close"
            alt=""
          />
        ) : (
          <img
            src={hide}
            onClick={() => {
              if (inputType === "text") {
                setInputType("password");
              } else {
                setInputType("text");
              }
            }}
            alt=""
          />
        )}
      </div>
      {error && (
        <div
          className="notification"
          style={{ textAlign: "left", width: "100%" }}
        >
          <span>error</span>
        </div>
      )}
    </>
  );
};

export default CustomInput;
