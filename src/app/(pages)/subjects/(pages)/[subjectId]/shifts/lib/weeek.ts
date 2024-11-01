const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab'];

export interface DayInfo {
  id: string;
  day: number;
  label: string;
}

// Función auxiliar para generar un ID único para cada día
function generateDayId(year: number, month: number, day: number): string {
  return `${year}${(month).toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
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
  const firstSunday = getFirstSundayForYear(year);
  const startOfWeek = new Date(firstSunday);
  startOfWeek.setDate(firstSunday.getDate() + (weekNumber * 7)); // Avanzar semanas desde el primer domingo
  return startOfWeek;
}

// Función para contar el número de semanas en un año
function getWeeksInYear(year: number): number {
  const lastDayOfYear = new Date(year, 11, 31);
  const firstSunday = getFirstSundayForYear(year);
  const totalDays = Math.floor((lastDayOfYear.getTime() - firstSunday.getTime()) / (1000 * 60 * 60 * 24));
  return Math.ceil((totalDays + 1) / 7); // Cantidad de semanas completa desde el primer domingo al último día del año
}

// Sobrecarga de la función principal
function getWeekDaysOfYear(): DayInfo[];
function getWeekDaysOfYear(year: number, weekNumber: number): DayInfo[];
function getWeekDaysOfYear(year?: number, weekNumber?: number): DayInfo[] {
  let targetYear = year;
  let targetWeekNumber = weekNumber;

  // Si no se proporciona year y weekNumber, obtener la semana actual
  if (targetYear === undefined || targetWeekNumber === undefined) {
    const currentDate = new Date();
    targetYear = currentDate.getFullYear();

    // Calcular la semana actual en base al primer domingo que incluya el 1 de enero
    const firstSunday = getFirstSundayForYear(targetYear);
    const daysSinceFirstSunday = Math.floor((currentDate.getTime() - firstSunday.getTime()) / (1000 * 60 * 60 * 24));
    targetWeekNumber = Math.floor(daysSinceFirstSunday / 7);
  }

  const weeksInYear = getWeeksInYear(targetYear);
  if (targetWeekNumber >= weeksInYear) {
    throw new Error(`El año ${targetYear} solo tiene ${weeksInYear} semanas.`);
  }

  const startOfWeek = getStartOfWeek(targetYear, targetWeekNumber); // Día inicial de la semana
  const days: DayInfo[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Mes en formato 1-12
    const currentDay = currentDate.getDate();
    const dayLabel = daysOfWeek[i];

    days.push({
      id: generateDayId(currentYear, currentMonth, currentDay),
      day: currentDay,
      label: dayLabel,
    });
  }

  return days;
}

export { getWeekDaysOfYear };