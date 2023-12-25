import ClientApi from "./clientApi";
import config from "./config";

const axios = new ClientApi();

export interface Domain {
  name: string;
}

interface IpAddressReturnType {
  domain: string;
  ips: string[];
}

export const getAllDomains = async (): Promise<Domain[]> =>
  await axios.http.get(config.rootAddress + "/domains");

export const getIpAddressesForDomain = async (
  domain: string
): Promise<IpAddressReturnType> =>
  await axios.http.get(`${config.rootAddress}/get-ip/${domain}`);

export const addDomain = async (domains: string[]) =>
  await axios.http.post(config.rootAddress + "/add-domain", {
    names: domains,
  });

export const addIpAddressesToDomain = async (domain: string, ips: string[]) =>
  await axios.http.post(config.rootAddress + "/add-ip", {
    domain,
    ip_addresses: ips,
  });
