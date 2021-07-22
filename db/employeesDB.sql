DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT not null,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee(
    id int AUTO_INCREMENT,
    first_name varchar(30) not null,
    last_name varchar(30) not null, 
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
);


SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;