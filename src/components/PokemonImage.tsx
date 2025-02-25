import React, { useEffect, useState } from 'react'
import { fetchPokemon } from '../Services/ApiService'

interface Sprites {
	other: {
		'official-artwork': {
			front_default: string
		}
	}
}

interface PokemonData {
	name: string
	sprites: Sprites
}

export function PokemonImage() {
	const [pokemon, setPokemon] = useState<PokemonData | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetchPokemon('pikachu')
			.then(data => {
				setPokemon(data)
				setLoading(false)
			})
			.catch(err => {
				setError(err.message)
				setLoading(false)
			})
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>

	return (
		<div className="flex flex-col items-center p-4">
			<h1 className="text-2xl font-bold mb-4">{pokemon?.name.toUpperCase()}</h1>
			<img src={pokemon?.sprites.other['official-artwork'].front_default} alt={pokemon?.name} className="w-32 h-32" />
		</div>
	)
}
