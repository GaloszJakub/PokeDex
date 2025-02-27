// src/components/TypeCarousel.tsx
import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { getPokemonByType } from '../../services/Types'
import { typeColors } from '../../utils/utils'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6'

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
		<div className="max-w-6xl mx-auto px-4 h-full flex flex-col ">
			<div className="flex justify-between items-center mb-6">
				<h3 className="text-2xl font-bold text-gray-800">Pokémon Types</h3>
				<div className="flex gap-3">
					<button
						ref={navigationPrevRef}
						className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-200 duration-150">
						<FaChevronLeft />
					</button>
					<button
						ref={navigationNextRef}
						className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-200 duration-150">
						<FaChevronRight />
					</button>
				</div>
			</div>

			<div className="flex-1 mb-4">
				<Swiper
					modules={[Navigation]}
					navigation={{
						prevEl: navigationPrevRef.current,
						nextEl: navigationNextRef.current,
					}}
					spaceBetween={20}
					slidesPerView={2}
					breakpoints={{
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					loop
					className="h-max">
					{slides.map(slide => (
						<SwiperSlide key={slide.type} className={`rounded-xl overflow-hidden relative ${typeColors[slide.type]}`}>
							<div className="bg-gradient-to-b from-transparent to-black/30 absolute inset-0" />
							<div className="flex flex-col h-full p-4 relative">
								<div className="flex-1 flex items-center p-4">
									<img src={slide.image} alt={slide.name} className="w-full h-40 object-contain drop-shadow-lg" />
								</div>
								<h3 className="text-xl font-semibold text-center text-white drop-shadow-md uppercase">{slide.type}</h3>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}
