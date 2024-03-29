/** @format */

import React from "react";
import Chart from "react-apexcharts";
import _ from "lodash";

const ApexChart = (props) => {
  const countries = props.countries;

  const sortedLayers = _.sortBy(countries.layers, ["count", "name"]);
  const reversedLayers = _.reverse(sortedLayers);
  const firstTenCountries = reversedLayers.slice(0, 10);

  const data = [];
  const categories = [];
  for (let index = 0; index < firstTenCountries.length; index++) {
    const country = firstTenCountries[index];
    data.push(country.count);
    categories.push(country.name);
  }

  const series = [
    {
      data,
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 380,
    },
    theme: {
      monochrome: {
        enabled: true,
        color: "#ef476f",
        shadeTo: "dark",
        shadeIntensity: 0.05,
      },
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
        borderRadius: 15,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: [],
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
  };

  return (
    <div id='chart'>
      {firstTenCountries.length > 0 ? (
        <Chart options={options} series={series} type='bar' height={350} />
      ) : (
        <div className='no-visitors-details'>
          <h2>Nothing here yet</h2>
          <p className='custom-p'>
            You will see a chart display of your visitors' location
          </p>
        </div>
      )}
    </div>
  );
};

export default ApexChart;
