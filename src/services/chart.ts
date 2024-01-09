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

export const getReceiveHourlyData = () =>
  axios.get("http://10.201.228.63/api_jsonrpc.php", {
    data: {
      jsonrpc: "2.0",
      method: "history.get",
      params: {
        output: "extend",
        history: 3,
        itemids: ["46427"],
        sortfield: "clock",
        sortorder: "DESC",
        time_from: oneHourAgo
      },
      auth: "36bf4f4fd33d69244291a231b03bca14f20df7e3d504624d4c61452c36c23d4e",
      id: 1
    }
  });
