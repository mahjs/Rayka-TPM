import { useEffect, useState } from "react";
import api from "../services";

const useBlackListDomains = () => {
  const [blackListDomains, setBlackListDomains] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const refetch = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    api.domain
      .getBlackListDomains()
      .then((response) => {
        if (response && response.blacklisted_domains) {
          setBlackListDomains(response.blacklisted_domains);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [refresh]);

  return {
    blackListDomains,
    loading,
    refetch
  };
};

export default useBlackListDomains;
