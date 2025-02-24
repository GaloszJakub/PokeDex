import { NavbarButton } from './NavbarButton'

export default function Navbar() {
	return (
		<div className="bg-yellow-300 w-max h-screen flex items-center">
			<div className="px-4 flex flex-col gap-y-5 ">
				<NavbarButton label="Pokedex" />
				<NavbarButton label="Moves" />
				<NavbarButton label="Abilities" />
				<NavbarButton label="Items" />
				<NavbarButton label="Types" />
			</div>
		</div>
	)
}
