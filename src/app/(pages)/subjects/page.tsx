import SubjectCard from "./components/SubjectCard";
import { getSubjectList } from "./util/subjects";

export default function SubjectsPage() {
  const subjects = getSubjectList();
  return (
    <div className="grid gap-5 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 xs:grid-cols-1">
      {subjects.map((item, index) => (
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
