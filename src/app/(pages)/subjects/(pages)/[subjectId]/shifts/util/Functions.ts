import { IButtonProps } from "@/app/model/button"

export const getTopLeftFunctions = (): IButtonProps[] => {
  return [
    {
      label: "Gestión estudiantes",
      function: () => { console.log("Gestionar estudiantes") }
    },
    {
      label: "Gestión etiquetas",
      function: () => { console.log("Gestión etiquetas") }
    },
    {
      label: "Alimentación",
      function: () => { console.log("Alimentación") }
    },
  ]
}