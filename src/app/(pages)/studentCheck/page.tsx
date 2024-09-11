"use client";

import SearchBar from "@/app/components/SearchBar";
import VerificationTable from "@/app/components/verificationTable/VerificationTable";

export default function StudentCheckPage() {
  return (
    <div>
      <SearchBar
        placeholder="Ingrese el nombre del estudiante"
        timeOut={0}
        onSearch={function (searchText: string): void {}}
      />
      <VerificationTable />
    </div>
  );
}
