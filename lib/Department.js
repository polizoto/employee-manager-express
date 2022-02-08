const inquirer = require('inquirer');
const db = require('./connection');

  const addDepartment = async () => {
    return new Promise( ( resolve, reject ) => {
    const sql = `SELECT emp.id AS ID, emp.first_name AS First_Name, emp.last_name AS Last_Name, roles.role_name AS Title, departments.department_name AS Department, roles.salary AS Salary, concat(manager.first_name, ' ', manager.last_name) AS Manager FROM employees emp LEFT JOIN employees manager ON emp.manager_id = manager.id LEFT JOIN roles ON emp.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;`
  return db.query(sql, (err, rows) => {
    if (err) {
      reject (err)
    }
      resolve (rows)
  });
});
}

const viewDepartments = async () => {
    return new Promise( ( resolve, reject ) => {
    const sql = `SELECT emp.id AS ID, emp.first_name AS First_Name, emp.last_name AS Last_Name, roles.role_name AS Title, departments.department_name AS Department, roles.salary AS Salary, concat(manager.first_name, ' ', manager.last_name) AS Manager FROM employees emp LEFT JOIN employees manager ON emp.manager_id = manager.id LEFT JOIN roles ON emp.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;`
  return db.query(sql, (err, rows) => {
    if (err) {
      reject (err)
    }
      resolve (rows)
  });
});
}

module.exports = { viewDepartments, addDepartment };