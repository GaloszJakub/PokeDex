// src/components/TypeCarousel.tsx
import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { getPokemonByType } from '../../services/ApiService'
import { typeColors } from '../../utils/utils'

interface SlideData {
	type: string
	image: string
	name: string
}

export default function TypeCarousel() {
	const [slides, setSlides] = useState<SlideData[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const navigationPrevRef = useRef<HTMLButtonElement>(null)
	const navigationNextRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const types = Object.keys(typeColors)
				const results = await Promise.all(types.map(type => getPokemonByType(type)))
				setSlides(results)
				setLoading(false)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error')
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>

	return (
		<div className="max-w-full flex flex-col w-2/5  h-full">
			<div className="flex justify-between items-center mb-4 ">
				<h3 className="text-xl font-bold">Pokémon Types</h3>
				<div className="flex gap-2">
					<button ref={navigationPrevRef} className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
						←
					</button>
					<button ref={navigationNextRef} className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
						→
					</button>
				</div>
			</div>

			<div className="flex-1 overflow-hidden">
				<Swiper
					modules={[Navigation]}
					navigation={{
						prevEl: navigationPrevRef.current,
						nextEl: navigationNextRef.current,
					}}
					spaceBetween={30}
					slidesPerView={3}
					loop
					className="h-full">
					{slides.map(slide => (
						<SwiperSlide key={slide.type} className={`rounded-sm h-full relative  ${typeColors[slide.type]}`}>
							<div className="opacity-20 bg-white absolute inset-0 "></div>
							<div className="flex flex-col h-full p-2 z-20 absolute">
								<div className="flex-1 flex items-center justify-center  rounded">
									<img src={slide.image} alt={slide.name} className="w-full h-full max-h-32 object-contain p-" />
								</div>
								<h3 className="mt-2 text-lg font-bold text-center capitalize text-white">{slide.type}</h3>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}
