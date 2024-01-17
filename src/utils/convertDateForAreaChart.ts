import {
  ChartDataFormat,
  ChartDataFormat2
} from "../components/dashboard/areaChat/AreaChart";
import { DataForChart } from "../services/chart";
import formatDateForAreaChart from "./formatDateForAreaChart";

export default function convertDataForAreaChart(
  data: [DataForChart[], DataForChart[]]
): [ChartDataFormat[], ChartDataFormat2] {
  const smallerIndex = Math.min(data[0].length, data[1].length);
  const formattedData: ChartDataFormat[] = [];
  const formattedData2: ChartDataFormat2 = {
    date: [],
    time: [],
    send: [],
    receive: []
  };

  for (let i = 0; i < smallerIndex; i++) {
    formattedData.push({
      receiveValue: +data[0][i].value / 10 ** 9,
      sendValue: +data[1][i].value / 10 ** 9,
      date: formatDateForAreaChart(new Date(+data[0][i].clock * 1000))[1],
      time: formatDateForAreaChart(new Date(+data[0][i].clock * 1000))[0]
    });

    formattedData2.date.push(
      formatDateForAreaChart(new Date(+data[0][i].clock * 1000))[2]
    );
    formattedData2.time.push(
      formatDateForAreaChart(new Date(+data[0][i].clock * 1000))[0]
    );
    formattedData2.send.push(+(+data[1][i].value / 10 ** 9).toFixed(2));
    formattedData2.receive.push(+(+data[0][i].value / 10 ** 9).toFixed(2));
  }
  return [formattedData, formattedData2];
}
