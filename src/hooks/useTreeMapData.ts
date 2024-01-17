import { useEffect, useState } from "react";
import useDomains from "./useDomains";
import api from "../services";

export interface MapData {
  name: string;
  value: number;
  ips: string[];
}

const useTreeMapData = () => {
  const { domains, loadingDomains, reFetchDomains } = useDomains();
  const [treeMapData, setTreeMapData] = useState<MapData[]>([]);
  const [totalIps, setTotalIps] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [refetchData, setRefetchData] = useState<boolean>(false);

  const refetch = () => {
    reFetchDomains();
    setRefetchData((prev) => !prev);
  };

  useEffect(() => {
    if (loadingData) return;
    setTotalIps(treeMapData.map((data) => data.ips).flat());
  }, [loadingData, treeMapData]);

  useEffect(() => {
    if (!domains) return;
    setLoadingData(true);
    Promise.all(
      domains.map((domain) =>
        api.domain.getIpAddressesForDomain(domain.name).then((res) => ({
          name: res.domain,
          value: res.ips.length,
          ips: res.ips
        }))
      )
    ).then((res) => {
      setTreeMapData(res);
      setLoadingData(false);
    });
  }, [domains, loadingDomains, refetchData]);

  return {
    loadingData,
    treeMapData,
    totalIps,
    refetch
  };
};

export default useTreeMapData;
