import { ILateralMenu } from "@/app/components/LateralMenu";

export const getMenuOptions = (): ILateralMenu => {
  return {
    menus: [
      {
        menuLabel: 'Gestión',
        items: [
          {
            iconRoute: '/svg/studentCheck.svg',
            itemLabel: 'Verificar Estudiantes',
            redirectUrl: '/studentCheck'
          },
          {
            iconRoute: '/svg/docentCheck.svg',
            itemLabel: 'Verificar Docentes',
            redirectUrl: '/docentCheck'
          },
          {
            iconRoute: '/svg/subject.svg',
            itemLabel: 'Asignaturas',
            redirectUrl: '/subjects'
          },
        ]
      },
      {
        menuLabel: 'Mi Perfil',
        items: [
          {
            iconRoute: '/svg/configuration.svg',
            itemLabel: 'Configuración',
            redirectUrl: '/configuration'
          },
        ]
      },
    ]
  }
}