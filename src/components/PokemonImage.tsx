import React, { useEffect, useState } from 'react'

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
		fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
			.then(res => {
				if (!res.ok) throw new Error('Błąd sieciowy')
				return res.json()
			})
			.then(data => {
				setPokemon(data)
				setLoading(false)
			})
			.catch(err => {
				setError(err.toString())
				setLoading(false)
			})
	}, [])

	if (loading) return <div>Ładowanie...</div>
	if (error) return <div>Błąd: {error}</div>

	return (
		<div className="flex flex-col items-center p-4">
			<h1 className="text-2xl font-bold mb-4">{pokemon?.name.toUpperCase()}</h1>
			<img src={pokemon?.sprites.other['official-artwork'].front_default} alt={pokemon?.name} className="w-32 h-32" />
		</div>
	)
}
