'use client'

import { Fragment, useEffect, useState } from 'react'

import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import FlightCards from '@/components/FlightCard'

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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
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
        console.log(data.result)
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
          <section className='bg-[#3C6382] py-10'>
            <div className="flex w-11/12 mx-auto mb-0.5">
              <div className="flex">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <div>
                    <input type="radio" id="profile" name="tab" value="profile" className="hidden peer" />
                    <label
                      htmlFor="profile"
                      className="px-4 bg-white border border-gray-200 rounded-l-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 focus:z-10 focus:ring-2 peer-checked:bg-[#EA8135] peer-checked:text-white py-5 peer-checked:border-b-4 peer-checked:border-[#0A3D62]"
                    >
                      Round Trip
                    </label>
                  </div>

                  <div>
                    <input type="radio" id="settings" name="tab" value="settings" className="hidden peer" defaultChecked />
                    <label
                      htmlFor="settings"
                      className="px-4 bg-white border-t border-b border-gray-200 cursor-pointer hover:text-gray-600 hover:bg-gray-100 focus:z-10 focus:ring-2 peer-checked:bg-[#EA8135] peer-checked:text-white py-5 peer-checked:border-b-4 peer-checked:border-[#0A3D62]"
                    >
                      One Way
                    </label>
                  </div>

                  <div>
                    <input type="radio" id="messages" name="tab" value="messages" className="hidden peer" />
                    <label
                      htmlFor="messages"
                      className="px-4 bg-white border border-gray-200 rounded-r-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 focus:z-10 focus:ring-2 peer-checked:bg-[#EA8135] peer-checked:text-white py-5 peer-checked:border-b-4 peer-checked:border-[#0A3D62]"
                    >
                      Multi City
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center w-11/12 mx-auto mt-5">
              <div className="bg-white w-full shadow-md rounded p-4 md:flex items-center md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2">
                  <span role="img" aria-label="plane" className="text-xl">✈️</span>
                  <div>
                    <div className="text-gray-500 text-sm">Flying from</div>
                    <input
                      className="border-none focus:outline-none focus:ring-0"
                      type="text" placeholder='City or Airport'
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span role="img" aria-label="plane" className="text-xl">✈️</span>
                  <div>
                    <div className="text-gray-500 text-sm">Flying to</div>
                    <input
                      className="border-none focus:outline-none focus:ring-0"
                      type="text" placeholder='City or Airport'
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-xl text-gray-600">&#128197;</div>
                  <div>
                    <div className="text-gray-500 text-sm">Departing</div>
                    <input
                      className="border-none focus:outline-none focus:ring-0"
                      type="date"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-xl text-gray-600">&#128100;</div>
                  <div>
                    <div className="text-gray-500 text-sm">Travelers</div>
                    <input
                      className="border-none focus:outline-none focus:ring-0"
                      type="text" placeholder='1 Adult Economy'
                    />
                  </div>
                </div>
                <button className="bg-orange-500 text-white px-4 py-2 rounded flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  Modify Search
                </button>
              </div>
            </div>
            <div className='bg-[#0A3D62] flex justify-center py-1 my-5'>
              <div className='text-white text-sm'>
                <p>20 May, 2024</p>
                <div className='flex justify-center items-center text-sm'>
                  <p>DAC</p>
                  <img className='w-[20px] mx-1' src="/aro-icon.png" alt="" />
                  <p>DXB</p>
                </div>
              </div>
            </div>
          </section>
          <section aria-labelledby="products-heading" className="pb-24 pt-6 mx-auto w-11/12">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Filters */}
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
