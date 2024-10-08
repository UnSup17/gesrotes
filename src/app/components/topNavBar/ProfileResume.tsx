import { EnumImage } from "@/app/model/EnumImage";
import Image from "next/image";

export default function ProfileResume() {
  const image = EnumImage.getImage("profilePhotoDemo");
  return (
    <div className="flex items-center justify-center px-4 border-l-2">
      <Image alt={image.ariaLabel} src={image.src} width={40} height={40} />
      <span className="pl-4">
        <p className="font-normal">Username</p>
        <p className="font-light text-xs">Coordinador de asignatura</p>
      </span>
    </div>
  );
}
