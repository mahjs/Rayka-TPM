import { useEffect, useState } from "react";
import api from "../services";
import { Blacklist } from "../services/domain";

const useBlackListIps = () => {
  const [blackListIps, setBlackListIps] = useState<Blacklist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const refetch = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    api.domain
      .getBlackListIps()
      .then((response) => {
        if (response && response) {
          setBlackListIps(response);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [refresh]);

  return {
    blackListIps,
    loading,
    refetch
  };
};

export default useBlackListIps;
