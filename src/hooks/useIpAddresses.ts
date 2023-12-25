import { useState, useEffect } from "react";
import api from "../services";

const useIpAddresses = (domain: string | null) => {
  const [ipAddressesForDomain, setIpAddressesForDomain] = useState<
    string[] | null
  >(null);

  const [loadingAddresses, setLoadingAddresses] = useState<boolean>(false);
  const [revalidateAddresses, setRevalidateAddresses] =
    useState<boolean>(false);

  const reFetchAddresses = () => {
    setRevalidateAddresses((prev) => !prev);
  };

  useEffect(() => {
    if (!domain) return;
    setLoadingAddresses(true);
    setIpAddressesForDomain(null);
    api.domain.getIpAddressesForDomain(domain).then((res) => {
      setIpAddressesForDomain(res.ips);
      setLoadingAddresses(false);
    });
  }, [domain, revalidateAddresses]);

  return {
    ipAddressesForDomain,
    loadingAddresses,
    reFetchAddresses,
  };
};

export default useIpAddresses;
