"use client";

import { getSubjectMap, getSubjectMenus } from "@subjects/util/subjects";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

export interface ISubjectMenu {
  label: string;
  to: string;
}
export default function SubjectSelectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    subjectId: number;
  };
}) {
  const pathname = usePathname();
  if (!getSubjectMap()[params.subjectId]) redirect("/subjects");
  if (!params.subjectId) redirect("/");

  const menus = getSubjectMenus(params.subjectId);
  return (
    <section className="flex flex-col h-full">
      <section className={`pb-2 grid grid-flow-col grid-cols-${menus.length}`}>
        {menus.map((menu, index) => (
          <div key={index} className="text-center">
            <Link
              href={menu.to}
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
