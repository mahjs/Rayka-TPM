import { useEffect, useState } from "react";
import useDomains from "./useDomains";
import api from "../services";

interface MapData {
  name: string;
  value: number;
}

const useTreeMapData = () => {
  const { domains, loadingDomains } = useDomains();
  const [treeMapData, setTreeMapData] = useState<MapData[]>([]);
  const [totalIps, setTotalIps] = useState<number>(0);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  useEffect(() => {
    if (loadingData) return;
    setTotalIps(treeMapData.reduce((acc, cur) => acc + cur.value, 0));
  }, [loadingData, treeMapData]);

  useEffect(() => {
    if (!domains) return;
    setLoadingData(true);
    Promise.all(
      domains.map((domain) =>
        api.domain
          .getIpAddressesForDomain(domain.name)
          .then((res) => ({ name: res.domain, value: res.ips.length }))
      )
    ).then((res) => {
      setTreeMapData(res);
      setLoadingData(false);
    });
  }, [domains, loadingDomains]);

  return {
    loadingData,
    treeMapData,
    totalIps,
  };
};

export default useTreeMapData;
