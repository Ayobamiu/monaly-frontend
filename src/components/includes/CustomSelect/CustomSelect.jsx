import React, { useState } from "react";
import show from "../../../assets/images/show.png";
import hide from "../../../assets/images/hide.png";
import Close from "../../../assets/images/Close.png";

import "./css/style.css";

const CustomSelect = ({
  onChange,
  icon,
  secured,
  placeholder,
  type,
  id,
  required,
  defaultValue,
}) => {
  const [inputType, setInputType] = useState(type);
  const [showLabel, setShowLabel] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [error, setError] = useState(null);
  const [secureTextImage, setSecureTextImage] = useState(hide);

  return (
    <>
      <div className="custom-input" id={id}>
        <div className="input-inner h-100">
          {showLabel && <label htmlFor={placeholder}>{placeholder}</label>}
          <select
            name="select"
            id="Selectid"
            className="w-100 h-100 bg-transparent border-0"
          >
            <option value="" disabled selected>
              Select Country
            </option>
            <option value="Two">Two</option>
            <option value="Three">Three</option>
          </select>
          {/* <input
            defaultValue={defaultValue}
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
              const closeIcon = document.querySelector(`#${id} #close`);
              if (closeIcon) {
                closeIcon.style.display = "block";
              }
            }}
            onBlur={() => {
              setShowLabel(false);
              document.getElementById(id).classList.remove("active");
              const closes = document.querySelectorAll("#close");
              for (let index = 0; index < closes.length; index++) {
                const close = closes[index];
                close.style.display = "none";
              }
            }}
          /> */}
        </div>

        {!secured ? (
          <img
            src={Close}
            onClick={() => {
              document.querySelector(`#${id} input`).value = "";
            }}
            id="close"
            alt=""
            className="cursor"
          />
        ) : (
          <img
            src={secureTextImage}
            onClick={() => {
              if (inputType === "text") {
                setInputType("password");
                setSecureTextImage(hide);
              } else {
                setInputType("text");
                setSecureTextImage(show);
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

export default CustomSelect;
