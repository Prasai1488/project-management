import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./dashboard.css";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";

const Dashboard = () => {
  const [options, setOptions] = useState({
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1],
      },
    },
    grid: {
      show: false,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  });
  const [option2, setOption2] = useState({
    ...options,
    colors: ["#a735f0"],
  });
  const [option3, setOption3] = useState({
    ...options,
    colors: ["#D51E31"],
  });
  const [option4, setOption4] = useState({
    ...options,
    colors: ["#31d10d"],
  });
  const [series, setSeries] = useState([
    {
      name: "Desktops",
      data: [10, 41, 35, 80, 49, 62, 12, 91, 148],
    },
  ]);

  const [graphSeries, setGraphSeries] = useState([
    {
      name: "Medium",
      data: [44, 55, 57, 56],
    },
    {
      name: "High",
      data: [76, 85, 101, 98],
    },
    {
      name: "Low",
      data: [35, 41, 36, 26],
    },
  ]);
  const [graphOptions, setGraphOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    legend: { position: "top" },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["2021", "2022", "2023", "2024"],
    },
    yaxis: {},
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
    colors: ["#008ffb", "#8324f0", "#D51E31"],
  });

  const [pieSeries, setPieSeries] = useState([50, 20, 10, 20]);
  const [pieOptions, setPieOptions] = useState({
    chart: {
      type: "donut",
      class: "my-custom-chart",
    },
    legend: {
      position: "right",
      formatter: function (seriesName, opts) {
        return seriesName + ": " + opts.w.globals.series[opts.seriesIndex];
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        radius: 12,
      },
    },
    stroke: {
      width: 0, // This line removes the gap between the ring items
    },
    dataLabels: {
      enabled: false,
    },
    labels: ["Affilate", "Purchase", "Website", "Endorse"],
  });
  const [filters, setFilters] = useState({
    branch: null,
  });
  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning !!!";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon !!!";
    } else if (currentHour >= 17 && currentHour < 21) {
      return "Good Evening !!!";
    } else {
      return "Good Night !!!";
    }
  };
  return (
    <>
      <div>
        <CommonPageHeader
          title={`Welcome, ${getGreeting()}`}
          types={"dashboard"}
          filters={filters}
          setFilters={setFilters}
        />
        <div className=" w-100" style={{ overflow: "auto" }}>
          {/*top row cards*/}
          <div className="row px-4 pb-4 pt-2 m-0" style={{ gap: "20px" }}>
            <div className="card col">
              <div className="d-flex justify-content-between">
                <div className="">
                  <h6 style={{ paddingTop: "35px" }}>Users</h6>
                  <h5 className="text-primary py-3">2,490</h5>
                </div>
                <div>
                  <div id="chart">
                    <ReactApexChart options={options} series={series} type="line" height={130} width={150} />
                  </div>
                  <div id="html-dist"></div>
                </div>
              </div>
            </div>
            <div className="card col">
              <div className="d-flex justify-content-between">
                <div className="">
                  <h6 style={{ paddingTop: "35px" }}>Sales</h6>
                  <h5 className=" py-3" style={{ color: "#8324f0" }}>
                    2,490
                  </h5>
                </div>
                <div>
                  <div id="chart">
                    <ReactApexChart options={option2} series={series} type="line" height={130} width={150} />
                  </div>
                  <div id="html-dist"></div>
                </div>
              </div>
            </div>
            <div className="card col">
              <div className="d-flex justify-content-between">
                <div className="">
                  <h6 style={{ paddingTop: "35px", color: "#D51E31" }}>Visitor</h6>
                  <h5 className=" py-3" style={{ color: "#D51E31" }}>
                    2,490
                  </h5>
                </div>
                <div>
                  <div id="chart">
                    <ReactApexChart options={option3} series={series} type="line" height={130} width={140} />
                  </div>
                  <div id="html-dist"></div>
                </div>
              </div>
            </div>
            <div className="card col">
              <div className="d-flex justify-content-between">
                <div className="">
                  <h6 style={{ paddingTop: "35px" }}>Purchase</h6>
                  <h5 className=" py-3" style={{ color: "#31d10d" }}>
                    2,490
                  </h5>
                </div>
                <div>
                  <div id="chart">
                    <ReactApexChart options={option4} series={series} type="line" height={130} width={150} />
                  </div>
                  <div id="html-dist"></div>
                </div>
              </div>
            </div>
          </div>

          {/*bottom row cards*/}
          <div className="row m-0 px-4 d-flex w-100" style={{ gap: "20px" }}>
            {/*bar graph*/}
            <div style={{ flexGrow: "2" }}>
              <div className="card p-4">
                <div id="chart">
                  <h5>Sales Overview</h5>
                  <ReactApexChart options={graphOptions} series={graphSeries} type="bar" height={300} width={"100%"} />
                </div>
                <div id="html-dist"></div>
              </div>
            </div>

            {/* pie chart */}
            <div style={{ maxWidth: "600px" }} className=" card flex-grow-1">
              <div className=" p-4">
                <div className="d-flex justify-content-between">
                  <h5 className="m-0 ">Earning Report</h5>
                </div>
                <div className="d-flex mt-4 flex-row-reverse">
                  <div id="chart" className="flex-grow-1">
                    <ReactApexChart
                      options={pieOptions}
                      series={pieSeries}
                      type="donut"
                      // width={300}
                      height={300}
                    />
                  </div>
                </div>
                <div id="html-dist"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
