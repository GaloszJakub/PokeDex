import { CiSearch } from 'react-icons/ci'

export default function SearchBar() {
	return (
		<div className="flex items-center rounded-sm overflow-hidden focus-within:ring-2 focus-within:ring-yellow-200 duration-300 w-4/5  md:w-2/5  bg-white shadow-xl ">
			<input type="text" placeholder="Search..." className="outline-none px-3 py-3 flex-1" />
			<div className="border-[1px] border-[#c5c5c5] h-8"></div>
			<button className="px-2 cursor-pointer" type="button">
				<CiSearch size={23} className="text-[#c5c5c5]" />
			</button>
		</div>
	)
}
