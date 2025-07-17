"use server"

import { fetchData } from "@/app/util/fetch";
import { ISubjectCard } from "@subjects/components/SubjectCard";

const TESTPROGRAM = {
  ID: 31,
  NAME: "Enfermería"
}

export async function getSubjectMap(): Promise<{ [key: string]: ISubjectCard }> {
  return fetchData({ specificEndpoint: `asignaturas?programa=${TESTPROGRAM.ID}` })
    .then((response) => response.json())
    .then((json) => Array.from(json).map((item: any) => {
      return {
        id: item.id,
        title: item.label,
        program: TESTPROGRAM.NAME
      }
    }))
    .catch((err) => err)
}
