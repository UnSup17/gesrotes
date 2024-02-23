import { ISubjectMenu } from "../(pages)/layout";
import { ISubjectCard } from "../components/SubjectCard";

export const getSubjectList = (): ISubjectCard[] => {
  return [
    {
      id: 1,
      title: "Cuidado de enfermería en salud mental",
      program: "Enfermería"
    },
    {
      id: 2,
      title: "Cuidado al adulto mayor",
      program: "Enfermería"
    },
    {
      id: 3,
      title: "Salud para deportistas",
      program: "Enfermería"
    },
    {
      id: 3,
      title: "Cuidado de enfermería en salud mental",
      program: "Enfermería"
    },
    {
      id: 4,
      title: "Cuidado al adulto mayor",
      program: "Enfermería"
    },
    {
      id: 5,
      title: "Salud para deportistas",
      program: "Enfermería"
    },
  ]
}

export const getSubjectMenus = (): ISubjectMenu[] => {
  return [
    {
      label: "Estudiantes",
      to: "/subjects/students"
    },
    {
      label: "Profesores",
      to: "/subjects/teachers"
    },
    {
      label: "Rotes",
      to: "/subjects/rotations"
    },
    {
      label: "Turnos",
      to: "/subjects/shifts"
    },
    {
      label: "Documentos",
      to: "/subjects/documents"
    },
  ]
}