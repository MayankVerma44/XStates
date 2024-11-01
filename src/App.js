import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationSelector = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [message, setMessage] = useState('');

    // Fetch all countries on initial render
    useEffect(() => {
        axios.get('https://crio-location-selector.onrender.com/countries')
            .then((response) => setCountries(response.data))
            .catch((error) => console.error('Error fetching countries:', error));
    }, []);

    // Fetch states of the selected country
    useEffect(() => {
        if (selectedCountry) {
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
                .then((response) => setStates(response.data))
                .catch((error) => console.error('Error fetching states:', error));
            setSelectedState('');
            setCities([]);
            setSelectedCity('');
        }
    }, [selectedCountry]);

    // Fetch cities of the selected state in the selected country
    useEffect(() => {
        if (selectedState) {
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
                .then((response) => setCities(response.data))
                .catch((error) => console.error('Error fetching cities:', error));
            setSelectedCity('');
        }
    }, [selectedState]);

    // Handle country selection
    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setMessage('');
    };

    // Handle state selection
    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setMessage('');
    };

    // Handle city selection
    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setMessage(`You selected ${e.target.value}, ${selectedState}, ${selectedCountry}`);
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
            <h2>Location Selector</h2>

            {/* Country Dropdown */}
            <div>
                <label htmlFor="country">Select Country:</label>
                <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">-- Select Country --</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>

            {/* State Dropdown */}
            <div>
                <label htmlFor="state">Select State:</label>
                <select
                    id="state"
                    value={selectedState}
                    onChange={handleStateChange}
                    disabled={!selectedCountry}
                >
                    <option value="">-- Select State --</option>
                    {states.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>

            {/* City Dropdown */}
            <div>
                <label htmlFor="city">Select City:</label>
                <select
                    id="city"
                    value={selectedCity}
                    onChange={handleCityChange}
                    disabled={!selectedState}
                >
                    <option value="">-- Select City --</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

            {/* Message */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default LocationSelector;
