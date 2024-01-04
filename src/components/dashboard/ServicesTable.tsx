import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { GoPlus } from "react-icons/go";
import { useRef, useEffect, FC, useState } from "react";
import { IoChevronDown, IoFilterOutline } from "react-icons/io5";
import { Domain } from "../../services/domain";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddDomainModal from "./AddDomainModal";
import api from "../../services";

interface Props {
  loading: boolean;
  domains: Domain[] | null;
  refetchDomains: () => void;
  refetchIpAddresses: () => void;
  selectedServiceIndex: number | null;
  setSelectedServiceIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setDataForAreaChart: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        value: number;
      }[]
    >
  >;
}

const ServicesTable: FC<Props> = ({
  loading,
  domains,
  refetchDomains,
  refetchIpAddresses,
  selectedServiceIndex,
  setDataForAreaChart,
  setSelectedServiceIndex,
}) => {
  // Scroll to selected service
  const dataRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    if (
      selectedServiceIndex !== null &&
      dataRefs.current[selectedServiceIndex]
    ) {
      dataRefs.current[selectedServiceIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });

  const [openAddDomainModal, setOpenAddDomainModal] = useState<boolean>(false);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const handleSelectDomain = (
    event: React.ChangeEvent<HTMLInputElement>,
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
          width: "50%",
        }}
      >
        <Box
          sx={{
            // marginTop: "-1rem",
            display: "flex",
            alignItems: "center",
            gap: ".3rem",
          }}
        >
          <Typography
            fontFamily="YekanBakh-Medium"
            component="h3"
            sx={{
              fontSize: "1.5rem",
              whiteSpace: "nowrap",
            }}
          >
            سرویس ها
          </Typography>
          <Button
            onClick={() => setOpenAddDomainModal(true)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".3rem",
              background: "#0F6CBD",
              color: "#fff",
              fontFamily: "YekanBakh-Regular",
              borderRadius: ".5rem",
              ":hover": {
                background: "#0F6CBD",
                color: "#fff",
              },
            }}
          >
            <GoPlus style={{ width: "20px", height: "20px" }} />
            افزودن
          </Button>

          {selectedDomains.length > 0 && (
            <Button
              onClick={handleDeleteDomains}
              sx={{
                color: "red",
                fontFamily: "YekanBakh-Regular",
                display: "flex",
                alignItems: "center",
                gap: ".3rem",
              }}
            >
              <RiDeleteBin6Line
                style={{
                  width: "15px",
                  height: "15px",
                  color: "red",
                }}
              />
              حذف
            </Button>
          )}

          <Box
            sx={{
              position: "relative",
              marginRight: "auto",
              marginLeft: "1rem",
            }}
          >
            <Select
              IconComponent={IoChevronDown}
              label="فیلتر سرویس ها"
              value=""
              sx={{
                minWidth: "4rem",
                height: "2rem",
                paddingX: ".5rem",
                ".MuiSelect-icon": {
                  width: "20px",
                  height: "20px",
                  marginTop: "-.20rem",
                },
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
              }}
            >
              <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="weekly">
                هفتگی
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "YekanBakh-Regular" }}
                value="monthly"
              >
                ماهانه
              </MenuItem>
              <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="year">
                سالانه
              </MenuItem>
            </Select>
            <IoFilterOutline
              style={{
                position: "absolute",
                top: "40%",
                left: ".2rem",
                transform: "translateY(-50%)",
                width: "25px",
                height: "25px",
                color: "gray",
                zIndex: "-1",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: ".2rem",
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
              borderRadius: ".5rem",
            }}
          >
            <Typography fontFamily="YekanBakh-Regular">
              تعداد سشن‌ ها
            </Typography>
            <Typography
              fontFamily="YekanBakh-Regular"
              sx={{
                marginLeft: "4rem",
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
              gap: ".2rem",
            }}
          >
            {/* Table Body */}
            {loading && (
              <CircularProgress
                sx={{
                  margin: "auto",
                }}
              />
            )}
            {domains &&
              domains.map((domain, index) => (
                <Box
                  ref={(el: HTMLDivElement) => (dataRefs.current[index] = el)}
                  key={domain.name}
                  sx={{
                    background: selectedServiceIndex === index ? "#5E819F" : "",
                    color: selectedServiceIndex === index ? "#fff" : "",
                    transition: "all .2s linear",
                    cursor: "pointer",
                    padding: ".8rem .5rem",
                    alignItems: "center",
                    justifyContent: "space-between",
                    display: "flex",
                    borderRadius: ".5rem",
                    border: "1px solid #E3E3E3",
                    fontFamily: "SegoeUI",
                    position: "relative",
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
                      borderRadius: "1rem",
                    }}
                    onClick={() => {
                      // setDataForAreaChart((prevData) =>
                      //   prevData.map((data) => ({
                      //     ...data,
                      //     value: Math.round(Math.random() * 150),
                      //   }))
                      // );

                      if (selectedServiceIndex === index)
                        setSelectedServiceIndex(null);
                      else setSelectedServiceIndex(index);
                    }}
                  />
                  <Checkbox
                    onChange={(e) => handleSelectDomain(e, domain.name)}
                    sx={{
                      zIndex: "100",
                      padding: ".1rem",
                      background: "#fff",
                      ":hover": {
                        background: "#fff",
                      },
                    }}
                  />
                  <Typography
                    marginLeft="auto"
                    marginRight="1.5rem"
                    fontFamily="SegoeUI"
                  >
                    5254
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: ".6rem",
                      direction: "ltr",
                      display: "flex",
                      gap: "1.5rem",
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
    </>
  );
};

export default ServicesTable;
