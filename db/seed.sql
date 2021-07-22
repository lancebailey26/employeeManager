INSERT INTO department (id, name)
VALUES (1, "Sales"), (2, "Engineering"), (3, "Legal"), (4, "Finance");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Lead Engineer", 200000, 2),
        ("Legal Team Lead", 250000, 3),
        ("Lead Accountant", 100000, 4),
        ("Salesperson", 50000, 1),
        ("Software Engineer", 75000, 2),
        ("Lawyer", 100000, 3),
        ("Accountant", 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Lance", "Bailey", 2, null),
        ("Luther", "Woods", 3, null),
        ("Lee", "Kennedy", 1, null),
        ("Alvin", "Padilla", 4, null),
        ("Erik", "Drake", 5, 1),
        ("Thomas", "Mathis", 6, 2),
        ("Dave", "Thomas", 7, 3),
        ("Guy", "Riley", 8, 4);