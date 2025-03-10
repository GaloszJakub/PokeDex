import { NavbarButton } from './NavbarButton'
import pokelogo from '../assets/pokelogo.png'
import pokebg from '../assets/pokebg2.jpg'
import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<div
			style={{ backgroundImage: `url(${pokebg})` }}
			className="w-[270px] h-screen fixed left-0 top-0 bg-cover bg-center hidden lg:block z-50">
			<div className="bg-black/40 absolute w-full h-full inset-0" />
			<div className="absolute z-20 flex flex-col gap-y-8 mt-20 mx-auto ">
				<Link to="/">
					<img
						src={pokelogo}
						alt="pokemon logo"
						className=" mb-12 transition-transform hover:scale-90 scale-80 overflow-hidden"
					/>
				</Link>

				<div className="space-y-4 px-10">
					<Link to="/PokeDexList">
						<NavbarButton label="Pokedex" />
						<NavbarButton label="Moves" />
						<NavbarButton label="Abilities" />
						<NavbarButton label="Items" />
						<NavbarButton label="Types" />
					</Link>
				</div>
			</div>
		</div>
	)
}
