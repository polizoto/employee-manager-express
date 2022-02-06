INSERT INTO departments (department_name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO roles (role_name, salary, department_id)
VALUES
('Lead Engineer', 150000, 1),
('Accountant Manager', 160000, 2),
('Legal Team Lead', 250000, 3),
('Sales Lead', 100000, 4),
('Software Engineer', 120000, 1),
('Accountant', 125000, 2),
('Lawyer', 190000, 3),
('Salesperson', 80000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Jason', 'Jones', 1, NULL),
('Margaret', 'Kempis', 2, NULL),
('Candace', 'Peterson', 3, NULL),
('Kara', 'Rogers', 4, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Darrin', 'Smith', 5, 1),
('Natosha', 'Williams', 6, 2),
('Justin', 'Brimfield', 7, 3),
('Robert', 'Lovin', 8, 4);