const daysOfWeek = ["Dom", "Lun", "Mar", "Mier", "Jue", "Vier", "Sab"];

export interface DayInfo {
  id: string;
  day: number;
  label: string;
}

const weeksInYearCache = new Map<number, number>();

function getWeeksInYear(year: number): number {
  if (weeksInYearCache.has(year)) {
    return weeksInYearCache.get(year)!;
  }

  const lastDayOfYear = new Date(year, 11, 31);
  const firstSunday = getFirstSundayForYear(year);
  const totalDays = Math.floor(
    (lastDayOfYear.getTime() - firstSunday.getTime()) / (1000 * 60 * 60 * 24)
  );
  const weeks = Math.floor((totalDays + 1) / 7);

  weeksInYearCache.set(year, weeks);
  return weeks;
}

// Función auxiliar para generar un ID único para cada día
function generateDayId(year: number, month: number, day: number): string {
  return `${year}${month.toString().padStart(2, "0")}${day
    .toString()
    .padStart(2, "0")}`;
}

// Función auxiliar para obtener el primer domingo que incluya el 1 de enero del año dado
function getFirstSundayForYear(year: number): Date {
  const janFirst = new Date(year, 0, 1); // 1 de enero del año dado
  const dayOfWeek = janFirst.getDay();
  const offset = dayOfWeek === 0 ? 0 : 0 - dayOfWeek; // Ajuste para incluir el domingo
  janFirst.setDate(janFirst.getDate() + offset);
  return janFirst;
}

// Función para obtener el inicio de una semana específica del año
function getStartOfWeek(year: number, weekNumber: number): Date {
  // Manejo de semanas negativas
  while (weekNumber < 0) {
    year -= 1;
    const weeksInPrevYear = getWeeksInYear(year);
    weekNumber += weeksInPrevYear;
  }

  // Manejo de semanas mayores al total en el año
  const weeksInYear = getWeeksInYear(year);
  while (weekNumber >= weeksInYear) {
    weekNumber -= weeksInYear;
    year += 1;
  }

  const firstSunday = getFirstSundayForYear(year);
  const startOfWeek = new Date(firstSunday);
  startOfWeek.setDate(firstSunday.getDate() + weekNumber * 7); // Avanzar semanas desde el primer domingo
  return startOfWeek;
}

interface IWeekDaysOfYearReturn {
  weeksInYear: number;
  year: number;
  month: number;
  week: DayInfo[];
}
// Sobrecarga de la función principal
function getWeekDaysOfYear(): IWeekDaysOfYearReturn;
function getWeekDaysOfYear(
  targetYear: number | undefined,
  targetWeekNumber: number | undefined
): IWeekDaysOfYearReturn;
function getWeekDaysOfYear(
  targetYear?: number | undefined,
  targetWeekNumber?: number | undefined
): IWeekDaysOfYearReturn {
  // Si no se proporciona year y weekNumber, obtener la semana actual
  if (targetYear === undefined || targetWeekNumber === undefined) {
    const currentDate = new Date();
    targetYear = currentDate.getFullYear();

    // Calcular la semana actual en base al primer domingo que incluya el 1 de enero
    const firstSunday = getFirstSundayForYear(targetYear);
    const daysSinceFirstSunday = Math.floor(
      (currentDate.getTime() - firstSunday.getTime()) / (1000 * 60 * 60 * 24)
    );
    targetWeekNumber = Math.floor(daysSinceFirstSunday / 7);
  }

  const weeksInYear = getWeeksInYear(targetYear);
  if (targetWeekNumber >= weeksInYear) {
    throw new Error(`El año ${targetYear} solo tiene ${weeksInYear} semanas.`);
  }

  const startOfWeek = getStartOfWeek(targetYear, targetWeekNumber); // Día inicial de la semana
  const days: DayInfo[] = [];
  let currentYear: number = 0;
  let currentMonth: number = 0;

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);

    currentYear = currentDate.getFullYear();
    currentMonth = currentDate.getMonth() + 1; // Mes en formato 1-12
    const currentDay = currentDate.getDate();
    const dayLabel = daysOfWeek[i];

    days.push({
      id: generateDayId(currentYear, currentMonth, currentDay),
      day: currentDay,
      label: dayLabel,
    });
  }

  return {
    weeksInYear,
    week: days,
    month: currentMonth - 1,
    year: currentYear,
  };
}

function getCurrentWeekNumber(): number {
  const today = new Date(); // Fecha actual
  const year = today.getFullYear();

  // Obtener el primer domingo que incluye el 1 de enero
  const firstSunday = getFirstSundayForYear(year);

  // Calcular la diferencia en días entre hoy y el primer domingo
  const daysSinceFirstSunday = Math.floor(
    (today.getTime() - firstSunday.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calcular el número de la semana actual
  const currentWeekNumber = Math.floor(daysSinceFirstSunday / 7);

  return currentWeekNumber;
}

export interface ICalculateWeeksInMonthResponse {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
}
// Calcula las semanas de un mes específico
const calculateWeeksInMonth = (
  year: number,
  month: number
): ICalculateWeeksInMonthResponse[] => {
  const weeks: { weekNumber: number; startDate: Date; endDate: Date }[] = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  let currentDate = new Date(firstDayOfMonth);
  while (currentDate <= lastDayOfMonth) {
    const weekNumber = Math.ceil(
      (currentDate.getDate() + currentDate.getDay()) / 7
    );
    const startDate = new Date(currentDate);
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 6 - currentDate.getDay()
    );

    if (endDate > lastDayOfMonth) endDate.setDate(lastDayOfMonth.getDate());
    weeks.push({ weekNumber, startDate, endDate });

    currentDate.setDate(currentDate.getDate() + 7);
  }
  return weeks;
};

export {
  getWeekDaysOfYear,
  getCurrentWeekNumber,
  getWeeksInYear,
  calculateWeeksInMonth,
};
