import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/list.css';
import Header from './Header';

const List = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [engineTypes, setEngineTypes] = useState([]);
    const [transmissions, setTransmissions] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [bodyTypes, setBodyTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20; // Changed from useState as the value seems constant
    const [selectedCar, setSelectedCar] = useState(null);
    const [filters, setFilters] = useState({
        brand: '',
        engineType: '',
        transmission: '',
        condition: '',
        bodyType: '',
        minPrice: '',
        maxPrice: '',
        minMileage: '',
        maxMileage: '',
    });


    useEffect(() => {
        const fetchCars = async () => {
            try {
                const responses = await Promise.all([
                    axios.get('http://localhost:4001/api/cars'),
                    axios.get('http://localhost:4001/api/brands'),
                    axios.get('http://localhost:4001/api/engine-types'),
                    axios.get('http://localhost:4001/api/transmissions'),
                    axios.get('http://localhost:4001/api/conditions'),
                    axios.get('http://localhost:4001/api/body-types'),
                ]);
                
                setCars(responses[0].data);
                setFilteredCars(responses[0].data); // Initialize with all cars
                setBrands(responses[1].data);
                setEngineTypes(responses[2].data);
                setTransmissions(responses[3].data);
                setConditions(responses[4].data);
                setBodyTypes(responses[5].data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCars();
    }, []);

    useEffect(() => {
        // Apply filters
        const filtered = cars.filter(car => (
            (!filters.brand || car.Brand.Name === brands.find(b => b.id === filters.brand)?.name) &&
            (!filters.engineType || car.EngineType.Type === engineTypes.find(e => e.id === filters.engineType)?.name) &&
            (!filters.transmission || car.Transmission.Type === transmissions.find(t => t.id === filters.transmission)?.name) &&
            (!filters.condition || car.Condition === conditions.find(c => c.id === filters.condition)?.name) &&
            (!filters.bodyType || car.BodyType.Type === bodyTypes.find(bt => bt.id === filters.bodyType)?.name) &&
            (!filters.minPrice || car.Price >= filters.minPrice) &&
            (!filters.maxPrice || car.Price <= filters.maxPrice) &&
            (!filters.minMileage || car.Mileage >= filters.minMileage) &&
            (!filters.maxMileage || car.Mileage <= filters.maxMileage)
        ));
        setFilteredCars(filtered);
        setCurrentPage(1); // Reset to first page on filter change
    }, [filters, cars, brands, models, engineTypes, transmissions, conditions, bodyTypes]);
    

    const selectCar = (car) => setSelectedCar(car);
    const closeModal = () => setSelectedCar(null);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    

    const renderModal = () => {
        if (!selectedCar) return null;
        return (
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="carModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="carModalLabel">{selectedCar.Brand.Name} {selectedCar.Model.Name}</h5>
                            <button type="button" className="close" onClick={closeModal} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Car details */}
                            <p>Year: { selectedCar.Year }</p>
                            <p>Price: ${ selectedCar.Price }</p>
                            <p>Mileage: { selectedCar.Mileage }</p>
                            <p>Engine Type: { selectedCar.EngineType.Type }</p>
                            <p>Transmission: { selectedCar.Transmission.Type }</p>
                            <p>Color: { selectedCar.Color }</p>
                            <p>Condition: { selectedCar.Condition }</p>
                            <p>Body Type: { selectedCar.BodyType.Type }</p>
                            <p>Interior Features: { selectedCar.InteriorFeatures }</p>
                            <p>Safety Features: { selectedCar.SafetyFeatures }</p>
                            <p>Fuel Economy: { selectedCar.FuelEconomy }</p>
                            <p>Location: { selectedCar.Location }</p>
                            <p>VIN: { selectedCar.VIN }</p>
                            {/* ...other car details */}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const pageNumbers = () => Array.from({ length: Math.ceil(filteredCars.length / pageSize) }, (_, i) => i + 1);
    const setPage = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div><Header />
        <div className="container">
            {/* Filter controls */}
            <div className="filters">
                {/* Brands Filter */}
                <select className="form-control mb-2" onChange={(e) => handleFilterChange('brand', e.target.value)}>
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
                
                {/* Engine Types Filter */}
                <select className="form-control mb-2" onChange={(e) => handleFilterChange('engineType', e.target.value)}>
                    <option value="">All Engine Types</option>
                    {engineTypes.map(engineType => (
                        <option key={engineType.id} value={engineType.id}>{engineType.name}</option>
                    ))}
                </select>

                {/* Transmissions Filter */}
                <select className="form-control mb-2" onChange={(e) => handleFilterChange('transmission', e.target.value)}>
                    <option value="">All Transmissions</option>
                    {transmissions.map(transmission => (
                        <option key={transmission.id} value={transmission.id}>{transmission.name}</option>
                    ))}
                </select>

                {/* Conditions Filter */}
                <select className="form-control mb-2" onChange={(e) => handleFilterChange('condition', e.target.value)}>
                    <option value="">All Conditions</option>
                    {conditions.map(condition => (
                        <option key={condition.id} value={condition.id}>{condition.name}</option>
                    ))}
                </select>

                {/* Body Types Filter */}
                <select className="form-control mb-2" onChange={(e) => handleFilterChange('bodyType', e.target.value)}>
                    <option value="">All Body Types</option>
                    {bodyTypes.map(bodyType => (
                        <option key={bodyType.id} value={bodyType.id}>{bodyType.name}</option>
                    ))}
                </select>
                {/* Price Filters */}
                <div className="form-row">
                    <div className="col">
                        <input 
                            type="number" 
                            className="form-control"
                            placeholder="Min Price"
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            value={filters.minPrice}
                        />
                    </div>
                    <div className="col">
                        <input 
                            type="number" 
                            className="form-control"
                            placeholder="Max Price"
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            value={filters.maxPrice}
                        />
                    </div>
                </div>

                {/* Mileage Filters */}
                <div className="form-row mt-2">
                    <div className="col">
                        <input 
                            type="number" 
                            className="form-control"
                            placeholder="Min Mileage"
                            onChange={(e) => handleFilterChange('minMileage', e.target.value)}
                            value={filters.minMileage}
                        />
                    </div>
                    <div className="col">
                        <input 
                            type="number" 
                            className="form-control"
                            placeholder="Max Mileage"
                            onChange={(e) => handleFilterChange('maxMileage', e.target.value)}
                            value={filters.maxMileage}
                        />
                    </div>
                </div>
            </div>
            <div className="car-cards">
                <div className="row">
                    {filteredCars.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(car => (
                        <div key={car.id} className="col-md-12 mb-4">
                            <div className="card">
                                <div className="row no-gutters">
                                    <div className="col-md-2">
                                        <img src={car.ProfileImage} className="card-img" alt={`${car.Brand.Name} ${car.Model.Name}`} />
                                    </div>
                                    <div className="col-md-10">
                                        <div className="card-body">
                                            <h5 className="card-title">{car.Brand.Name} {car.Model.Name}</h5>
                                            <p>Price: ${car.Price}</p>
                                            <p>Mileage: {car.Mileage}</p>
                                            <button type="button" className="btn btn-primary" onClick={() => selectCar(car)}>View Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                    {/* Pagination at the bottom of the cards */}
                    <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        {pageNumbers().map(number => (
                            <li key={number} className="page-item">
                                <a 
                                    className="page-link" 
                                    href="#!" 
                                    onClick={(e) => { e.preventDefault(); setPage(number); }}
                                >
                                    {number}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {renderModal()}
        </div>
        </div>
    );
};

export default List;
