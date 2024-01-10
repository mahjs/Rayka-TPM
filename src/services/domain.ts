import ClientApi from "./clientApi";
import config from "./config";

const axios = new ClientApi();
export interface Domain {
  name: string;
  ips?: string[]; // Optional property
}

interface IpAddressReturnType {
  domain: string;
  ips: string[];
}

export interface Blacklist {
  ip_address: string;
}

export const getAllDomains = async (): Promise<Domain[]> =>
  await axios.http.get(config.rootAddress + "/domains");

export const getIpAddressesForDomain = async (
  domain: string
): Promise<IpAddressReturnType> =>
  await axios.http.get(`${config.rootAddress}/get-ip/${domain}`);

export const addDomain = async (domains: string[]) =>
  await axios.http.post(config.rootAddress + "/add-domain", {
    names: domains
  });
export const deleteDomains = async (domains: string[]) =>
  await axios.http.post(config.rootAddress + "/delete-domain", {
    names: domains
  });

export const addIpAddressesToDomain = async (domain: string, ips: string[]) =>
  await axios.http.post(config.rootAddress + "/add-ip", {
    domain,
    ip_addresses: ips
  });

export const deleteIpAddressesFromDomain = async (
  domain: string,
  ip_addresses: string[]
) =>
  await axios.http.post(config.rootAddress + "/delete-ips", {
    domain,
    ip_addresses
  });

export const getblacklist = async (): Promise<Blacklist[]> => {
  return await axios.http.get("http://10.201.228.64:5001/list");
};
