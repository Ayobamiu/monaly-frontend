import React, { useState } from "react";
import hide from "../../../assets/images/hide.png";

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
  const [error, setError] = useState(null);

  return (
    <>
      <div className="custom-input" id={id}>
        {showLabel && <label htmlFor={placeholder}>{placeholder}</label>}
        <div className="input-inner">
          <input
            type={inputType}
            placeholder={placeholder}
            id={placeholder}
            security="true"
            onChange={(e) => {
              onChange(e);
            }}
            required={required}
            onFocus={() => {
              setShowLabel(true);
              document.getElementById(id).classList.add("active");
            }}
            onBlur={() => {
              setShowLabel(false);
              document.getElementById(id).classList.remove("active");
            }}
          />
          {secured && (
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
