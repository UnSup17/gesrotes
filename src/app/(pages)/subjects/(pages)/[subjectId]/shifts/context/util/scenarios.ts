"use server"

import { fetchData } from "@/app/util/fetch";

export interface Scenario {
  id: number;
  label: string
}
export async function fetchScenarios(): Promise<Scenario[]> {
  return fetchData({
    specificEndpoint: `escenarios/all`,
  })
    .then((response) => response.json())
    .then((json) => Array.from(json).map((item: any) => {
      return { id: item.id, label: item.label } as Scenario;
    }))
    .catch((err) => err);
}
