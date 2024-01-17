import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Typography
} from "@mui/material";
import { GoPlus } from "react-icons/go";
import { useRef, useEffect, FC, useState } from "react";
import { Domain } from "../../services/domain";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddDomainModal from "./AddDomainModal";
import api from "../../services";
import { MapData } from "../../hooks/useTreeMapData";
import { useAuth } from "../../contexts/authContext";
import BlackList from "./BlackList";

interface Props {
  loading: boolean;
  mapData: MapData[];
  loadingMapData: boolean;
  domains: Domain[] | null;
  setDomainsDownloadData: React.Dispatch<React.SetStateAction<Domain[]>>;

  refetchDomains: () => void;
  refetchIpAddresses: () => void;
  selectedServiceIndexs: number[];
  handleSelectedServiceIndex: (index: number) => void;
}
const ServicesTable: FC<Props> = ({
  loading,
  domains,
  mapData,
  loadingMapData,
  refetchDomains,
  refetchIpAddresses,
  selectedServiceIndexs,
  handleSelectedServiceIndex,
  setDomainsDownloadData
}) => {
  const { isAdmin } = useAuth();

  // Scroll to selected service
  const dataRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    if (
      selectedServiceIndexs.length > 0 &&
      dataRefs.current[selectedServiceIndexs[0]]
    ) {
      dataRefs.current[selectedServiceIndexs[0]].scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });
  useEffect(() => {
    if (domains) {
      setDomainsDownloadData(domains);
    }
  }, [domains, setDomainsDownloadData]);

  const [openAddDomainModal, setOpenAddDomainModal] = useState<boolean>(false);
  const [blackListModal, setBlackListModal] = useState<boolean>(false);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const handleSelectDomain = (
    _event: React.ChangeEvent<HTMLInputElement>,
    domain: string
  ) => {
    const prevDomains = [...selectedDomains];
    const index = prevDomains.indexOf(domain);
    if (index !== -1) prevDomains.splice(index, 1);
    else prevDomains.push(domain);
    setSelectedDomains(prevDomains);
  };

  const handleDeleteDomains = () => {
    api.domain.deleteDomains(selectedDomains).then(() => {
      refetchDomains();
      setSelectedDomains([]);
    });
  };

  return (
    <>
      <Box
        sx={{
          width: "50%"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography
              fontFamily="YekanBakh-Medium"
              component="h3"
              sx={{
                fontSize: "1.5rem",
                whiteSpace: "nowrap"
              }}
            >
              سرویس ها
            </Typography>

            {isAdmin && (
              <Button
                onClick={() => setOpenAddDomainModal(true)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  background: "#0F6CBD",
                  color: "#fff",
                  fontFamily: "YekanBakh-Regular",
                  borderRadius: ".5rem",
                  mr: "0.5em",
                  ":hover": {
                    background: "#0F6CBD",
                    color: "#fff"
                  }
                }}
              >
                <GoPlus style={{ width: "20px", height: "20px" }} />
                افزودن
              </Button>
            )}
          </Box>
          <Box sx={{ display: "flex" }}>
            {selectedDomains.length > 0 && isAdmin && (
              <Button
                onClick={handleDeleteDomains}
                sx={{
                  color: "red",
                  fontFamily: "YekanBakh-Regular",
                  display: "flex",
                  alignItems: "center",
                  gap: ".1rem"
                }}
              >
                <RiDeleteBin6Line
                  style={{
                    width: "15px",
                    height: "15px",
                    color: "red"
                  }}
                />
                حذف
              </Button>
            )}
            <Button
              onClick={() => setBlackListModal(true)}
              sx={{
                display: "flex",
                alignItems: "center",
                background: "#0F6CBD",
                color: "#fff",
                fontFamily: "YekanBakh-Regular",
                borderRadius: ".5rem",
                ":hover": {
                  background: "#0F6CBD",
                  color: "#fff"
                }
              }}
            >
              لیست سیاه
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: ".2rem"
          }}
        >
          {/* Table Header*/}
          <Box
            sx={{
              marginTop: ".5rem",
              padding: ".8rem .5rem",
              background: "#E9F1F4",
              justifyContent: "space-between",
              display: "flex",
              borderRadius: ".5rem"
            }}
          >
            <Typography fontFamily="YekanBakh-Regular" marginRight="2.5rem">
              تعداد IP{" "}
            </Typography>
            <Typography
              fontFamily="YekanBakh-Regular"
              sx={{
                marginLeft: "2.5rem"
              }}
            >
              نام وبسایت
            </Typography>
          </Box>
          <Box
            sx={{
              height: "72dvh",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              gap: ".2rem"
            }}
          >
            {/* Table Body */}
            {loading && (
              <CircularProgress
                sx={{
                  margin: "auto"
                }}
              />
            )}

            {domains &&
              domains.map((domain, index) => (
                <Box
                  ref={(el: HTMLDivElement) => (dataRefs.current[index] = el)}
                  key={domain.name}
                  sx={{
                    background: selectedServiceIndexs.some(
                      (searchingIndex) => searchingIndex === index
                    )
                      ? "#5E819F"
                      : "",
                    color: selectedServiceIndexs.some(
                      (searchingIndex) => searchingIndex === index
                    )
                      ? "#fff"
                      : "",
                    transition: "all .2s linear",
                    cursor: "pointer",
                    padding: ".8rem .5rem",
                    alignItems: "center",
                    justifyContent: "space-between",
                    display: "flex",
                    borderRadius: ".5rem",
                    border: "1px solid #E3E3E3",
                    fontFamily: "SegoeUI",
                    position: "relative"
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      height: "100%",
                      width: "85%",
                      left: "0",
                      top: "0",
                      bottom: "0",
                      borderRadius: "1rem"
                    }}
                    onClick={() => {
                      handleSelectedServiceIndex(index);
                    }}
                  />
                  <Checkbox
                    onChange={(e) => handleSelectDomain(e, domain.name)}
                    sx={{
                      zIndex: "100",
                      padding: ".1rem",
                      background: "#fff",
                      borderRadius: ".2rem",
                      ":hover": {
                        background: "#fff"
                      }
                    }}
                  />
                  <Typography
                    marginLeft="auto"
                    marginRight="1.5rem"
                    fontFamily="SegoeUI"
                  >
                    {loadingMapData ? (
                      <CircularProgress size={15} />
                    ) : (
                      mapData.find((data) => data.name === domain.name)?.ips
                        .length || 0
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: ".6rem",
                      direction: "ltr",
                      display: "flex",
                      gap: "1.5rem"
                    }}
                  >
                    <span>{index + 1}.</span>
                    {domain.name}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
      <AddDomainModal
        openModal={openAddDomainModal}
        setOpenModal={setOpenAddDomainModal}
        refetchDomains={refetchDomains}
        refetchIpAddresses={refetchIpAddresses}
      />
      <BlackList openModal={blackListModal} setOpenModal={setBlackListModal} />
    </>
  );
};

export default ServicesTable;
