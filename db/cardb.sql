-- Create Brand table
CREATE TABLE Brand (
    BrandID SERIAL PRIMARY KEY,
    Name VARCHAR NOT NULL
);

-- Create Model table
CREATE TABLE Model (
    ModelID SERIAL PRIMARY KEY,
    BrandID INTEGER REFERENCES Brand(BrandID),
    Name VARCHAR NOT NULL
);


-- Create Engine Type table
CREATE TABLE EngineType (
    EngineTypeID SERIAL PRIMARY KEY,
    Type VARCHAR NOT NULL
);

-- Create Transmission table
CREATE TABLE Transmission (
    TransmissionID SERIAL PRIMARY KEY,
    Type VARCHAR NOT NULL
);

-- Create Body Type table
CREATE TABLE BodyType (
    BodyTypeID SERIAL PRIMARY KEY,
    Type VARCHAR NOT NULL
);

-- Create User System table
CREATE TABLE UserSystem (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR UNIQUE NOT NULL,
    PasswordHash VARCHAR NOT NULL,
    Token VARCHAR,
    EmailAddress VARCHAR UNIQUE NOT NULL,
    FirstName VARCHAR,
    LastName VARCHAR,
    DateOfBirth DATE,
    Gender VARCHAR,
    PhoneNumber VARCHAR,
    Address TEXT,
    RegistrationDate TIMESTAMP,
    LastLoginDate TIMESTAMP,
    ProfilePictureURL VARCHAR,
    UserRole VARCHAR,
    AccountStatus VARCHAR
);

-- Create Car table
CREATE TABLE Car (
    CarID SERIAL PRIMARY KEY,
    BrandID INTEGER REFERENCES Brand(BrandID),
    ModelID INTEGER REFERENCES Model(ModelID),
    Year INTEGER,
    Price NUMERIC,
    Mileage NUMERIC,
    EngineTypeID INTEGER REFERENCES EngineType(EngineTypeID),
    TransmissionID INTEGER REFERENCES Transmission(TransmissionID),
    Color VARCHAR,
    Condition VARCHAR,
    BodyTypeID INTEGER REFERENCES BodyType(BodyTypeID),
    InteriorFeatures TEXT,
    SafetyFeatures TEXT,
    FuelEconomy NUMERIC,
    Location VARCHAR,
    Photos TEXT, -- Consider using a file storage system and store the link here
    ProfilePhoto TEXT, -- Consider using a file storage system and store the link here
    VIN VARCHAR UNIQUE NOT NULL
);

-- Create Message table
CREATE TABLE Message (
    MessageID SERIAL PRIMARY KEY,
    SenderID INTEGER REFERENCES UserSystem(UserID),
    ReceiverID INTEGER REFERENCES UserSystem(UserID),
    MessageBody TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Advertisement Management table
CREATE TABLE Advertisement (
    AdID SERIAL PRIMARY KEY,
    UserID INTEGER REFERENCES UserSystem(UserID),
    CarID INTEGER REFERENCES Car(CarID),
    PostDate TIMESTAMP,
    ExpiryDate TIMESTAMP,
    AdStatus VARCHAR
);
