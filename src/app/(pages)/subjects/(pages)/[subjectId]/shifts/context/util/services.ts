"use server"

import { fetchData } from "@/app/util/fetch";


export interface Service {
  id: number;
  label: string;
  scenario: number;
}

export type ServicesMap = Record<number, Service[]>;
export async function fetchServicesMap(): Promise<ServicesMap> {
  const response = await fetchData({
    specificEndpoint: "servicios/mapa",
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Error al obtener servicios agrupados");
  }

  return json.data as ServicesMap;
}