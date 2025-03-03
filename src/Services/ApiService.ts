// src/services/ApiService.ts

// Funkcja pobierająca szczegóły losowego Pokémona (istniejąca)
interface PokemonSpecies {
	flavor_text_entries: Array<{
		flavor_text: string
		language: { name: string }
	}>
}

interface TypeRelations {
	damage_relations: {
		double_damage_from: Array<{ name: string }>
	}
}
interface Stat {
	base_stat: number
	stat: {
		name: string
	}
}

interface ability {
	name:string
	url: string
}



export interface PokemonDetails {
	id: number
	name: string
	sprites: {
		other: {
			'official-artwork': { front_default: string }
		}
	}
	types: Array<{ type: { name: string } }>
	description: string
	weaknesses: string[]
	stats: Stat[]
	abilities: ability[]
}

// src/services/ApiService.ts
export const fetchPokemon = async (id: number | string ): Promise<PokemonDetails> => {
	try {
		const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		const pokemonData = await pokemonRes.json()

		const speciesRes = await fetch(pokemonData.species.url)
		const speciesData: PokemonSpecies = await speciesRes.json()

		const typeUrls = pokemonData.types.map((t: any) => t.type.url)
		const typeResponses = await Promise.all(typeUrls.map((url: string) => fetch(url)))
		const typesData: TypeRelations[] = await Promise.all(typeResponses.map(res => res.json()))

		const weaknesses = Array.from(
			new Set(typesData.flatMap(t => t.damage_relations.double_damage_from.map((d: any) => d.name)))
		)

		return {
			id: pokemonData.id,
			name: pokemonData.name,
			sprites: pokemonData.sprites,
			types: pokemonData.types,
			description:
				speciesData.flavor_text_entries.find((e: any) => e.language.name === 'en')?.flavor_text ||
				'No description available',
			weaknesses,
			stats: pokemonData.stats,
			abilities: pokemonData.abilities.map((a: any) => ({
				name: a.ability.name,
				url: a.ability.url
			})),

		}
	} catch (error) {
		throw new Error(`Error fetching Pokemon ${id}: ${error}`)
	}
}





// export async function fetchPokemon(name: string, signal?: AbortSignal): Promise<PokemonDetails> {
// 	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
// 		signal,
// 	})

// 	if (!res.ok) {
// 		throw new Error(res.status === 404 ? 'Pokémon nie znaleziony' : 'Błąd serwera')
// 	}

// 	return res.json() as Promise<PokemonDetails>
// }

// Pobieranie listy Pokémonów (przydatne przy braku filtra)
export async function fetchPokemonList(offset: number = 0, limit: number = 30) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
	if (!response.ok) throw new Error('Failed to fetch Pokémon list')
	return response.json()
}

// Nowa funkcja – pobieranie listy Pokémonów danego typu
export async function fetchPokemonByType(type: string) {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
		if (!response.ok) throw new Error(`Error fetching pokemons by type ${type}`)
		const data = await response.json()
		// Zwracamy listę nazw Pokémonów
		const pokemonList = data.pokemon.map((p: any) => p.pokemon.name)
		return pokemonList
	} catch (error) {
		throw new Error(`Error fetching pokemons by type ${type}: ${error}`)
	}
}
