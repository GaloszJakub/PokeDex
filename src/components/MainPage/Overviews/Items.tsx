import { useEffect, useState } from 'react'
import { getItemsList } from '../../../services/ApiService'

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
		<div className="h-full">
			<ul className="list-none h-full overflow-y-auto pr-2">
				{items.map(item => (
					<li key={item.name} className="text-lg">
						{item.name}
					</li>
				))}
			</ul>
		</div>
	)
}
