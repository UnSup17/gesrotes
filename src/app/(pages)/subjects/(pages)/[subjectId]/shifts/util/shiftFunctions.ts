"use client";

import { IFunctionModalProps } from "@/app/model/IFunctionModal";
import { FeedingManager } from "../components/modals/feeding/index";
import { TagsManager } from "../components/modals/tags/index";
import { StudentManager } from "../components/modals/students/index";

export const getTopLeftFunctions = (): IFunctionModalProps[] => {
  return [
    {
      label: "Estudiantes",
      modalName: "Gestionar estudiantes",
      component: StudentManager,
    },
    {
      label: "Alimentación",
      modalName: "Gestionar alimentación",
      component: FeedingManager, // Referencia al componente
    },
    {
      label: "Etiquetas",
      modalName: "Gestionar etiquetas",
      component: TagsManager,
    },
  ];
};
