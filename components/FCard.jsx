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

    return (
        <div className="w-full">
            {flights.map(flight => (
                <div key={flight.id} className="flight-card">
                    <h2>Flight ID: {flight.id}</h2>
                    <button onClick={() => toggleDetails(flight.id)}>Flight Details</button>
                    {expandedCard === flight.id && (
                        <div className="flight-details">
                            {flight.legs.map(leg => (
                                <div key={leg.ref} className="leg-details">
                                    <p>
                                        Departure: {leg.segment.departureLocation} at {leg.segmentDetails[0].origin.dateTime}
                                    </p>
                                    <p>
                                        Arrival: {leg.segment.arrivalLocation} at {leg.segmentDetails[leg.segmentDetails.length - 1].destination.dateTime}
                                    </p>
                                    <div className="segment-details">
                                        {leg.segmentDetails.map(segment => (
                                            <div key={segment.id} className="segment">
                                                <p>Flight Number: {segment.fleet.marketingFlightNumber}</p>
                                                <p>Departure: {segment.origin.city} ({segment.origin.airport}) at {segment.origin.dateTime}</p>
                                                <p>Arrival: {segment.destination.city} ({segment.destination.airport}) at {segment.destination.dateTime}</p>
                                                <p>Equipment: {segment.fleet.equipment.code}</p>
                                                <p>Cabin: {segment.fleet.marketing} ({segment.fleet.marketingFlightNumber})</p>
                                                <p>Total Miles Flown: {segment.totalMilesFlown}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {flight.pricingInformation.map(priceInfo => (
                                <div key={priceInfo.pricingSubsource} className="pricing-details">
                                    <h3>Price Information</h3>
                                    <p>Total Fare: {priceInfo.fare.totalFare.totalFare} {priceInfo.fare.totalFare.currency}</p>
                                    <p>Base Fare: {priceInfo.fare.totalFare.baseFareAmount} {priceInfo.fare.totalFare.baseFareCurrency}</p>
                                    <p>Total Tax: {priceInfo.fare.totalFare.totalTaxAmount}</p>
                                    <p>Equivalent Fare: {priceInfo.fare.totalFare.equivalentAmount} {priceInfo.fare.totalFare.equivalentCurrency}</p>
                                    <p>Discount Amount: {priceInfo.fare.totalFare.discountAmount}</p>
                                    <p>Net Total Fare: {priceInfo.fare.totalFare.netTotalFareAmount}</p>
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