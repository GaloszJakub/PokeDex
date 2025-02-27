import { useState } from 'react'
import { CiFilter } from 'react-icons/ci'

export default function FilterDropDown() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="fixed top-4 right-4 z-50">
			<div
				className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer duration-300"
				onClick={() => setIsOpen(!isOpen)}>
				<CiFilter className="text-2xl text-gray-700" />
			</div>

			<div
				className={`mt-2 bg-white rounded-lg shadow-lg p-4 transition-all duration-300 ${
					isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
				}`}>
				<p>Filtruj według...</p>
			</div>
		</div>
	)
}
