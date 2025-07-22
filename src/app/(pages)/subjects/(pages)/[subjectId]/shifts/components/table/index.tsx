import Header from "./Header";
import StudentRows from "./StudentRows";

export default function Table() {
  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-[250px,repeat(7,1fr)] min-w-[1200px]">
          <Header />
          <StudentRows />
        </div>
      </div>
    </div>
  );
}
