import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { fetchRandomPokemon } from '../../services/ApiService'

export default function MainSlider() {
	const [pokemons, setPokemons] = useState<any[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const generateRandomIds = () => {
			const ids = new Set<number>()
			while (ids.size < 20) {
				ids.add(Math.floor(Math.random() * 898) + 1)
			}
			return Array.from(ids)
		}

		const fetchData = async () => {
			try {
				const ids = generateRandomIds()
				const results = await Promise.all(
					ids.map(id =>
						fetchRandomPokemon(id).catch(error => {
							console.error(`Failed to fetch Pokemon ${id}:`, error)
							return null
						})
					)
				)

				const validResults = results.filter(Boolean)
				setPokemons(validResults)
				setLoading(false)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error')
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) return <div className="text-center p-4">Loading...</div>
	if (error) return <div className="text-red-500 p-4">Error: {error}</div>

	return (
		<div className="w-full my-8  h-full ">
			<div className="flex justify-between items-center mb-4 px-2">
				<h2 className="text-2xl font-bold">Pokémon's</h2>
			</div>

			<Swiper
				modules={[Navigation]}
				spaceBetween={20}
				slidesPerView={2}
				loop
				breakpoints={{
					640: { slidesPerView: 2 },
					1024: { slidesPerView: 3 },
				}}>
				{pokemons.map(pokemon => (
					<SwiperSlide key={pokemon.id} className="group h-full ">
						<div className="flex flex-col h-full border rounded-lg p-4 bg-white shadow-lg">
							<div className="flex gap-4 h-full">
								<div className="w-2/5 flex items-center">
									<img
										src={pokemon.sprites.other['official-artwork'].front_default}
										alt={pokemon.name}
										className="w-full h-auto object-contain"
									/>
								</div>

								<div className="w-3/5 flex flex-col justify-between">
									<div>
										<div className="flex items-center justify-between">
											<h3 className="text-xl font-extrabold uppercase tracking-widest">{pokemon.name}</h3>
											<span className="text-lg text-gray-500 font-thin">#{pokemon.id.toString().padStart(3, '0')}</span>
										</div>

										<div className="mt-2">
											<div className="flex flex-wrap gap-1 mt-1">
												{pokemon.types.map((t: any) => (
													<span key={t.type.name} className="py-1 px-2 text-xs capitalize border rounded-full">
														{t.type.name}
													</span>
												))}
											</div>
										</div>
									</div>

									<p className="text-sm mt-2 italic">{pokemon.description.replace(/[\n\f]/g, ' ')}</p>

									<div className="mt-2">
										<p className="text-sm font-extrabold">Weaknesses:</p>
										<div className="flex flex-wrap gap-1 mt-1">
											{pokemon.weaknesses.map((weakness: string) => (
												<span key={weakness} className="px-2 py-1 rounded-full border text-xs capitalize ">
													{weakness}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
