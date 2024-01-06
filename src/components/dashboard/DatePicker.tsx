import { Calendar, CalendarProvider } from "zaman";

interface RangeDatePickerProps {
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

const RangeDatePicker: React.FC<RangeDatePickerProps> = ({
  setStartDate,
  setEndDate,
}) => {
  return (
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
  );
};

export default RangeDatePicker;
