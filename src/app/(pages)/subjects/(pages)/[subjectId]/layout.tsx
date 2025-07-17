"use client";
import { use } from "react";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

export interface ISubjectMenu {
  label: string;
  to: string;
}
export default function SubjectSelectedLayout(props: {
  children: React.ReactNode;
  params: Promise<{
    subjectId: number;
  }>;
}) {
  const params = use(props.params);

  const { children } = props;

  const pathname = usePathname();
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

export const getSubjectMenus = (subjectId: number): ISubjectMenu[] => {
  return [
    {
      label: "Estudiantes",
      to: `/subjects/${subjectId}/students`,
    },
    {
      label: "Profesores",
      to: `/subjects/${subjectId}/teachers`,
    },
    {
      label: "Rotes",
      to: `/subjects/${subjectId}/rotations`,
    },
    {
      label: "Turnos",
      to: `/subjects/${subjectId}/shifts`,
    },
    {
      label: "Documentos",
      to: `/subjects/${subjectId}/documents`,
    },
  ];
};