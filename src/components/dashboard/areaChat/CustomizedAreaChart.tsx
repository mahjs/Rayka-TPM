import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  registerables,
  Chart,
  ChartOptions
} from "chart.js";
ChartJS.register(...registerables);

import "moment";
import "chartjs-adapter-moment";
import zoom from "chartjs-plugin-zoom";

import { FC, useRef } from "react";
import { Box, Button, Stack } from "@mui/material";
import TitledValue from "../TitledValue";
import { ChartDataFormat } from "./AreaChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoom
);

interface Props {
  data: ChartDataFormat;
  showDate?: boolean;
  sendColor: string;
  receiveColor: string;
  min: number;
  max: number;
  avg: number;
}

const CustomizedAreaChart: FC<Props> = ({
  data,
  showDate = false,
  min = 0,
  max = 0,
  avg = 0,
  sendColor,
  receiveColor
}) => {
  const chartRef = useRef<ChartJS<"line", number[], unknown> | null>(null);

  const resetZoom = () => {
    const chart = chartRef.current;
    if (chart) {
      chart.resetZoom();
    }
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.2,
    plugins: {
      legend: {
        position: "top"
      },
      zoom: {
        zoom: {
          // wheel: { enabled: true },
          // pinch: { enabled: true },
          drag: {
            enabled: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1
          },
          mode: "xy"
        }
      }
    },
    scales: {
      x: {
        type: "time",
        position: "bottom",
        time: {
          parser: showDate ? "YYYY-MM-DD HH:mm" : "HH:mm",
          tooltipFormat: showDate ? "YYYY-MM-DD HH:mm" : "HH:mm",
          unit: showDate ? "day" : "minute",
          displayFormats: {
            day: "YYYY-MM-DD"
          }
        }
      }
    }
  };

  const chartData = {
    labels: showDate ? data.date : data.time,
    datasets: [
      {
        label: "Send Data",
        data: data.send,
        backgroundColor: sendColor + 90,
        borderColor: sendColor,
        tension: 0.3,
        fill: true,
        pointRadius: 0
      },
      {
        label: "Receive Data",
        data: data.receive,
        backgroundColor: receiveColor + 90,
        borderColor: receiveColor,
        tension: 0.3,
        fill: true,
        pointRadius: 0
      }
    ]
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Line
        style={{
          maxWidth: "650px",
          maxHeight: "280px"
        }}
        ref={chartRef}
        options={options}
        data={chartData}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}
      >
        <Stack
          sx={{
            gap: "1rem",
            alignItems: "center",
            background: "#fff",
            padding: ".5rem",
            border: "1px solid #707070",
            borderRadius: ".5rem"
          }}
        >
          <TitledValue color="red" title="Min" value={min} />
          <TitledValue color="green" title="Max" value={max} />
          <TitledValue color="blue" title="Avg" value={avg} />
        </Stack>
        <Button variant="outlined" onClick={resetZoom}>
          Reset Zoom
        </Button>
      </Box>
    </Box>
  );
};

export default CustomizedAreaChart;
