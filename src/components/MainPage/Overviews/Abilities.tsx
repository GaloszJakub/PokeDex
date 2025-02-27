import { useEffect, useState } from 'react'
import { getAbilitiesList } from '../../../services/Overview'
import '../../../index.css'

interface NamedAPIResource {
	name: string
	url: string
}

export default function Abilities() {
	const [abilities, setAbilities] = useState<NamedAPIResource[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		getAbilitiesList()
			.then(data => {
				setAbilities(data)
				setLoading(false)
			})
			.catch(err => {
				setError(err)
				setLoading(false)
			})
	}, [])

	if (loading) return <div>Loading abilities...</div>
	if (error) return <div>Error: {error.message}</div>

	return (
		<div className="h-full overflow-y-auto custom-scrollbar">
			<ul className="list-none pl-5">
				{abilities.map(ability => (
					<li key={ability.name} className="text-lg py-1">
						{ability.name}
					</li>
				))}
			</ul>
		</div>
	)
}
