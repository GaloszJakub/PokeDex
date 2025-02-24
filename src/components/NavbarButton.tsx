import { MdCatchingPokemon } from 'react-icons/md'

type ButtonProp = {
	label: string
}

export function NavbarButton({ label }: ButtonProp) {
	return (
		<button className="px-4 py-2 rounded  flex items-center gap-x-2 flex-nowraps shadow-lg bg-gradient-to-r from-blue-300 to bg-blue-500 font-semibold cursor-pointer hover:scale-105 duration-150 hover:from-blue-500 to hover:bg-blue-300">
			<MdCatchingPokemon size={20} />
			{label}
		</button>
	)
}
