CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE Department(
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE Role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE Employee(
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER (30),
    manager_id INT
);