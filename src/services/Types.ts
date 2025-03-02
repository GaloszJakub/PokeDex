//Types + Obrazki
interface PokemonTypeData {
	pokemon: {
		pokemon: {
			name: string
			url: string
		}
	}[]
}

interface PokemonDetails {
	sprites: {
		other: {
			'official-artwork': {
				front_default: string
			}
		}
	}
	types: {
		type: {
			name: string
		}
	}[]
}

export const getPokemonByType = async (type: string) => {
	try {
		const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
		const typeData: PokemonTypeData = await typeResponse.json()

		const firstPokemon = typeData.pokemon[0].pokemon

		const pokemonResponse = await fetch(firstPokemon.url)
		const pokemonData: PokemonDetails = await pokemonResponse.json()

		return {
			type: type,
			image: pokemonData.sprites.other['official-artwork'].front_default,
			
		}
	} catch (error) {
		throw new Error(`Error fetching ${type} type Pokemon: ${error}`)
	}
}
