import { useState } from "react";
import { Domain } from "../services/domain";
import { useEffect } from "react";
import api from "../services";

const useDomains = () => {
  const [domains, setDomains] = useState<Domain[] | null>(null);

  const [loadingDomains, setLoadingDomains] = useState<boolean>(false);

  const [revalidateDomains, setRevalidateDomains] = useState<boolean>(false);

  const reFetchDomains = () => {
    setRevalidateDomains((prev) => !prev);
  };

  useEffect(() => {
    setLoadingDomains(true);
    api.domain.getAllDomains().then((res) => {
      setDomains(res);
      setLoadingDomains(false);
    });
  }, [revalidateDomains]);

  return {
    domains,
    loadingDomains,
    reFetchDomains,
  };
};

export default useDomains;
