'use client'
import React, { useEffect, useState } from 'react';

const FlightCards = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const response = await fetch('/test.json');
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

    const toggleDetails = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="grid grid-cols-1 w-11/12 mx-auto">
            {flights.map(flight => (
                <div key={flight.id} className="flight-card border rounded-md shadow-lg mb-5">
                    <div className="p-4 flex justify-between items-center bg-white">
                        <div>
                            <div className="flex items-center">
                                <img src="https://via.placeholder.com/30" alt="Airline Logo" className="mr-2" />
                                <div>
                                    <p className="text-lg font-semibold">{flight.departure} - {flight.arrival}</p>
                                    <p className="text-gray-500">{flight.departureTime} - {flight.arrivalTime}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">Transit Time: {flight.duration}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold text-red-600">{flight.price} {flight.currency}</p>
                            <p className="text-sm line-through text-gray-400">{flight.originalPrice} {flight.currency}</p>
                            <button
                                className="bg-blue-500 text-white px-4 py-1 mt-2 rounded"
                                onClick={() => toggleDetails(flight.id)}
                            >
                                Flight Details
                            </button>
                        </div>
                    </div>
                    {expandedCard === flight.id && (
                        <div className="flight-details bg-gray-100 p-4">
                            {flight.legs.map(leg => (
                                <div key={leg.ref} className="leg-details mb-4">
                                    <div className="mb-2">
                                        <p className="text-gray-700">Departure: {leg.segment.departureLocation} at {leg.segmentDetails[0].origin.dateTime}</p>
                                        <p className="text-gray-700">Arrival: {leg.segment.arrivalLocation} at {leg.segmentDetails[leg.segmentDetails.length - 1].destination.dateTime}</p>
                                    </div>
                                    <div className="segment-details border-t border-gray-300 pt-2">
                                        {leg.segmentDetails.map(segment => (
                                            <div key={segment.id} className="segment mb-2">
                                                <p className="text-sm text-gray-600">Flight Number: {segment.fleet.marketingFlightNumber}</p>
                                                <p className="text-sm text-gray-600">Departure: {segment.origin.city} ({segment.origin.airport}) at {segment.origin.dateTime}</p>
                                                <p className="text-sm text-gray-600">Arrival: {segment.destination.city} ({segment.destination.airport}) at {segment.destination.dateTime}</p>
                                                <p className="text-sm text-gray-600">Equipment: {segment.fleet.equipment.code}</p>
                                                <p className="text-sm text-gray-600">Cabin: {segment.fleet.marketing} ({segment.fleet.marketingFlightNumber})</p>
                                                <p className="text-sm text-gray-600">Total Miles Flown: {segment.totalMilesFlown}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {flight.pricingInformation.map(priceInfo => (
                                <div key={priceInfo.pricingSubsource} className="pricing-details border-t border-gray-300 pt-2">
                                    <h3 className="text-md font-semibold text-gray-700">Price Information</h3>
                                    <p className="text-sm text-gray-600">Total Fare: {priceInfo.fare.totalFare.totalFare} {priceInfo.fare.totalFare.currency}</p>
                                    <p className="text-sm text-gray-600">Base Fare: {priceInfo.fare.totalFare.baseFareAmount} {priceInfo.fare.totalFare.baseFareCurrency}</p>
                                    <p className="text-sm text-gray-600">Total Tax: {priceInfo.fare.totalFare.totalTaxAmount}</p>
                                    <p className="text-sm text-gray-600">Equivalent Fare: {priceInfo.fare.totalFare.equivalentAmount} {priceInfo.fare.totalFare.equivalentCurrency}</p>
                                    <p className="text-sm text-gray-600">Discount Amount: {priceInfo.fare.totalFare.discountAmount}</p>
                                    <p className="text-sm text-gray-600">Net Total Fare: {priceInfo.fare.totalFare.netTotalFareAmount}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FlightCards;
