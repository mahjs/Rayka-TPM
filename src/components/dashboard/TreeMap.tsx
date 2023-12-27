import { ResponsiveContainer, Treemap, Tooltip } from "recharts";
import { FC } from "react";
import { Typography } from "@mui/material";

interface Props {
  loadingData: boolean;
  dataForTreeChart: { name: string; value: number }[];
  selectedServiceIndex: number | null;
  setSelectedServiceIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setDataForAreaChart: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        value: number;
      }[]
    >
  >;
}

const TreeMap: FC<Props> = ({
  loadingData,
  dataForTreeChart,
  setDataForAreaChart,
  selectedServiceIndex,
  setSelectedServiceIndex,
}) => {
  const sumOfTreeChartValues = dataForTreeChart.reduce(
    (sum, data) => (sum += data.value),
    0
  );
  return (
    <ResponsiveContainer width="100%">
      <Treemap
        width={200}
        data={dataForTreeChart}
        aspectRatio={4 / 3}
        dataKey="value"
        content={
          <CustomizedContent
            loading={loadingData}
            selectedIndex={selectedServiceIndex}
            onClickHandler={setSelectedServiceIndex}
            setDataForAreaChart={setDataForAreaChart}
          />
        }
      >
        <Tooltip
          content={
            <CustomTooltipForTreeChart sumOfData={sumOfTreeChartValues} />
          }
        />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default TreeMap;

const CustomizedContent = (props: any) => {
  const {
    depth,
    x,
    y,
    width,
    height,
    index,
    selectedIndex,
    onClickHandler,
    setDataForAreaChart,
    loading,
  } = props;

  const hue = (index * 137.508) % 360;
  let color = `hsl(${hue}, 70%, 60%)`;
  if (index === 0 && loading) color = "#fff";

  return (
    <g
      onClick={() => {
        onClickHandler(index);
      }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          transition: "all .2s linear",
          fill:
            selectedIndex !== null
              ? selectedIndex === index
                ? "black"
                : color
              : color,
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      >
        <title style={{ color: "white" }}>Tooltip text goes here</title>
      </rect>
    </g>
  );
};

interface CustomTooltipForTreeChartProps {
  active?: boolean;
  payload?: any;
  sumOfData?: number;
}

const CustomTooltipForTreeChart: FC<CustomTooltipForTreeChartProps> = ({
  active,
  payload,
  sumOfData = 1,
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          zIndex: "20",
          background: "#fff",
          color: "#333",
          boxShadow: "0 0 14px  rgb(0 0 0 / 40%)",
          padding: "1px",
          textAlign: "left",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            margin: "13px 19px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            fontFamily: "YekanBakh-Regular",
          }}
        >
          <Typography>نام: {payload[0].payload.name}</Typography>
          <Typography>مقدار: {payload[0].payload.value}</Typography>
          <Typography>
            سهم: %{((payload[0].payload.value / sumOfData) * 100).toFixed(2)}
          </Typography>
        </div>
      </div>
    );
  }

  return null;
};
