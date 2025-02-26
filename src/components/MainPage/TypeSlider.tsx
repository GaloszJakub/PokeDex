// src/components/TypeCarousel.tsx
import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { getPokemonByType } from '../../services/ApiService'

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
				const types = ['poison', 'ice', 'fire', 'water', 'electric']
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
		<div className="max-w-full flex-col w-1/3 border h-full ">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-xl font-bold">Your Title Here</h3>
				<div className="flex gap-2">
					<button ref={navigationPrevRef} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
						←
					</button>
					<button ref={navigationNextRef} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
						→
					</button>
				</div>
			</div>

			<Swiper
				modules={[Navigation]}
				navigation={{
					prevEl: navigationPrevRef.current,
					nextEl: navigationNextRef.current,
				}}
				spaceBetween={30}
				slidesPerView={3}
				loop>
				{slides.map(slide => (
					<SwiperSlide key={slide.type} className="bg-white rounded-sm">
						<div className="flex flex-col items-center p-2 border ">
							<img src={slide.image} alt={slide.name} className="w-24 h-24 object-contain" />
							<h3 className="mt-4 text-2xl font-bold capitalize">{slide.type}</h3>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
