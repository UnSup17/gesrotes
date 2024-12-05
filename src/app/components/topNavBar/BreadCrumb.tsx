"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { chooseLabelForDynamicRoute, translator } from "../../util/translator";

export default function BreadCrumb() {
  const pathname = usePathname()
    .split("/")
    .filter((item) => item !== "");
  let breadCrumb = "/";
  return (
    <div className="flex items-center gap-2">
      <Link href={"/subjects"}>
        <Image src="/svg/home.svg" alt="homeLink" width={30} height={30} />
      </Link>
      {pathname.map((item, index) => {
        breadCrumb += item + "/";
        const isDynamicRoute = !isNaN(parseInt(item));
        return (
          <span key={index} className="flex gap-2">
            <Image
              src={"/svg/arrowRight.svg"}
              width={7}
              height={7}
              alt="arrowRight"
            />
            <Link
              href={isDynamicRoute ? "#" : breadCrumb}
              className="text-[#000066] font-semibold font-sans text-lg hover:border-b-[#F58220] border-[#F7F7F7] border-b-2"
            >
              <p className="max-w-72 truncate">
                {isDynamicRoute
                  ? chooseLabelForDynamicRoute(
                      item,
                      breadCrumb.slice(0, breadCrumb.length - 1)
                    )
                  : translator[item] || item}
              </p>
            </Link>
          </span>
        );
      })}
    </div>
  );
}
