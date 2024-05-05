CREATE DATABASE OLA;

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    UNIQUE(email)
);

SELECT * FROM users;

CREATE TABLE cabs(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(250) NOT NULL,
    fixedCharge INT NOT NULL,
    perKmCharge INT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE bookings(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id BIGINT NOT NULL,
    cab_id BIGINT NOT NULL,
    source VARCHAR(250) NOT NULL,
    destination VARCHAR(250) NOT NULL,
    distance INT NOT NULL,
    totalCharge INT NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'cancelled', 'completed')) default 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (cab_id) REFERENCES cabs(id)
);

insert into bookings(user_id, cab_id, source, destination, distance, totalCharge) values(12, 1, 'Delhi', 'Noida', 20, 500);
