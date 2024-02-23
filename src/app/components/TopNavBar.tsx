import BreadCrumb from "./BreadCrumb";
import ProfileResume from "./ProfileResume";

export default function TopNavBar() {
  return (
    <div className="flex items-center w-full py-7 px-8 bg-[#F7F7F7] rounded-3xl justify-between">
      <BreadCrumb />
      <ProfileResume />
    </div>
  );
}
