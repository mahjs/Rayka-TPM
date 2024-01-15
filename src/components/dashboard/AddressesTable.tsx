import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import AddIpAddressesModal from "./AddIpAddressesModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import api from "../../services";
import ExpressionValue from "./ExpressionValue";
import { IoChevronDown, IoFilterOutline } from "react-icons/io5";
import { useAuth } from "../../contexts/authContext";
import { IpWithProvider } from "../../services/domain";

interface Props {
  showData: boolean;
  loading: boolean;
  showAddButton: boolean;
  isWithProvider?: boolean;
  ipsWithProvider?: IpWithProvider[];
  addressesData: string[] | null;
  domainName: string | null;
  refetchIpAddresses: () => void;
  selectedAddress: string | null;
  setSelectedAddress: React.Dispatch<React.SetStateAction<string | null>>;
  selectedFilter: "All_IPs" | "CDN" | "Host";
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<"All_IPs" | "CDN" | "Host">
  >;
}

const AddressesTable: FC<Props> = ({
  showData,
  isWithProvider = false,
  ipsWithProvider = [],
  loading,
  showAddButton,
  addressesData,
  domainName,
  refetchIpAddresses,
  selectedAddress,
  setSelectedAddress,
  selectedFilter,
  setSelectedFilter
}) => {
  const { isAdmin } = useAuth();

  const [addressTablePage, setAddressTablePage] = useState(1);
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setAddressTablePage(value);
  };

  useEffect(() => {
    setAddressTablePage(1);
  }, [showData, loading]);

  const [openAddAddressModal, setOpenAddDomainModal] = useState(false);

  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);

  const handleSelectIps = (
    _event: React.ChangeEvent<HTMLInputElement>,
    address: string
  ) => {
    const prevAddresses = [...selectedAddresses];
    const index = prevAddresses.indexOf(address);
    if (index !== -1) prevAddresses.splice(index, 1);
    else prevAddresses.push(address);
    setSelectedAddresses(prevAddresses);
  };

  const handleDeleteIpsFromDomain = () => {
    api.domain
      .deleteIpAddressesFromDomain(domainName!, selectedAddresses)
      .then(() => {
        refetchIpAddresses();
        setSelectedAddresses([]);
        setSelectedAddress(null);
      });
  };

  return (
    <>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}
      >
        <Stack direction="row" gap=".25rem">
          <Typography
            component="h3"
            fontFamily="YekanBakh-Medium"
            sx={{
              fontSize: "1.5rem"
            }}
          >
            آدرس‌های IP
          </Typography>

          {showAddButton && isAdmin && (
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
                  color: "#fff"
                }
              }}
            >
              <GoPlus style={{ width: "20px", height: "20px" }} />
              افزودن
            </Button>
          )}

          <Box
            sx={{
              position: "relative",
              marginRight: "auto"
            }}
          >
            <Select
              IconComponent={IoChevronDown}
              label="فیلتر سرویس ها"
              value={selectedFilter}
              onChange={(e) =>
                setSelectedFilter(e.target.value as "All_IPs" | "CDN" | "Host")
              }
              sx={{
                position: "absolute",
                left: "-1rem",
                height: "2rem",
                ".MuiSelect-icon": {
                  width: "20px",
                  height: "20px",
                  marginTop: "-.20rem"
                },
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0
                  }
              }}
            >
              <MenuItem
                sx={{ fontFamily: "YekanBakh-Regular" }}
                value="All_IPs"
              >
                همه آی‌پی ها
              </MenuItem>
              <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="CDN">
                CDN
              </MenuItem>
              <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="Host">
                Host
              </MenuItem>
            </Select>
          </Box>
        </Stack>
        <Box
          sx={{
            marginTop: "-1rem",
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
              justifyContent: "end",
              display: "flex",
              borderRadius: ".5rem",
              position: "relative"
            }}
          >
            {/* <Typography fontFamily="YekanBakh-Regular" marginRight="2rem">
              تعداد سشن‌ ها
            </Typography> */}
            {selectedAddresses.length > 0 && isAdmin && (
              <Button
                onClick={handleDeleteIpsFromDomain}
                sx={{
                  color: "red",
                  fontFamily: "YekanBakh-Regular",
                  display: "flex",
                  alignItems: "center",
                  gap: ".3rem",
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  transform: "translate(0, -50%)"
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
            <Typography
              fontFamily="YekanBakh-Regular"
              sx={{
                marginLeft: "3rem"
              }}
            >
              آدرس IP
            </Typography>
          </Box>

          {/* Table Body */}
          <Box
            sx={{
              position: "relative",
              minHeight: "38dvh",
              border: "1px solid #E3E3E3",
              borderRadius: ".5rem",
              display: "flex",
              flexDirection: "column",
              gap: ".2rem"
            }}
          >
            {loading && (
              <CircularProgress
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: "45%",
                  transform: "translate(-50% -50%)",
                  zIndex: 110
                }}
              />
            )}
            {/* Rows for the body */}
            {showData &&
              !isWithProvider &&
              addressesData &&
              addressesData
                .slice(
                  (addressTablePage - 1) * 10,
                  Math.min(
                    (addressTablePage - 1) * 10 + 10,
                    addressesData.length
                  )
                )
                .map((address, index) => (
                  <Box
                    key={address}
                    sx={{
                      padding: ".7rem .5rem",
                      paddingBottom: ".25rem",
                      justifyContent: "space-between",
                      display: "flex",
                      alignItems: "center",
                      background:
                        selectedAddress === address ? "#5E819F" : "#fff",
                      color: selectedAddress === address ? "#fff" : "",
                      borderRadius: ".5rem",
                      cursor: "pointer",
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
                        if (selectedAddress === address)
                          setSelectedAddress(null);
                        else setSelectedAddress(address);
                      }}
                    />
                    <Checkbox
                      sx={{
                        zIndex: "100",
                        marginBottom: ".3rem",
                        padding: ".1rem",
                        background: "#fff",
                        borderRadius: ".2rem",
                        ":hover": {
                          background: "#fff"
                        }
                      }}
                      onChange={(e) => handleSelectIps(e, address)}
                    />
                    {/* <Typography
                      marginLeft="auto"
                      marginRight="2rem"
                      fontFamily="YekanBakh-Regular"
                    >
                      {address.session}
                      5254
                    </Typography> */}
                    <Typography
                      fontFamily="YekanBakh-Regular"
                      sx={{
                        marginLeft: "1rem",
                        direction: "ltr",
                        display: "flex",
                        minWidth: "120px"
                      }}
                    >
                      <span>{index + 1}.</span>
                      <span style={{ textAlign: "left", marginLeft: "1rem" }}>
                        {address}
                      </span>
                    </Typography>
                  </Box>
                ))}
            {isWithProvider &&
              !loading &&
              showData &&
              ipsWithProvider &&
              ipsWithProvider
                .slice(
                  (addressTablePage - 1) * 5,
                  Math.min(
                    (addressTablePage - 1) * 5 + 5,
                    ipsWithProvider.length
                  )
                )
                .map((address, index) => (
                  <Box
                    key={address.ip}
                    sx={{
                      padding: ".7rem .5rem",
                      paddingBottom: ".25rem",
                      justifyContent: "space-between",
                      display: "flex",
                      alignItems: "center",
                      background:
                        selectedAddress === address.ip ? "#5E819F" : "#fff",
                      color: selectedAddress === address.ip ? "#fff" : "",
                      borderRadius: ".5rem",
                      cursor: "pointer",
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
                        if (selectedAddress === address.ip)
                          setSelectedAddress(null);
                        else setSelectedAddress(address.ip);
                      }}
                    />
                    <Checkbox
                      sx={{
                        zIndex: "100",
                        marginBottom: ".3rem",
                        padding: ".1rem",
                        background: "#fff",
                        borderRadius: ".2rem",
                        ":hover": {
                          background: "#fff"
                        }
                      }}
                      onChange={(e) => handleSelectIps(e, address.ip)}
                    />
                    {/* <Typography
                      marginLeft="auto"
                      marginRight="2rem"
                      fontFamily="YekanBakh-Regular"
                    >
                      {address.session}
                      5254
                    </Typography> */}
                    <Typography
                      fontFamily="YekanBakh-Regular"
                      sx={{
                        marginLeft: "1rem",
                        direction: "ltr",
                        display: "flex",
                        minWidth: "120px"
                      }}
                    >
                      <span>{index + 1}.</span>
                      <span style={{ textAlign: "left", marginLeft: "1rem" }}>
                        {address.ip}
                        <span
                          style={{
                            fontSize: ".95rem",
                            opacity: ".7",
                            marginLeft: ".2rem"
                          }}
                        >
                          ({address.provider})
                        </span>
                      </span>
                    </Typography>
                  </Box>
                ))}
            {!showData && !loading && (
              <Typography
                fontFamily="YekanBakh-Regular"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "200px",
                  textAlign: "center"
                }}
              >
                برای مشاهده آدرس های IP یک سرویس را از منوی سرویس ها انتخاب
                کنید.
              </Typography>
            )}
            {showData && !loading && (
              <Pagination
                sx={{
                  direction: "ltr",
                  marginTop: "auto",
                  marginBottom: "1rem",
                  marginX: "auto"
                }}
                color="primary"
                onChange={handleChangePage}
                count={Math.ceil(
                  (addressesData && addressesData.length / 10) || 0
                )}
                variant="outlined"
                shape="rounded"
                hidePrevButton
                hideNextButton
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            border: "1px solid #E3E3E3",
            borderRadius: ".5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem"
          }}
        >
          {/* {selectedAddress && ( */}
          <>
            <ExpressionValue
              title="Volume"
              expression="حجم داده مصرفی"
              value={1532}
              unit="mb"
            />
            <Divider
              sx={{
                width: "50%"
              }}
            />
            <ExpressionValue
              title="Sessions"
              expression="تعداد نشست‌ها"
              value={1532}
            />
            <Divider
              sx={{
                width: "50%"
              }}
            />
            <ExpressionValue
              title="Connections"
              expression="تعداد نشست‌های موفق"
              value={1532}
            />
          </>
        </Box>
      </Box>
      <AddIpAddressesModal
        openModal={openAddAddressModal}
        setOpenModal={setOpenAddDomainModal}
        domainName={domainName}
        refetchIpAddresses={refetchIpAddresses}
      />
    </>
  );
};

export default AddressesTable;
