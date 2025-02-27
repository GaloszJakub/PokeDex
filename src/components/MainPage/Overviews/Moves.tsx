import { useEffect, useState } from 'react'
import { getMovesList } from '../../../services/Overview'
import '../../../index.css'

interface NamedAPIResource {
	name: string
	url: string
}

export default function Moves() {
	const [moves, setMoves] = useState<NamedAPIResource[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		getMovesList()
			.then(data => {
				setMoves(data)
				setLoading(false)
			})
			.catch(err => {
				setError(err)
				setLoading(false)
			})
	}, [])

	if (loading) return <div>Loading moves...</div>
	if (error) return <div>Error: {error.message}</div>

	return (
		<div className="h-full overflow-y-auto custom-scrollbar">
			<ul className="list-none pl-5">
				{moves.map(move => (
					<li key={move.name} className="text-lg py-1">
						{move.name}
					</li>
				))}
			</ul>
		</div>
	)
}
