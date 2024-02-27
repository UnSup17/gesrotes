import SubjectCard from "@subjects/components/SubjectCard";
import { getSubjectMap } from "@subjects/util/subjects";

export default function SubjectsPage() {
  const subjects = getSubjectMap();
  return (
    <div className="grid gap-5 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 xs:grid-cols-1">
      {Object.values(subjects).map((item, index) => (
        <SubjectCard
          key={index}
          id={item.id}
          title={item.title}
          program={item.program}
        />
      ))}
    </div>
  );
}
