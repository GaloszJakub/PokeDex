import Abilities from './Overviews/Abilities'
import Items from './Overviews/Items'
import Moves from './Overviews/Moves'

const headingStyles = 'uppercase text-xl text-center font-semibold mb-5 mt-2'

export default function PokemonOverview() {
	return (
		<div className="grid grid-cols-3 h-full overflow-hidden bg-white rounded-lg mx-4">
			<div className="h-full overflow-hidden flex flex-col px-1">
				<h2 className={headingStyles}>abilities</h2>
				<div className="flex-grow overflow-y-auto custom-scrollbar">
					<Abilities />
				</div>
			</div>
			<div className="h-full overflow-hidden border-x flex flex-col">
				<h2 className={headingStyles}>items</h2>
				<div className="flex-grow overflow-y-auto custom-scrollbar">
					<Items />
				</div>
			</div>
			<div className="h-full overflow-hidden flex flex-col">
				<h2 className={headingStyles}>moves</h2>
				<div className="flex-grow overflow-y-auto custom-scrollbar">
					<Moves />
				</div>
			</div>
		</div>
	)
}
