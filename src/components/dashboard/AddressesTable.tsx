import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import AddIpAddressesModal from "./AddIpAddressesModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import api from "../../services";

interface Props {
  selectedServiceIndex: number | null;
  loading: boolean;
  addressesData: string[] | null;
  addressesDownloadData: string[] | null;
  setAddressesDownloadData: React.Dispatch<
    React.SetStateAction<string[] | null>
  >;

  domainName: string | null;
  refetchIpAddresses: () => void;
}

const AddressesTable: FC<Props> = ({
  selectedServiceIndex,
  loading,
  addressesData,
  domainName,
  refetchIpAddresses,
  addressesDownloadData,
  setAddressesDownloadData,
}) => {
  const [addressTablePage, setAddressTablePage] = useState(1);
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setAddressTablePage(value);
  };

  useEffect(() => {
    setAddressTablePage(1);
  }, [selectedServiceIndex, loading]);

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
      });
  };

  return (
    <>
      <Box
        sx={{
          width: "50%",
        }}
      >
        <Stack direction="row" gap="1rem">
          <Typography
            component="h3"
            fontFamily="YekanBakh-Medium"
            sx={{
              fontSize: "1.5rem",
            }}
          >
            آدرس‌های IP
          </Typography>

          {selectedServiceIndex !== null && (
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
          )}
          {selectedAddresses.length > 0 && (
            <Button
              onClick={handleDeleteIpsFromDomain}
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
        </Stack>
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
              آدرس IP
            </Typography>
          </Box>

          {/* Table Body */}
          <Box
            sx={{
              position: "relative",
              minHeight: "73dvh",
              border: "1px solid #E3E3E3",
              borderRadius: ".5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {loading && (
              <CircularProgress
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50% -50%)",
                }}
              />
            )}
            {/* Rows for the body */}
            {selectedServiceIndex !== null &&
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
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      sx={{
                        padding: ".1rem",
                      }}
                      onChange={(e) => handleSelectIps(e, address)}
                    />
                    <Typography
                      marginLeft="auto"
                      marginRight="2rem"
                      fontFamily="YekanBakh-Regular"
                    >
                      {/* {address.session} */}
                      5254
                    </Typography>
                    <Typography
                      fontFamily="YekanBakh-Regular"
                      sx={{
                        marginLeft: "1rem",
                        direction: "ltr",
                        display: "flex",
                        minWidth: "120px",
                      }}
                    >
                      <span>{index + 1}.</span>
                      <span style={{ textAlign: "left", marginLeft: "1rem" }}>
                        {address}
                      </span>
                    </Typography>
                  </Box>
                ))}
            {selectedServiceIndex === null && (
              <Typography
                fontFamily="YekanBakh-Regular"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "200px",
                  textAlign: "center",
                }}
              >
                برای مشاهده آدرس های IP یک سرویس را از منوی سرویس ها انتخاب
                کنید.
              </Typography>
            )}
            {selectedServiceIndex !== null && !loading && (
              <Pagination
                sx={{
                  direction: "ltr",
                  marginTop: "auto",
                  marginBottom: "1rem",
                  marginX: "auto",
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
          {/* <Typography
            fontFamily="YekanBakh-Light"
            sx={{
              textAlign: "left",
              color: "gray",
            }}
          >
            Powered By{" "}
            <span style={{ color: "black", fontFamily: "YekanBakh-Bold" }}>
              Rayka
            </span>
          </Typography> */}
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
