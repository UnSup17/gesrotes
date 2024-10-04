import { ISubjectMenu } from "@subjects/(pages)/[subjectId]/layout";
import { ISubjectCard } from "@subjects/components/SubjectCard";

export const getSubjectMap = (): { [key: string]: ISubjectCard } => {
  return {
    "1": {
      id: 1,
      title: "Cuidado de enfermería en salud mental",
      program: "Enfermería"
    },
    "2": {
      id: 2,
      title: "Cuidado al adulto mayor",
      program: "Enfermería"
    },
    "3": {
      id: 3,
      title: "Salud para deportistas",
      program: "Enfermería"
    },
  }
}

export const getSubjectMenus = (subjectId: number): ISubjectMenu[] => {
  return [
    {
      label: "Estudiantes",
      to: `/subjects/${subjectId}/students`
    },
    {
      label: "Profesores",
      to: `/subjects/${subjectId}/teachers`
    },
    {
      label: "Rotes",
      to: `/subjects/${subjectId}/rotations`
    },
    {
      label: "Turnos",
      to: `/subjects/${subjectId}/shifts`
    },
    {
      label: "Documentos",
      to: `/subjects/${subjectId}/documents`
    },
  ]
}