import { ChartDataFormat } from "../components/dashboard/AreaChart";
import { DataForChart } from "../services/chart";
import formatDateForAreaChart from "./formatDateForAreaChart";

export default function convertDataForAreaChart(
  data: [DataForChart[], DataForChart[]]
) {
  const smallerIndex = Math.min(data[0].length, data[1].length);
  const formattedData: ChartDataFormat[] = [];
  for (let i = 0; i < smallerIndex; i++) {
    formattedData.push({
      receiveValue: +data[0][i].value / 10 ** 9,
      sendValue: +data[1][i].value / 10 ** 9,
      time: formatDateForAreaChart(new Date(+data[0][i].clock * 1000))
    });
  }
  return formattedData;
}
