'use client'

import { useEffect, useState } from 'react'

import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import FlightCards from '@/components/FlightCard'
import Hero from '@/components/Hero'

const filters = [
  {
    id: 'Number of Stops',
    name: 'Number of Stops',
    options: [
      { value: 'Non Stop', label: 'Non Stop', checked: false },
      { value: 'One Stop', label: 'One Stop', checked: false },
      { value: 'Multi Stop', label: 'Multi Stop', checked: true },
    ],
  },
  {
    id: 'Cabin Type',
    name: 'Cabin Type',
    options: [
      { value: 'Economy', label: 'Economy', checked: false },
      { value: 'Premium Economy', label: 'Premium Economy', checked: false },
      { value: 'Business', label: 'Business', checked: true },
      { value: 'Premium Business', label: 'Premium Business', checked: false },
      { value: 'First Class', label: 'First Class', checked: false },
      { value: 'PremiumFirst', label: 'PremiumFirst', checked: false },
    ],
  },
  {
    id: 'Air Carrier',
    name: 'Air Carrier',
    options: [
      { value: 'US Bangla', label: 'US Bangla', checked: false },
      { value: 'Vistara', label: 'Vistara', checked: false },
      { value: 'Biman Bangladesh', label: 'Biman Bangladesh', checked: false },
      { value: 'Air India', label: 'Air India', checked: false },
      { value: 'Flydubai', label: 'Flydubai', checked: false },
      { value: 'SriLankan', label: 'SriLankan', checked: false },
      { value: 'Gulf Air', label: 'Gulf Air', checked: false },
      { value: 'Saudi Arabian', label: 'Saudi Arabian', checked: false },
      { value: 'Qatar Airways', label: 'Qatar Airways', checked: false },
      { value: 'Turkish Airlines', label: 'Turkish Airlines', checked: false },
      { value: 'Singapore Airl', label: 'Singapore Airl', checked: false },
      { value: 'China Southern', label: 'China Southern', checked: false },
    ],
  },
]


export default function Example() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await fetch('/zoo-flight-search.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data.result)
        setFlights(data.result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchFlightData();
  }, []);

  return (
    <div className="bg-white mt-1">
      <div>
        <main className="">
          {/* Hero Section */}
          <Hero />
          <section aria-labelledby="products-heading" className="pb-24 pt-6 mx-auto w-11/12">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Forms */}
              <form className="hidden lg:block border p-2 h-fit rounded-md shadow-md">
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
              {/* Product grid */}
              <div className="lg:col-span-4">
                <FlightCards flights={flights} loading={loading} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
