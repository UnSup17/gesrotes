"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

interface ISubjectMenu {
  label: string;
  to: string;
}

export default function SubjectSelectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ subjectId: string }>();

  const subjectId = Number(params?.subjectId);

  useEffect(() => {
    if (!subjectId || Number.isNaN(subjectId)) {
      router.replace("/");
    }
  }, [subjectId, router]);

  const menus = getSubjectMenus(subjectId);

  return (
    <section className="flex flex-col h-full">
      {/* Evita clases dinámicas de Tailwind (grid-cols-X). Define columnas vía style. */}
      <section
        className="pb-2 grid"
        style={{
          gridTemplateColumns: `repeat(${menus.length}, minmax(0, 1fr))`,
        }}
      >
        {menus.map((menu, index) => (
          <div key={index} className="text-center">
            <Link
              href={menu.to}
              className={`px-12 pt-4 pb-6 ${
                pathname === menu.to ? "bg-[#F7F7F7] rounded-t-3xl" : ""
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

// OJO: sin 'export'. Si quieres reutilizar, muévelo a, por ejemplo, src/lib/subjectMenus.ts
function getSubjectMenus(subjectId: number): ISubjectMenu[] {
  const sid = String(subjectId);
  return [
    { label: "Estudiantes", to: `/subjects/${sid}/students` },
    { label: "Profesores", to: `/subjects/${sid}/teachers` },
    { label: "Rotes", to: `/subjects/${sid}/rotations` },
    { label: "Turnos", to: `/subjects/${sid}/shifts` },
    { label: "Documentos", to: `/subjects/${sid}/documents` },
  ];
}
