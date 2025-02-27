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
		<div className="w-full rounded-xl  py-8 px-4">
			<div className="flex md:justify-between justify-center items-center mb-8 ">
				<h2 className="text-3xl font-bold text-gray-800 ">Pokémon's</h2>
			</div>

			<Swiper
				modules={[Navigation]}
				spaceBetween={24}
				slidesPerView={1}
				loop
				breakpoints={{
					768: { slidesPerView: 2 },
					1024: { slidesPerView: 2 },
					1280: { slidesPerView: 3 },
				}}
				className="px-6">
				{pokemons.map(pokemon => (
					<SwiperSlide key={pokemon.id}>
						<div className="group h-full bg-white rounded-xl">
							<div className="flex flex-col md:flex-row gap-6 p-6 h-full">
								<div className="md:w-2/5 flex items-center bg-gray-50 rounded-lg p-4">
									<img
										src={pokemon.sprites.other['official-artwork'].front_default}
										alt={pokemon.name}
										className="w-full h-48 object-contain transition-transform group-hover:scale-105"
									/>
								</div>

								<div className="md:w-3/5 flex flex-col justify-between">
									<div>
										<div className="flex justify-between items-start mb-4">
											<h3 className="text-2xl font-bold capitalize">{pokemon.name}</h3>
											<span className="text-lg text-gray-500 font-medium">
												#{pokemon.id.toString().padStart(3, '0')}
											</span>
										</div>

										<div className="mb-4">
											<div className="flex flex-wrap gap-2">
												{pokemon.types.map((t: any) => (
													<span
														key={t.type.name}
														className={`py-1 px-3 text-sm font-medium capitalize rounded-full
														 text-white`}>
														{t.type.name}
													</span>
												))}
											</div>
										</div>

										<p className="text-gray-600 mb-6 line-clamp-3">{pokemon.description.replace(/[\n\f]/g, ' ')}</p>
									</div>

									<div>
										<p className="text-sm font-semibold text-gray-700 mb-2">Weaknesses:</p>
										<div className="flex flex-wrap gap-2">
											{pokemon.weaknesses.map((weakness: string) => (
												<span
													key={weakness}
													className="px-3 py-1 text-xs font-medium capitalize bg-red-100 text-red-800 rounded-full">
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
