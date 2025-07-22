"use server"

import { fetchData } from "@/app/util/fetch";

export interface Workday {
  id: number;
  description: string;
  startTime: number;
  endTime: number;
  meals: string;
  active: boolean;
}
export async function fetchWorkdays(): Promise<Workday[]> {
  return fetchData({
    specificEndpoint: `jornadas/all`,
  })
    .then((response) => response.json())
    .then((json) => Array.from(json).map((item: any) => {
      return {
        id: item.id,
        description: item.descripcion,
        startTime: item.horaInicio,
        endTime: item.horaFin,
        meals: item.meals,
        active: item.active,
      } as Workday;
    }))
    .catch((err) => err);
}
