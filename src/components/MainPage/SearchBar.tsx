import { CiSearch } from 'react-icons/ci'

type SearchBarProps = {
	setSearch: (term: string) => void;
  };

export default function SearchBar({ setSearch }: SearchBarProps) {
	return (
		<div className="flex items-center  rounded-sm overflow-hidden focus-within:ring-2 focus-within:ring-yellow-200 duration-300 w-2/5 mx-auto mt-8 bg-white shadow-xl">
			<input type="text" placeholder="Search..." className="outline-none px-3 py-3 flex-1" 
			onChange={(e) =>setSearch(e.target.value) }/>
			<div className="border-[1px] border-[#c5c5c5] h-8"></div>
			<button className="px-2 cursor-pointer" type="button">
				<CiSearch size={23} className="text-[#c5c5c5]" />
			</button>
		</div>
	)
}
