import { Box, Pagination, Typography } from "@mui/material";
import { FC, useState } from "react";

interface Props {
  selectedServiceIndex: number | null;
  addressesData: { ip: string; session: string }[];
}

const AddressesTable: FC<Props> = ({ selectedServiceIndex, addressesData }) => {
  const [addressTablePage, setAddressTablePage] = useState(1);
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setAddressTablePage(value);
  };

  return (
    <Box
      sx={{
        width: "50%",
      }}
    >
      <Typography
        component="h3"
        fontFamily="YekanBakh-Medium"
        sx={{
          fontSize: "1.5rem",
        }}
      >
        آدرس‌های IP
      </Typography>

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
          <Typography fontFamily="YekanBakh-Regular">تعداد سشن‌ ها</Typography>
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
            minHeight: "70dvh",
            border: "1px solid #E3E3E3",
            borderRadius: ".5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Rows for the body */}
          {selectedServiceIndex !== null &&
            addressesData
              .slice(
                (addressTablePage - 1) * 10,
                Math.min((addressTablePage - 1) * 10 + 10, addressesData.length)
              )
              .map((address, index) => (
                <Box
                  sx={{
                    padding: ".7rem .5rem",
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                >
                  <Typography marginRight="2rem" fontFamily="YekanBakh-Regular">
                    {address.session}
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
                    <span style={{ marginLeft: "auto" }}>{address.ip}</span>
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
              برای مشاهده آدرس های IP یک سرویس را از منوی سرویس ها انتخاب کنید.
            </Typography>
          )}
          {selectedServiceIndex !== null && (
            <Pagination
              sx={{
                direction: "ltr",
                marginTop: "auto",
                marginBottom: "1rem",
                marginX: "auto",
              }}
              color="primary"
              onChange={handleChangePage}
              count={Math.ceil(addressesData.length / 10)}
              variant="outlined"
              shape="rounded"
              hidePrevButton
              hideNextButton
            />
          )}
        </Box>
        <Typography
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
        </Typography>
      </Box>
    </Box>
  );
};

export default AddressesTable;
