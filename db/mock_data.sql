INSERT INTO Brand (Name) VALUES 
('Toyota'),
('Honda'),
('Ford'),
('Chevrolet'),
('Tesla');

INSERT INTO Model (BrandID, Name) VALUES 
(1, 'Camry'),
(1, 'Corolla'),
(2, 'Civic'),
(2, 'Accord'),
(3, 'F-150'),
(3, 'Mustang'),
(4, 'Silverado'),
(4, 'Malibu'),
(5, 'Model S'),
(5, 'Model X');


INSERT INTO EngineType (Type) VALUES 
('Gasoline'),
('Diesel'),
('Electric'),
('Hybrid'),
('Hydrogen Fuel Cell');


INSERT INTO Transmission (Type) VALUES 
('Automatic'),
('Manual'),
('CVT'),
('Dual-Clutch'),
('Electric Drive');


INSERT INTO BodyType (Type) VALUES 
('Sedan'),
('SUV'),
('Truck'),
('Coupe'),
('Convertible');


INSERT INTO UserSystem (Username, PasswordHash, Token, EmailAddress, FirstName, LastName, DateOfBirth, Gender, PhoneNumber, Address, RegistrationDate, LastLoginDate, ProfilePictureURL, UserRole, AccountStatus) VALUES 
('user1', 'passwordhash1', 'token1', 'user1@example.com', 'John', 'Doe', '1985-01-01', 'Male', '555-0101', '123 Main St, Anytown, USA', '2023-01-01 08:00:00', '2023-02-01 12:00:00', 'https://example.com/profiles/user1.jpg', 'User', 'Active'),
('user2', 'passwordhash2', 'token2', 'user2@example.com', 'Jane', 'Smith', '1990-02-02', 'Female', '555-0202', '456 Elm St, Othertown, USA', '2023-02-15 09:00:00', '2023-02-20 11:00:00', 'https://example.com/profiles/user2.jpg', 'Admin', 'Active');


INSERT INTO Car (BrandID, ModelID, Year, Price, Mileage, EngineTypeID, TransmissionID, Color, Condition, BodyTypeID, InteriorFeatures, SafetyFeatures, FuelEconomy, Location, Photos, ProfilePhoto, VIN) VALUES 
(1, 1, 2020, 25000.00, 15000, 1, 1, 'Red', 'Used', 1, 'Leather seats, Climate control', 'Airbags, ABS, Traction control', 30, 'Anytown, USA', 'https://example.com/cars/car1/photos', 'https://example.com/cars/car1.jpg', 'VIN1HERE123456789'),
(2, 2, 2021, 22000.00, 10000, 3, 4, 'Blue', 'New', 2, 'Fabric seats, Navigation system', 'Airbags, Collision warning system', 35, 'Othertown, USA', 'https://example.com/cars/car2/photos', 'https://example.com/cars/car2.jpg', 'VIN2HERE987654321');


INSERT INTO Message (SenderID, ReceiverID, MessageBody) VALUES 
(1, 2, 'Is the car still available?'),
(2, 1, 'Yes, it is. Would you like to schedule a test drive?');


INSERT INTO Advertisement (UserID, CarID, PostDate, ExpiryDate, AdStatus) VALUES 
(1, 1, '2023-01-10 09:00:00', '2023-04-10 09:00:00', 'Active'),
(2, 2, '2023-02-15 10:00:00', '2023-05-15 10:00:00', 'Active');
