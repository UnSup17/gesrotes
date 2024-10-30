import { IButtonProps } from "@/app/model/button"

export const getTopLeftFunctions = (): IButtonProps[] => {
  return [
    {
      label: "estudiantes",
      function: () => {
        console.log("Gestionar estudiantes");
      },
    },
    {
      label: "etiquetas",
      function: () => {
        console.log("Gestión etiquetas");
      },
    },
    {
      label: "Alimentación",
      function: () => {
        console.log("Alimentación");
      },
    },
  ];
}