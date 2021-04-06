import axios from "axios";

export const ipLookUp = async () => {
  const response = await axios.get("http://ip-api.com/json");
  return response;
};

export const getAddress = async (latitude, longitude) => {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json?" +
      "latlng=" +
      latitude +
      "," +
      longitude +
      "&key=" +
      "AIzaSyB1csOH5VrhgTKeDNF19eSW00TWGlRlCqA"
  );
  const currentLocation =
    response.data &&
    response.data.results[0] &&
    response.data.results[0].formatted_address;
  const country =
    response.data &&
    response.data.results.find(
      (result) => result.types && result.types[0] === "country"
    ).formatted_address;
  const city =
    response.data &&
    response.data.results.find(
      (result) =>
        result.types && result.types[0] === "administrative_area_level_1"
    ).formatted_address;
  return { currentLocation, city, country };
};
