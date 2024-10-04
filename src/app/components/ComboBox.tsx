import { useState } from "react";

interface ICombobox {
  options: string[];
  handleSelect: (option: string) => void;
  placeholder: string;
  className?: string;
}
const Combobox = ({
  options,
  handleSelect,
  placeholder,
  className,
}: ICombobox) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className={"relative w-64 " + className}>
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
      />

      {/* Lista de opciones */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onMouseDown={() => {
                  handleSelect(option);
                  setQuery(option);
                }}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">
              No se encontraron resultados
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Combobox;
