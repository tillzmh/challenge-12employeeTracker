CREATE DATABASE employee_employees;

CREATE TABLE department(
    id INT,
    name VARCHAR(30)
)

CREATE TABLE roll(
    id INT,
    title VARCHAR(30),
    salary DECIMAL(10),
    department_id INT
)

CREATE TABLE employee(
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
)