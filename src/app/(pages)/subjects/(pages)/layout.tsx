"use client";

import { redirect, usePathname, useSearchParams } from "next/navigation";
import { getSubjectMenus } from "../util/subjects";
import Link from "next/link";
import { Fragment } from "react";

export interface ISubjectMenu {
  label: string;
  to: string;
}
export default function SubjectSelectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const subjectParam = useSearchParams().get("subject");
  if (!subjectParam) redirect("/subjects");
  const menus = getSubjectMenus();
  return (
    <section className="flex flex-col h-full">
      <section className={`pb-2 grid grid-flow-col grid-cols-${menus.length}`}>
        {menus.map((menu, index) => (
          <div key={index} className="text-center">
            <Link
              href={{
                pathname: menu.to,
                query: { subject: subjectParam },
              }}
              className={`px-12 pt-4 pb-6 ${
                pathname === menu.to && "bg-[#F7F7F7] rounded-t-3xl"
              }`}
            >
              {menu.label}
            </Link>
          </div>
        ))}
      </section>
      <section className="bg-[#F7F7F7] flex-1 border mt-2 rounded-3xl font-light text-sm">
        {children}
      </section>
    </section>
  );
}
