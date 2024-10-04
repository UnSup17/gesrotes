import { getSubjectMap } from "../(pages)/subjects/util/subjects";

interface ITranslator {
  [key: string]: string
}
const translator: ITranslator = {
  subjects: "Asignaturas",
  configuration: "Configuracion",
  docentCheck: "Verificar Docente",
  studentCheck: "Verificar Estudiante",
  students: "Estudiantes",
  teachers: "Profesores",
  rotations: "Rotes",
  shifts: "Turnos",
  documents: "Documentos"
}

function findPreviousRoute(text: string): string | null {
  const lastSlashIndex = text.lastIndexOf('/');
  if (lastSlashIndex <= 0) {
    return null;
  }
  const secondToLastSlashIndex = text.lastIndexOf('/', lastSlashIndex - 1);
  if (secondToLastSlashIndex === -1) {
    return null;
  }
  return text.substring(secondToLastSlashIndex + 1, lastSlashIndex);
}
function chooseLabelForDynamicRoute(item: string, context: string) {
  switch (findPreviousRoute(context)) {
    case "subjects":
      return getSubjectMap()[item]?.title || item;
    default:
      return item;
  }
}

export { chooseLabelForDynamicRoute, translator };
