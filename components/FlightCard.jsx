'use client'
import React, { useState } from 'react';

const FlightCards = ({flights,loading}) => {
    const [error, setError] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);

    const toggleDetails = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    // Formate Date 
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    

    // Formate Date and Time 
    const formatToHHMM = (dateTime, timeZone) => {
        const date = new Date(`${dateTime}${timeZone}`);
        const utcDate = new Date(date.toUTCString());
        const hours = utcDate.getUTCHours().toString().padStart(2, '0');
        const minutes = utcDate.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Formating Flight total hours 
    const calculateTotalElapsedTime = (segmentDetails) => {
        let totalMinutes = 0;

        segmentDetails.forEach(segment => {
            totalMinutes += segment.elapsedTime;
        });

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return `${hours} h ${minutes} m`;
    };

    return (
        <div className="grid grid-cols-1 w-11/12 mx-auto gap-5">
            {flights.map(flight => (
                <div key={flight.id} className='border rounded-lg shadow-md'>
                    <section className='md:flex justify-between items-center p-4'>
                        <div>
                            <p className='text-sm text-gray-600 mb-2'>{formatDate(flight.legs[0].segment.departureDate)}</p>
                            <img src="/flag.gif" alt="" />
                            <p className='text-sm text-gray-600'>{flight.legs[0].segmentDetails[0].fleet.marketing} ({flight.legs[0].segmentDetails[0].fleet.marketingFlightNumber})</p>
                            <p className='text-sm text-gray-600'>Singapore Airl</p>
                        </div>

                        <div>
                            <h5 className='text-xl font-bold'>{formatToHHMM(flight.legs[0].segmentDetails[0].origin.dateTime, flight.legs[0].segmentDetails[0].origin.timeZone)}</h5>
                            <p className='text-sm text-gray-600'>{flight.legs[0].segment.departureLocation}</p>
                        </div>

                        <div>
                            <div className='flex items-center justify-center gap-2'>
                                <p>{flight.legs[0].segment.departureLocation}</p>
                                <img src="/plane-flight.png" alt="" />
                                <p>{flight.legs[0].segment.arrivalLocation}</p>
                            </div>
                            <div className='flex items-center justify-center gap-2 my-1'>
                                <p className='border px-2 py-0.5 rounded-md'>One Stop</p>
                                <p className='border px-2 py-0.5 rounded-md'>Economy</p>
                            </div>
                            <div className='flex items-center justify-center gap-2'>
                                <p className='border px-2 py-0.5 rounded-md'>{calculateTotalElapsedTime(flight.legs[0].segmentDetails)}</p>
                                <p className='border px-2 py-0.5 rounded-md'>{flight.nonRefundable ? 'Non Refundable' : 'Refundable'} </p>
                            </div>

                        </div>

                        <div>
                            <h5 className='text-xl font-bold'>{formatToHHMM(flight.legs[0].segmentDetails[flight.legs[0].segmentDetails.length - 1].destination.dateTime, flight.legs[0].segmentDetails[flight.legs[0].segmentDetails.length - 1].destination.timeZone)}</h5>
                            <p className='text-sm text-gray-600'>{flight.legs[0].segment.arrivalLocation}</p>
                        </div>

                        <div>
                            <p className='text-red-600 text-sm'>{flight.priceBreakDown[0].passengerInfo.passengerTotalFare.discountPercentage} % Discount</p>
                            <p className='text-xl'>{flight.totalPrice.currency} {Math.floor(flight.priceBreakDown[0].passengerInfo.passengerTotalFare.netTotalFareAmount)}</p>
                            <p><del>{flight.totalPrice.currency} {flight.totalPrice.totalPrice}</del></p>
                            <button className='text-white px-2 py-1 bg-[#EC8134] rounded-md'>Book Now</button>
                        </div>
                    </section>
                    <section className='flex justify-between items-center bg-gray-100 px-4 py-2'>
                        <div className='flex items-center'>
                            <p className='mr-1'>Send Query :</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                            </svg>
                        </div>

                        <button className='flex items-center text-sm' onClick={() => toggleDetails(flight.id)}>
                            Flight Details
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </section>
                    {expandedCard === flight.id && (
                        <section className="p-4 border-b-4 border-b-[#3C6382] rounded-lg">
                            <div className='flex items-center bg-[#0A3D62] w-fit px-8 py-1 text-white gap-2'>
                                <p>{flight.legs[0].segment.departureLocation}</p>
                                <img className='w-[20px]' src="/aro-icon.png" alt="" />
                                <p>{flight.legs[0].segment.arrivalLocation}</p>
                            </div>
                            <hr />
                            {
                                flight.legs[0].segmentDetails.map((segment, idx) => (
                                    <div className='md:flex justify-between py-4 border-b'>
                                        <div>
                                            <img src="/flag.gif" alt="" />
                                        </div>
                                        <div>
                                            <p className='text-sm text-gray-600'>{segment.fleet.marketing}</p>
                                            <p className='text-sm text-gray-600'>Aircraft: {segment.fleet.marketingFlightNumber}</p>
                                        </div>
                                        <div>
                                            <p className='text-sm text-gray-600'>{segment.origin.dateTime}</p>
                                            <p className='text-sm text-gray-600'>{segment.origin.airport}</p>
                                        </div>
                                        <div>
                                            <p className='border px-2 py-0.5 rounded-md w-fit'>Economy</p>
                                        </div>

                                        <div className='flex flex-col justify-between'>
                                            <div className='mb-5'>
                                                <p className='text-sm text-gray-600'>{segment.destination.dateTime}</p>
                                                <p className='text-sm text-gray-600'>{segment.destination.airport}</p>
                                            </div>
                                            <div className='border-l pl-2'>
                                                <p className='text-sm text-gray-600'>Available Seat : {flight.pricingInformation[0].fare.passengerInfoList[0].passengerInfo.fareComponents[0].segments[idx].segment.seatsAvailable}</p>
                                                <p className='text-sm text-gray-600'>Cabin: {flight.pricingInformation[0].fare.passengerInfoList[0].passengerInfo.fareComponents[0].segments[idx].segment.cabinCode} ( rbd: {flight.pricingInformation[0].fare.passengerInfoList[0].passengerInfo.fareComponents[0].segments[idx].segment.bookingCode})</p>
                                            </div>
                                        </div>

                                        <div className='flex flex-col justify-between'>
                                            <div className='mb-5'>
                                                <p className='text-sm text-gray-600'>{segment.fleet.operating}</p>
                                                <p className='text-sm text-gray-600'>{segment.fleet.operatingFlightNumber}</p>
                                            </div>
                                            <div className='border-l pl-2'>
                                                <p className='text-sm text-gray-600'>Baggage</p>
                                                <p className='text-sm text-gray-600'>1 Pcs</p>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </section>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FlightCards;