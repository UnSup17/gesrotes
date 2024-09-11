"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ISearchBar {
  placeholder: string;
  timeOut: number;
  onSearch: (searchText: string) => void;
}
export default function SearchBar({
  placeholder,
  timeOut,
  onSearch,
}: ISearchBar) {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchText);
    }, timeOut);
    return () => clearTimeout(timer);
  }, [searchText, onSearch, timeOut]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="flex place-content-center">
      <div className="flex px-4 py-1 w-1/2 border-2 rounded-full bg-white">
        <Image
          alt="profile_photo"
          src={"/svg/searchLens.svg"}
          width={20}
          height={20}
        />
        <input
          className="ml-2 w-full"
          type="text"
          placeholder={placeholder}
          value={searchText}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
