import { useState } from "react";
import { CiSearch } from 'react-icons/ci';

type SearchBarProps = {
    setSearch: (term: string) => void;
};

export default function SearchBar({ setSearch }: SearchBarProps) {
    const [inputValue, setInputValue] = useState(""); // Stan lokalny dla wartości inputa

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value); // Aktualizuj stan lokalny
        setSearch(value); // Przekaż wartość do rodzica
    };

    const handleClearInput = () => {
        setInputValue(""); // Wyczyść wartość inputa
        setSearch(""); // Wyczyść wartość w rodzicu
    };

    return (
        <div className="flex items-center rounded-sm overflow-hidden focus-within:ring-2 focus-within:ring-yellow-200 duration-300 w-4/5 md:w-2/5 bg-white shadow-xl">
            <input
                type="text"
                placeholder="Search..."
                className="outline-none px-3 py-3 flex-1"
                value={inputValue} // Kontrolowana wartość inputa
                onChange={handleInputChange} // Obsługa zmiany wartości
            />
            {/* Przycisk do czyszczenia inputa */}
            {inputValue && ( // Pokaż przycisk tylko wtedy, gdy input ma wartość
                <button
                    onClick={handleClearInput}
                    className="px-2 cursor-pointer text-[#c5c5c5] hover:text-gray-700 duration-200"
                    type="button"
                >
                    x
                </button>
            )}
            <div className="border-[1px] border-[#c5c5c5] h-8"></div>
            <button className="px-2 cursor-pointer" type="button">
                <CiSearch size={23} className="text-[#c5c5c5]" />
            </button>
        </div>
    );
}