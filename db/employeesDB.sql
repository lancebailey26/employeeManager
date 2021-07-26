DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name varchar(30) NOT NULL DEFAULT '',
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title varchar(30) NOT NULL DEFAULT '',
    department_id INT not null DEFAULT 1,
    salary INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee(
    id int AUTO_INCREMENT,
    first_name varchar(30) not null DEFAULT '',
    last_name varchar(30) not null DEFAULT '', 
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
    REFERENCES roles(id),
    FOREIGN KEY (manager_id)
    REFERENCES roles(id)
);


SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;