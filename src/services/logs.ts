import ClientApi from "./clientApi";
import { AxiosReturnType } from "./config";

const axios = new ClientApi();

export interface Log {
  id: number;
  name: string;
  activity: string;
  description: string;
  timeDate: string;
}

export const getAllLogs = (): Promise<{ logs: Log[] }> =>
  axios.http.get("http://185.11.89.120:51731/logs");
