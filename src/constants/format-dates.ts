import { addDays, isSaturday, isSunday, setHours, setMinutes, setSeconds, format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

export function addBusinessDays(date: Date, businessDaysToAdd: number): Date {
  let daysAdded = 0;
  let resultDate = date;

  while (daysAdded < businessDaysToAdd) {
    resultDate = addDays(resultDate, 1); // Sumamos un día a la vez

    // Verificamos si es sábado o domingo
    if (!isSaturday(resultDate) && !isSunday(resultDate)) {
      daysAdded++; // Solo sumamos si es un día hábil
    }
  }

  // Establecemos la hora a las 23:59:59
  resultDate = setHours(resultDate, 23);
  resultDate = setMinutes(resultDate, 59);
  resultDate = setSeconds(resultDate, 59);

  return resultDate;
}



export function newDateTz(date: Date = new Date()): Date {
  const timeZone = 'America/Bogota';


  const zonedDate = fromZonedTime(date, timeZone);

  // Formatea la fecha en el formato deseado (puedes personalizar el formato)
  return zonedDate
}

