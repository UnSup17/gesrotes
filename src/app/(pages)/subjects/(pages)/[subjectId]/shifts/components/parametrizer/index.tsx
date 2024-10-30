import DatePicker from "@/app/components/Datepicker";
import SearchBar from "@/app/components/SearchBar";
import { EnumImage } from "@/app/model/EnumImage";
import { IParameters } from "../../page";

interface IParametrizer {
  parameters: IParameters;
  handleChangeParameters: (parameter: string, value: any) => void;
}
export default function Parametrizer(
  { parameters, handleChangeParameters }: IParametrizer
) {
  const handleSearchStudent = (searchText: string) => {
    handleChangeParameters("studentFilter", searchText.toLowerCase());
  };

  const handleSelectWeek = (year: number, month: number) => {
    handleChangeParameters("weekFilter", { year, month });
  };

  return (
    <div className="flex py-4 w-2/3 space-x-5">
      <div className="w-1/2">
        <SearchBar
          searchParam={parameters.studentFilter || ""}
          image={EnumImage.getImage("searchLens")}
          placeholder="Ingrese el nombre de la asignatura"
          onSearch={handleSearchStudent}
        />
      </div>
      <div className="relative w-1/2">
        <DatePicker
          selectDay={false}
          selectMonth={true}
          selectYear={true}
          selectedDate={parameters.weekFilter}
          onSelectDate={handleSelectWeek}
          className="w-full text-sm"
        />
      </div>
    </div>
  );

}
