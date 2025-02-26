import { useEffect, useState } from 'react'
import { getMovesList } from '../../../services/ApiService'

interface NamedAPIResource {
	name: string
	url: string
}

export default function Moves() {
	const [moves, setmoves] = useState<NamedAPIResource[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		getMovesList()
			.then(data => {
				setmoves(data)
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
		<div className="h-full">
			<ul className="list-none h-full overflow-y-auto pr-2">
				{moves.map(move => (
					<li key={move.name} className="text-lg">
						{move.name}
					</li>
				))}
			</ul>
		</div>
	)
}
