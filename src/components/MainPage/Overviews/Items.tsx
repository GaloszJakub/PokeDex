import { useEffect, useState } from 'react'
import { getItemsList } from '../../../services/Overview'
import '../../../index.css'

interface NamedAPIResource {
	name: string
	url: string
}

export default function Items() {
	const [items, setItems] = useState<NamedAPIResource[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		getItemsList()
			.then(data => {
				setItems(data)
				setLoading(false)
			})
			.catch(err => {
				setError(err)
				setLoading(false)
			})
	}, [])

	if (loading) return <div>Loading Items...</div>
	if (error) return <div>Error: {error.message}</div>

	return (
		<div className="h-full overflow-y-auto custom-scrollbar">
			<ul className="list-none pl-5">
				{items.map(item => (
					<li key={item.name} className="text-lg py-1">
						{item.name}
					</li>
				))}
			</ul>
		</div>
	)
}
