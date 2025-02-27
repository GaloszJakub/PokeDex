import { MdCatchingPokemon } from 'react-icons/md'

type ButtonProp = {
	label: string
}

export function NavbarButton({ label }: ButtonProp) {
	return (
		<button className="px-4 py-2 rounded  flex items-center gap-x-2 flex-nowraps shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-medium cursor-pointer hover:scale-105 duration-150  text-xl w-full text-white mt-5 ">
			<MdCatchingPokemon size={23} />
			{label}
		</button>
	)
}
