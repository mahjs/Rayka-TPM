const convertToPersianWordNumber = (number: number) => {
  switch (number) {
    case 1:
      return "یک";
    case 2:
      return "دو";
    case 3:
      return "سه";
    case 4:
      return "چهار";
    case 5:
      return "پنج";
    case 6:
      return "شش";
    case 7:
      return "هفت";
    case 8:
      return "هشت";
    case 9:
      return "نه";
    case 10:
      return "ده";

    default:
      return number;
  }
};

export default convertToPersianWordNumber;
