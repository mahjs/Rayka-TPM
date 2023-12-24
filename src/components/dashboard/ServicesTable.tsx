import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useRef, useEffect, FC } from "react";
import { IoChevronDown, IoFilterOutline } from "react-icons/io5";
import { Domain } from "../../services/domain";

interface Props {
  loading: boolean;
  domains: Domain[] | null;
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
  selectedServiceIndex,
  setDataForAreaChart,
  setSelectedServiceIndex,
}) => {
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

  return (
    <Box
      sx={{
        width: "50%",
      }}
    >
      <Stack direction="row" alignItems="center" gap="1rem">
        <Typography
          fontFamily="YekanBakh-Medium"
          component="h3"
          sx={{
            fontSize: "1.5rem",
          }}
        >
          سرویس ها
        </Typography>

        <Box
          sx={{
            position: "relative",
          }}
        >
          <Select
            IconComponent={IoChevronDown}
            label="فیلتر سرویس ها"
            value=""
            sx={{
              minWidth: "180px",
              padding: ".5rem",
              border: "1px solid transparent",
              borderBottomColor: "gray",
              paddingBottom: "0",
              ".MuiSelect-icon": {
                width: "25px",
                height: "25px",
              },
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
              ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                {
                  padding: "0",
                },
            }}
          >
            <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="weekly">
              هفتگی
            </MenuItem>
            <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="monthly">
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
          <Typography
            fontFamily="YekanBakh-Thin"
            sx={{
              position: "absolute",
              color: "#707070aa",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "-1",
            }}
          >
            فیلتر بر اساس
          </Typography>
        </Box>
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
          <Typography fontFamily="YekanBakh-Regular">تعداد سشن‌ ها</Typography>
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
                key={index}
                onClick={() => {
                  setDataForAreaChart((prevData) =>
                    prevData.map((data) => ({
                      ...data,
                      value: Math.round(Math.random() * 150),
                    }))
                  );

                  if (selectedServiceIndex === index)
                    setSelectedServiceIndex(null);
                  else setSelectedServiceIndex(index);
                }}
                sx={{
                  background: selectedServiceIndex === index ? "#5E819F" : "",
                  color: selectedServiceIndex === index ? "#fff" : "",
                  transition: "all .2s linear",
                  cursor: "pointer",
                  padding: ".8rem .5rem",
                  justifyContent: "space-between",
                  display: "flex",
                  borderRadius: ".5rem",
                  border: "1px solid #E3E3E3",
                  fontFamily: "SegoeUI",
                }}
              >
                <Typography marginRight="1.5rem" fontFamily="SegoeUI">
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
                  {domain.name}.com
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ServicesTable;
