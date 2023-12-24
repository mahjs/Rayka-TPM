// import ClientApi from "./clientApi";
import { AxiosReturnType } from "./config";

// const axios = new ClientApi();

import axios from "axios";

export interface Domain {
  name: string;
}

interface IpAddressReturnType {
  domain: string;
  ips: string[];
}

export const getAllDomains = async (): Promise<AxiosReturnType<Domain[]>> =>
  await axios.get("http://2.189.59.122:2312/domains");

export const getIpAddressesForDomain = async (
  domain: string
): Promise<AxiosReturnType<IpAddressReturnType>> =>
  await axios.get(`http://2.189.59.122:2312/get-ip/${domain}`);
