"use server"

import { fetchData } from "@/app/util/fetch";

export interface Student {
  id: string;
  fullName: string;
  avatarUrl?: string;
}

export async function fetchStudentList(idSubject: number): Promise<Student[]> {
  return fetchData({
    specificEndpoint: `estudiantes?grupo=${idSubject}`,
  })
    .then((response) => response.json())
    .then((json) => Array.from(json).map((item: any) => {
      return { id: item.id, fullName: item.fullName };
    }))
    .catch((err) => err);
}