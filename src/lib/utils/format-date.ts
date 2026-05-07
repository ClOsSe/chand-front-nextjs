type CalendarType = "jalali" | "gregorian";
export function formatDate(
  date:Date,
  calenderType:CalendarType,
){
  const isJalali = calenderType === 'jalali'
  const formatter = new Intl.DateTimeFormat(isJalali ? "fa-IR" : "en-CA",{
    calendar: isJalali ? "persian" : "gregory",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
   return formatter.format(date);
}