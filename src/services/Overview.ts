interface NamedAPIResource {
	name: string
	url: string
}

//Abilites
export async function getAbilitiesList(): Promise<NamedAPIResource[]> {
	const response = await fetch('https://pokeapi.co/api/v2/ability?limit=1000')
	if (!response.ok) {
		throw new Error('Błąd sieci')
	}
	const data = await response.json()
	return data.results
}

//Items
export async function getItemsList(): Promise<NamedAPIResource[]> {
	const response = await fetch('https://pokeapi.co/api/v2/item?limit=1000')
	if (!response.ok) {
		throw new Error('Błąd sieci')
	}
	const data = await response.json()
	return data.results
}

//Moves
export async function getMovesList(): Promise<NamedAPIResource[]> {
	const response = await fetch('https://pokeapi.co/api/v2/move?limit=1000')
	if (!response.ok) {
		throw new Error('Błąd sieci')
	}
	const data = await response.json()
	return data.results
}
