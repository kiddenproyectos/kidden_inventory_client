export function excelSerialDateToJSDate(serial) {
  let fractionalDay = serial - Math.floor(serial) + 0.0000001;

  let totalSeconds = Math.floor(86400 * fractionalDay);

  let seconds = totalSeconds % 60;
  totalSeconds -= seconds;

  let hours = Math.floor(totalSeconds / (60 * 60));
  totalSeconds -= hours * 60 * 60;

  let minutes = Math.floor(totalSeconds / 60);
  // No necesitamos los segundos

  // Formatea la hora en el formato deseado (HH:mm)
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return formattedTime;
}
