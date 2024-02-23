import Link from "next/link";

export interface ISubjectCard {
  id: number;
  title: string;
  program: string;
}
export default function SubjectCard({ id, title, program }: ISubjectCard) {
  return (
    <div className="rounded-b-lg bg-[#092167] shadow-lg shadow-[#092167] text-white">
      <div className="items-center text-center p-3 flex flex-col">
        <span className="overflow-hidden whitespace-nowrap">{title}</span>
        <span className="italic text-xs">{program}</span>
      </div>
      <div className="bg-white h-10 border-b"></div>
      <div className="bg-white items-center text-center grid grid-cols-2 gap-4 p-4 rounded-b-lg justify-evenly">
        <button disabled className="bg-[#08743a4b] rounded-md px-2 py-1">
          Estado de la asignatura
        </button>
        <Link
          href={{
            pathname: "/subjects/shifts",
            query: { subject: id },
          }}
          className="bg-[#08743B] rounded-md px-2 py-1 h-full text-center flex place-items-center"
        >
          Gestionar asignatura
        </Link>
      </div>
    </div>
  );
}
