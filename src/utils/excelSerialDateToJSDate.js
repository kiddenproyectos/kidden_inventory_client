export function excelSerialDateToJSDate(serial) {
  let utcDays = Math.floor(serial - 25569);
  let utcValue = utcDays * 86400;
  let dateInfo = new Date(utcValue * 1000);

  let fractionalDay = serial - Math.floor(serial) + 0.0000001;

  let totalSeconds = Math.floor(86400 * fractionalDay);

  let seconds = totalSeconds % 60;
  totalSeconds -= seconds;

  let hours = Math.floor(totalSeconds / (60 * 60));
  totalSeconds -= hours * 60 * 60;

  let minutes = Math.floor(totalSeconds / 60);
  totalSeconds -= minutes * 60;

  dateInfo.setHours(hours, minutes, seconds);

  // Formatea la fecha en un formato personalizado
  const formattedDate = `${dateInfo.getFullYear()}-${(dateInfo.getMonth() + 1).toString().padStart(2, '0')}-${dateInfo
    .getDate()
    .toString()
    .padStart(2, '0')} ${dateInfo.getHours().toString().padStart(2, '0')}:${dateInfo.getMinutes().toString().padStart(2, '0')}:${dateInfo
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;

  return formattedDate;
}
