import CanvasJSReact from "@canvasjs/react-charts";
import CanvasJS from "canvasjs";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const LineChart = () => {
  const options = {
    theme: "light1", // "light2", "dark1", "dark2"
    animationEnabled: true,
    title: {
      text: "Basic Column Chart in Next.js",
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "apple", y: 10 },
          { label: "orange", y: 15 },
          { label: "banana", y: 25 },
          { label: "mango", y: 30 },
          { label: "grape", y: 28 },
        ],
      },
    ],
  };
  const containerProps = {
    width: "80%",
    height: "360px",
    margin: "auto",
  };
  return (
    <div>
      <CanvasJSChart options={options} containerProps={containerProps} />
    </div>
  );
};

export default LineChart;
