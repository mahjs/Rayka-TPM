import axios from "axios";

const now = new Date();

const oneHourAgo = Math.floor(Date.now() / 1000) - 3600;
const oneDayAgo = Math.floor(
  new Date(now.getTime() - 86400000).getTime() / 1000
);
const oneWeekAgo = Math.floor(
  new Date(now.getTime() - 604800000).getTime() / 1000
);
const oneMonthAgo = Math.floor(
  new Date(now.setMonth(now.getMonth() - 1)).getTime() / 1000
);
const oneYearAgo = Math.floor(
  new Date(now.setFullYear(now.getFullYear() - 1)).getTime() / 1000
);

export interface DataForChart {
  itemid: string;
  clock: string;
  value: string;
  ns: string;
}

const getReceiveServerId = (server: string) => {
  switch (server) {
    case "server1":
      return "46427";
    case "server2":
      return "46655";
    case "server3":
      return "46774";
    case "server4":
      return "47405";
    case "server5":
      return "47199";
    case "server6":
      return "47311";
    case "switch_in":
      return "47707";
    case "switch_out":
      return "48493";
    default:
      return "46427";
  }
};

const getSendServerId = (server: string) => {
  switch (server) {
    case "server1":
      return "46451";
    case "server2":
      return "46691";
    case "server3":
      return "46810";
    case "server4":
      return "47447";
    case "server5":
      return "47235";
    case "server6":
      return "47335";
    case "switch_in":
      return "47908";
    case "switch_out":
      return "48670";
    default:
      return "46427";
  }
};

export const getReceiveData = (time: string, server: string) =>
  axios.post(
    "http://10.201.228.63/api_jsonrpc.php",
    {
      jsonrpc: "2.0",
      method: "history.get",
      params: {
        output: "extend",
        history: 3,
        itemids: [getReceiveServerId(server)],
        sortfield: "clock",
        sortorder: "DESC",
        time_from:
          time === "Hour"
            ? oneHourAgo
            : time === "Day"
            ? oneDayAgo
            : time === "Month"
            ? oneMonthAgo
            : time === "Week"
            ? oneWeekAgo
            : oneYearAgo
      },
      auth: "36bf4f4fd33d69244291a231b03bca14f20df7e3d504624d4c61452c36c23d4e",
      id: 1
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
export const getReceiveDataForCustomDate = (
  timeFrom: number,
  timeTill: number,
  server: string
) =>
  axios.post(
    "http://10.201.228.63/api_jsonrpc.php",
    {
      jsonrpc: "2.0",
      method: "history.get",
      params: {
        output: "extend",
        history: 3,
        itemids: [getReceiveServerId(server)],
        sortfield: "clock",
        sortorder: "DESC",
        time_from: timeFrom,
        time_till: timeTill
      },
      auth: "36bf4f4fd33d69244291a231b03bca14f20df7e3d504624d4c61452c36c23d4e",
      id: 1
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

export const getSendData = (time: string, server: string) =>
  axios.post(
    "http://10.201.228.63/api_jsonrpc.php",
    {
      jsonrpc: "2.0",
      method: "history.get",
      params: {
        output: "extend",
        history: 3,
        itemids: [getSendServerId(server)],
        sortfield: "clock",
        sortorder: "DESC",
        time_from:
          time === "Hour"
            ? oneHourAgo
            : time === "Day"
            ? oneDayAgo
            : time === "Month"
            ? oneMonthAgo
            : time === "Week"
            ? oneWeekAgo
            : oneYearAgo
      },
      auth: "36bf4f4fd33d69244291a231b03bca14f20df7e3d504624d4c61452c36c23d4e",
      id: 1
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
export const getSendDataForCustomDate = (
  timeFrom: number,
  timeTill: number,
  server: string
) => {
  return axios.post(
    "http://10.201.228.63/api_jsonrpc.php",
    {
      jsonrpc: "2.0",
      method: "history.get",
      params: {
        output: "extend",
        history: 3,
        itemids: [getSendServerId(server)],
        sortfield: "clock",
        sortorder: "DESC",
        time_from: timeFrom,
        time_till: timeTill
      },
      auth: "36bf4f4fd33d69244291a231b03bca14f20df7e3d504624d4c61452c36c23d4e",
      id: 1
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
