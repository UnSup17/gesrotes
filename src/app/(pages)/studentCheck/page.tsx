"use client";

import SearchBar from "@/app/components/SearchBar";
import VerificationTable from "@/app/components/verificationTable/VerificationTable";
import { EnumImage } from "@/app/model/EnumImage";

export default function StudentCheckPage() {
  return (
    <div>
      <SearchBar
        searchParam=""
        image={EnumImage.getImage("searchLens")}
        placeholder="Ingrese el nombre del estudiante"
        onSearch={function (searchText: string): void {}}
      />
      <VerificationTable />
    </div>
  );
}
