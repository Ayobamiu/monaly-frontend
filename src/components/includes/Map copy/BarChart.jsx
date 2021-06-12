import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyVisitors } from "../../../store/authSlice";
import { Bar } from "react-chartjs-2";
import world from "../../../assets/jsons/world.json";

const BarChart = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyVisitors());
  }, []);
  const labels = [];
  const datasets = [];
  const countriesViewsDataSet = {
    label: "Views",
    backgroundColor: "#ef476f",
    borderColor: "rgba(0,0,0,1)",
    borderWidth: 0,
    data: [],
    barThickness: "flex",
    maxBarThickness: 10,
    layout: {
      padding: 20,
    },
  };
  for (let index = 0; index < world.layers.length; index++) {
    const element = world.layers[index];
    labels.push(element.name);
    countriesViewsDataSet.data.push(element.count);
  }

  datasets.push(countriesViewsDataSet);

  return (
    <div className="datamap">
      <Bar
        data={{ labels, datasets }}
        options={{
          title: {
            display: true,
            text: "Views from countries",
            fontSize: 20,
          },
          indexAxis: "y",
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default BarChart;
