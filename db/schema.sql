CREATE TABLE IF NOT EXISTS departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL,
  salary INTEGER NOT NULL,
  department_id INTEGER NOT NULL,
  CONSTRAINT fk_departments FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(id),
  CONSTRAINT manager_reference FOREIGN KEY (manager_id) REFERENCES `employees` (id) ON DELETE SET NULL
);


