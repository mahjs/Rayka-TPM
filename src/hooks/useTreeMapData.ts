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
  const [loadingData, setLoadingData] = useState<boolean>(false);
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
  };
};

export default useTreeMapData;
