import { ChartDataFormat } from "../components/dashboard/areaChat/AreaChart";
import { DataForChart } from "../services/chart";
import formatDateForAreaChart from "./formatDateForAreaChart";

export default function convertDataForAreaChart(
  data: [DataForChart[], DataForChart[]]
): ChartDataFormat {
  const smallerIndex = Math.min(data[0].length, data[1].length);
  const formattedData: ChartDataFormat = {
    date: [],
    time: [],
    send: [],
    receive: []
  };

  for (let i = 0; i < smallerIndex; i++) {
    formattedData.date.push(
      formatDateForAreaChart(new Date(+data[0][i].clock * 1000))[2]
    );
    formattedData.time.push(
      formatDateForAreaChart(new Date(+data[0][i].clock * 1000))[0]
    );
    formattedData.send.push(+(+data[1][i].value / 10 ** 9).toFixed(2));
    formattedData.receive.push(+(+data[0][i].value / 10 ** 9).toFixed(2));
  }
  return formattedData;
}
