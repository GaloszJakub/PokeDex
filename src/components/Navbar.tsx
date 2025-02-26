import { NavbarButton } from './NavbarButton'
import pokelogo from '../assets/pokelogo.png'
import pokebg from '../assets/pokebg2.jpg'
import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<div
			style={{ backgroundImage: `url(${pokebg})` }}
			className=" w-[270px] h-screen flex bg-cover bg-center  pr-[20px] sticky">
			<div className="bg-black opacity-40 absolute w-full h-full inset-0"></div>
			<div className=" flex flex-col gap-y-5 mt-20 z-20">
				<Link to="/"><img src={pokelogo} alt="pokemon logo" className="mb-30 px-3" /></Link>
				
				<Link to="/Pokedex" >
					<NavbarButton label="Pokedex" />
				</Link>
				<Link to="/Moves" >
					<NavbarButton label="Moves" />
				</Link>
				<NavbarButton label="Abilities" />
				<NavbarButton label="Items" />
				<NavbarButton label="Types" />
			</div>
		</div>
	)
}
