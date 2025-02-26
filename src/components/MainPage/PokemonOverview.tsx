import Abilities from './Overviews/Abilities'
import Items from './Overviews/Items'
import Moves from './Overviews/Moves'

const headingStyles = 'uppercase text-xl text-center font-semibold mb-5'

export default function PokemonOverview() {
	return (
		<div className="grid grid-cols-3 h-full overflow-hidden w-3/5   bg-white rounded-sm p-5 ">
			<div className="h-full overflow-hidden">
				<h2 className={headingStyles}>abilities</h2>
				<Abilities />
			</div>
			<div className="h-full overflow-hidden">
				<h2 className={headingStyles}>items</h2>
				<Items />
			</div>
			<div className="h-full overflow-hidden">
				<h2 className={headingStyles}>moves</h2>
				<Moves />
			</div>
		</div>
	)
}
