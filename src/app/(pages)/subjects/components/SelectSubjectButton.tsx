"use client";

import Link from "next/link";

interface IProps {
  id: number;
  title: string;
}
export default function SelectSubjectButton({ id, title }: IProps) {
  return (
    <Link
      href={`/subjects/${id}/shifts?subjectName=${title}`}
      className="bg-[#08743B] rounded-md px-2 py-1 h-full text-center flex place-items-center"
    >
      Gestionar asignatura
    </Link>
  );
}
