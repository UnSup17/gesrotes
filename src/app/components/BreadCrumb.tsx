"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { translator } from "../util/translator";

export default function BreadCrumb() {
  const pathname = usePathname()
    .split("/")
    .filter((item) => item !== "");
  let breadCrumb = "/";
  return (
    <div className="flex items-center gap-2">
      <Image src="/svg/home.svg" alt="logo" width={30} height={30} />
      {pathname.map((item, index) => {
        breadCrumb += item + "/";
        return (
          <span key={index} className="flex gap-2">
            <Image
              src={"/svg/arrowRight.svg"}
              width={7}
              height={7}
              alt="arrowRight"
            />
            <Link
              href={breadCrumb}
              className="text-[#000066] font-semibold font-sans text-lg hover:border-b-[#F58220] border-[#F7F7F7] border-b-2"
            >
              {translator[item] || item}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
