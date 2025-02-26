import { MdCatchingPokemon } from 'react-icons/md'

type ButtonProp = {
	label: string
}

export function NavbarButton({ label }: ButtonProp) {
	return (
		<button className="px-4 py-2 rounded  flex items-center gap-x-2 flex-nowraps shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold cursor-pointer hover:scale-105 duration-150 hover:bg-gradient-to-l mx-8 text-xl w-[70%] text-white">
			<MdCatchingPokemon size={23} />
			{label}
		</button>
	)
}
