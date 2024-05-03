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
    type VARCHAR(250) NOT NULL CHECK (type IN ('mini', 'sedan', 'suv')), 
);

CREATE TABLE booking(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id BIGINT NOT NULL,
    cab_id BIGINT NOT NULL,
    source VARCHAR(250) NOT NULL,
    destination VARCHAR(250) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'cancelled', 'completed')) default 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (cab_id) REFERENCES cabs(id)
);