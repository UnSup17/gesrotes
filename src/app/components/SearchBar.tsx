"use client";

import Image from "next/image";
import { IEnumImage } from "../model/EnumImage";

interface ISearchBar {
  searchParam: string;
  image: IEnumImage;
  placeholder: string;
  onSearch: (searchText: string) => void;
}
export default function SearchBar({
  searchParam,
  image,
  placeholder,
  onSearch,
}: ISearchBar) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={searchParam}
        onChange={handleChange}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Image
          className="mx-auto"
          alt={image.ariaLabel}
          src={image.src}
          width={20}
          height={20}
        />
      </div>
    </div>
  );
}
