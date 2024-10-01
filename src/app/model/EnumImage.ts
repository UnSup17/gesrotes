
export interface IEnumImage {
  ariaLabel: string;
  src: string;
}

export class EnumImage {
  private static images: IEnumImage[] = [
    {
      ariaLabel: "home",
      src: "/svg/home.svg",
    },
    {
      ariaLabel: "searchLens",
      src: "/svg/searchLens.svg",
    },
    {
      ariaLabel: "profilePhoto",
      src: "/svg/profilePhotoDemo.svg",
    },
    {
      ariaLabel: "exit",
      src: "/svg/exit.svg",
    },
    {
      ariaLabel: "arrowRight",
      src: "/svg/arrowRight.svg",
    },
    {
      ariaLabel: "studentCheck",
      src: "/svg/studentCheck.svg",
    },
    {
      ariaLabel: "docentCheck",
      src: "/svg/docentCheck.svg",
    },
    {
      ariaLabel: "subject",
      src: "/svg/subject.svg",
    },
    {
      ariaLabel: "configuration",
      src: "/svg/configuration.svg",
    },
    // Quitar luego
    {
      ariaLabel: "profilePhotoDemo",
      src: "/svg/profilePhotoDemo.svg",
    },
  ];

  private static notFoundImage: IEnumImage = {
    ariaLabel: "notFound",
    src: "/svg/notFound.svg",
  };

  static getImage(ariaLabel: string): IEnumImage {
    const foundImage = this.images.find((item) => item.ariaLabel === ariaLabel);
    if (!foundImage) {
      return this.notFoundImage;
    }
    return foundImage;
  }
}