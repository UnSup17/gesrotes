"use server"

import { fetchData } from "@/app/util/fetch";

export interface Shift {
  "estudiante": string,
  "escenario": string,
  "etiqueta": string,
  "horario": string,
  "jornada": string,
  "alimentaciones": string,
  "idestudiante": number,
  "idturno": number
}

export interface IFetchShifts {
  classGroup: number,
  startDay: string,
  endDay: string,
}
export async function fetchShifts({ classGroup, startDay, endDay }: IFetchShifts): Promise<{ [key: string]: Shift[] }> {
  return fetchData({
    specificEndpoint: `turnos?grupoClase=${classGroup}&desde=${startDay}&hasta=${endDay}`,
  })
    .then((response) => response.json())
    .then((json) => json.days)
    .catch((err) => err);
}

export interface IFetchCreateShift {
  day: string,
  workingDay: number,
  tag: number,
  student: number,
  classGroup: number
}
export async function fetchCreateShift({ day, workingDay, tag, student, classGroup }: IFetchCreateShift): Promise<Shift[]> {
  const response = await fetchData({
    specificEndpoint: `turnos/nuevo`,
    init: {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    },
    body: JSON.stringify({
      dia: day,
      jornada: workingDay,
      etiqueta: tag,
      estudiante: student,
      grupo: classGroup
    })
  })

  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message || 'Ocurrió un error inesperado');
  }

  const json = await response.json();
  return json.data.map((item: any) => ({
    estudiante: item.estudiante,
    escenario: item.escenario,
    etiqueta: item.etiqueta,
    horario: item.horario,
    jornada: item.jornada,
    alimentaciones: item.alimentaciones,
    idestudiante: +item.idestudiante,
    idturno: +item.idturno,
  }));
}
