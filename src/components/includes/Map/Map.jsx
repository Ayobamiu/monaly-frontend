import React, { useEffect, useState } from "react";
import { VectorMap } from "@south-paw/react-vector-maps";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getMyVisitors } from "../../../store/authSlice";

const DataMap = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyVisitors());
  }, []);

  const countries = useSelector((state) => state.app.user.countries);
  const below1000 = [];

  const below100000 = [];

  const above100000 = [];

  countries.layers &&
    countries.layers.filter((country) => {
      if (country.count < 1000 && country.count > 0) {
        below1000.push(country.id);
      }
      if (country.count < 100000 && country.count > 1000) {
        below100000.push(country.id);
      }
      if (country.count > 100000) {
        above100000.push(country.id);
      }
    });
  const [hovered, setHovered] = useState("");
  const [focused, setFocused] = useState("");
  const [clicked, setClicked] = useState("");

  const layerProps = {
    onMouseEnter: ({ target }) => {
      setHovered(target.attributes.count.value);
      setFocused(target.attributes.name.value);
    },
    onMouseLeave: ({ target }) => {
      setHovered("");
      setFocused("");
    },
    onFocus: ({ target }) => setFocused(target.attributes.name.value),
    onBlur: ({ target }) => setFocused(""),
    onClick: ({ target }) => setClicked(target.attributes.name.value),
  };
  const Map = styled.div`
    margin: 1rem auto;
    width: 300px;

    svg {
      stroke: #fff;

      // All layers are just path elements
      path {
        fill: #f2dfea;
        cursor: pointer;
        outline: none;

        // When a layer is hovered
        &:hover {
          fill: rgba(168, 43, 43, 0.83);
        }

        // When a layer is focused.
        &:focus {
          fill: rgba(168, 43, 43, 0.6);
        }

        // When a layer is 'checked' (via checkedLayers prop).
        &[aria-checked="true"] {
          fill: #f24484;
        }

        // When a layer is 'selected' (via currentLayers prop).
        &[aria-current="true"] {
          fill: #f24b78;
        }
      }
    }
  `;

  return (
    <div className="datamap">
      <Map>
        <VectorMap
          {...countries}
          layerProps={layerProps}
          checkedLayers={below1000}
          currentLayers={above100000}
        />
      </Map>
      {countries.length === 0 && (
        <div className="no-visitors-details">
          <h2>Nothing here yet</h2>
          <p className="custom-p">
            You will see a map display of your visitors' location
          </p>
        </div>
      )}
      <p>
        {(hovered || focused) && (
          <code>
            {focused}: {hovered}
          </code>
        )}
      </p>
    </div>
  );
};

export default DataMap;
