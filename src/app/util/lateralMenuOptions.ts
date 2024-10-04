import { ILateralMenu } from "@/app/components/LateralMenu";
import { EnumImage } from "../model/EnumImage";

export const getMenuOptions = (): ILateralMenu => {
  return {
    menus: [
      {
        menuLabel: "Gestión",
        items: [
          {
            iconRoute: EnumImage.getImage("studentCheck"),
            redirectUrl: "/studentCheck",
          },
          {
            iconRoute: EnumImage.getImage("docentCheck"),
            redirectUrl: "/docentCheck",
          },
          {
            iconRoute: EnumImage.getImage("subject"),
            redirectUrl: "/subjects",
          },
        ],
      },
      {
        menuLabel: "Mi Perfil",
        items: [
          {
            iconRoute: EnumImage.getImage("configuration"),
            redirectUrl: "/configuration",
          },
        ],
      },
    ],
  };
};