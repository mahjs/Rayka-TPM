import { Calendar, CalendarProvider } from "zaman";

interface RangeDatePickerProps {
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const RangeDatePicker: React.FC<RangeDatePickerProps> = ({
  setStartDate,
  setEndDate,
  handleClose,
}) => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: "-80%",
          right: "-10%",
        }}
        onClick={() => handleClose(false)}
      />
      <div
        className="date"
        dir="rtl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CalendarProvider locale="fa" round="x4" accentColor="#8884d8">
          <Calendar
            className="rtl"
            onChange={(e) => {
              setStartDate(new Date(e.from));
              setEndDate(new Date(e.to));
            }}
            range
            weekends={[6]}
          />
        </CalendarProvider>
      </div>
    </>
  );
};

export default RangeDatePicker;
