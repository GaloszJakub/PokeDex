import { NavbarButton } from './NavbarButton'
import pokelogo from '../assets/pokelogo.png'
import pokebg from '../assets/pokebg2.jpg'

export default function Navbar() {
	return (
		<div
			style={{ backgroundImage: `url(${pokebg})` }}
			className=" w-[270px] h-screen flex bg-cover bg-center relative pr-[20px]">
			<div className="bg-black opacity-40 absolute w-full h-full inset-0"></div>
			<div className=" flex flex-col gap-y-5 mt-20 z-20">
				<img src={pokelogo} alt="pokemon logo" className="mb-30 px-3" />
				<NavbarButton label="Pokedex" />
				<NavbarButton label="Moves" />
				<NavbarButton label="Abilities" />
				<NavbarButton label="Items" />
				<NavbarButton label="Types" />
			</div>
		</div>
	)
}
