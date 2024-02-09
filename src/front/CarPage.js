import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/carpage.css'
import Header from './Header';

function importAll(r) {
    return r.keys().map(r);
  }
  
  // Now 'images' is an array of URLs which you can use in your component
  
// CarPhotoDisplay Component
const CarPhotoDisplay = ({ profilePhoto }) => {
    // Import all photos from the assets/images directory
    const photos = importAll(require.context('./img', false, /\.(png|jpe?g|svg|jpg)$/));
  
    // State to keep track of the currently displayed main photo
    const [mainPhoto, setMainPhoto] = useState(profilePhoto);
  
    // Function to change the main photo
    const handleThumbnailClick = (photo) => {
      setMainPhoto(photo);
    };
  
    return (
      <div>
        <img src={mainPhoto} alt="Car Profile" className="img-fluid mb-3 img-main" />
        <div className="d-flex overflow-auto">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Car ${index}`}
              className="img-thumbnail mr-2"
              style={{ width: '100px', height: '100px', backgroundColor: '#242444' }}
              onClick={() => handleThumbnailClick(photo)}
            />
          ))}
        </div>
      </div>
    );
  };


// CarDetails Component
const CarDetails = ({ car }) => (
    <div>
        <h2>{car.brand} {car.model} - {car.year}</h2>
        <table className="Customtable table-striped mt-3">
            <tbody>
                <tr>
                    <td>Price</td>
                    <td>${car.price}</td>
                </tr>
                <tr>
                    <td>Mileage</td>
                    <td>{car.mileage} miles</td>
                </tr>
                <tr>
                    <td>Engine Type</td>
                    <td>{car.engineType} miles</td>
                </tr>
                <tr>
                    <td>Transmission</td>
                    <td>{car.transmission} miles</td>
                </tr>
                <tr>
                    <td>Color</td>
                    <td>{car.color} miles</td>
                </tr>
                <tr>
                    <td>Condition</td>
                    <td>{car.condition} miles</td>
                </tr>
                <tr>
                    <td>Body Type</td>
                    <td>{car.bodyType} miles</td>
                </tr>
                <tr>
                    <td>Interior Features</td>
                    <td>{car.interiorFeatures} miles</td>
                </tr>
                <tr>
                    <td>Safety Features</td>
                    <td>{car.safetyFeatures} miles</td>
                </tr>
                <tr>
                    <td>Fuel Economy</td>
                    <td>{car.fuelEconomy} miles</td>
                </tr>
                <tr>
                    <td>Location</td>
                    <td>{car.location} miles</td>
                </tr>
                {/* ... repeat for other car details ... */}
                <tr>
                    <td>VIN</td>
                    <td>{car.VIN}</td>
                </tr>
            </tbody>
        </table>
    </div>
);

// SellerDetails Component
const SellerDetails = ({ seller }) => (
    <div className="mt-4">
        <h3>Seller Information</h3>
        <ul className="list-unstyled">
            <li><strong>Name:</strong> {seller.name}</li>
            <li><strong>Contact:</strong> {seller.contact}</li>
            <li><strong>Email:</strong> {seller.email}</li>
        </ul>
    </div>
);

// CarPage Component
const CarPage = () => {
    // Mock data for demonstration
    const car = {
        brand: "Toyota",
        model: "Corolla",
        year: 2020,
        price: 20000,
        mileage: 15000,
        engineType: "Hybrid",
        transmission: "Automatic",
        color: "Red",
        condition: "Used",
        bodyType: "Sedan",
        interiorFeatures: "Leather seats, Bluetooth connectivity",
        safetyFeatures: "Airbags, ABS, Crash sensors",
        fuelEconomy: "30 MPG",
        location: "San Francisco, CA",
        photos: [
            "/path/to/photo1.jpg",
            "/path/to/photo2.jpg",
            // more photos
        ],
        profilePhoto: "/path/to/profilePhoto.jpg",
        VIN: "123456789ABCDEFGH"
    };

    const seller = {
        name: "John Doe",
        contact: "123-456-7890",
        email: "johndoe@example.com"
    };

    return (
        <div className="car-page-theme">
            <Header />
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <CarPhotoDisplay profilePhoto={car.profilePhoto} photos={car.photos} />
                </div>
                <div className="col-12 details-container">
                    <div className="car-details">
                        <CarDetails car={car} />
                    </div>
                    <div className="seller-details">
                        <SellerDetails seller={seller} />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default CarPage;
