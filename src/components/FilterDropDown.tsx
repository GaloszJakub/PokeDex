import { useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'



export default function FilterDropDown() {
	const [types, setTypes] = useState<string[]>([])
	const [selectedTypes, setSelectedTypes] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchTypes = async () => {
			try {
				const response = await fetch('https://pokeapi.co/api/v2/type/')
				if (!response.ok) throw new Error('Nie udało się pobrać typów')
				const data = await response.json()
				const typeNames = data.results
					.map((type: any) => type.name)
					.sort()
					.filter((type: string) => type !== 'unknown' && type !== 'shadow')
				setTypes(typeNames)
			} catch (err) {
				console.error('Błąd podczas pobierania typów:', err)
				setError('Nie udało się załadować typów')
			} finally {
				setIsLoading(false)
			}
		}
		fetchTypes()
	}, [])

	
	return (
		<div className="fixed top-4 right-4 z-50">
			{isLoading ? (
				<div>Ładowanie typów...</div>
			) : error ? (
				<div>{error}</div>
			) : (
				<Listbox value={selectedTypes} onChange={setSelectedTypes} multiple>
					<Listbox.Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md shadow-md hover:bg-gray-100">
						{selectedTypes.length > 0 ? `Wybierz typ (${selectedTypes.length} wybrano)` : 'Wybierz typ'}
					</Listbox.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95">
						<Listbox.Options className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
							{types.map(type => (
								<Listbox.Option key={type} value={type}>
									{({ selected }) => (
										<div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
											<input type="checkbox" checked={selected} readOnly className="mr-2" />
											{type.charAt(0).toUpperCase() + type.slice(1)}
										</div>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</Listbox>
			)}
		</div>
	)
}
