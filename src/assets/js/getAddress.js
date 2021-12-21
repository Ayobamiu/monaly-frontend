/** @format */

import axios from "axios";

export const getAddressV2 = async (key, latitude, longitude) => {
  const result = await axios.get(
    `http://api.positionstack.com/v1/reverse?access_key=${key}&query=${
      latitude + "," + longitude
    }`
  );
  const confidences = [];
  for (let index = 0; index < result.data.data.length; index++) {
    const data = result.data.data[index];
    confidences.push(data.confidence);
  }
  var max_of_array = Math.max.apply(Math, confidences);
  const target = result.data.data.find(
    (item) => item.confidence === max_of_array
  );
  return {
    currentLocation: target.label,
    city: target.region,
    country: target.country,
  };
};

var x = document.getElementById("demo");

export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

export function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}

export const getLatLong = async (address) => {
  const result = await axios.get(
    `http://api.positionstack.com/v1/forward?access_key=3b4c10a64fff96eaf6167a0c4c3926d5&query=${address}`
  );
  const confidences = [];
  for (let index = 0; index < result.data.data.length; index++) {
    const data = result.data.data[index];
    confidences.push(data.confidence);
  }
};

export const getCountries = async () => {
  const response = await axios
    .get("https://api.countrystatecity.in/v1/countries", {
      headers: {
        "X-CSCAPI-KEY":
          "QzBObGZZM2x0bkpqb0ViNGZjSEJsazdMZGU1YTVhdmVYbzVlN3c1TQ==",
      },
    })
    .catch((error) => {});
  return response?.data || [];
};

export const getStates = async (iso2) => {
  const { data } = await axios
    .get(`https://api.countrystatecity.in/v1/countries/${iso2}/states`, {
      headers: {
        "X-CSCAPI-KEY":
          "QzBObGZZM2x0bkpqb0ViNGZjSEJsazdMZGU1YTVhdmVYbzVlN3c1TQ==",
      },
    })
    .catch((error) => {});
  return data;
};
export const getCitiess = async (countryIso, stateIso) => {
  const { data } = await axios
    .get(
      `https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY":
            "QzBObGZZM2x0bkpqb0ViNGZjSEJsazdMZGU1YTVhdmVYbzVlN3c1TQ==",
        },
      }
    )
    .catch((error) => {});
  return data;
};
