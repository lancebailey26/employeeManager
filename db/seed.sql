INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Legal"),("Finance");

INSERT INTO roles (title,  salary,   department_id)
VALUES  ("Sales Lead", 250000, 1),
        ("Lead Engineer", 250000, 2),
        ("Legal Team Lead",250000, 3),
        ("Lead Accountant", 250000, 4),
        ("Salesperson",  100000, 1),
        ("Software Engineer",  100000,  2),
        ("Lawyer",  100000, 3),
        ("Accountant",  100000, 4);

INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES  ("Luther", "Woods",  1, null),
        ("Lance", "Bailey", 2, null),
        ("Lee", "Kennedy",  3, null),
        ("Alvin", "Padilla", 4,null),
        ("Erik", "Drake", 5, 1),
        ("Thomas", "Mathis",6, 2),
        ("Dave", "Thomas",7, 3),
        ("Guy", "Riley",8, 4);