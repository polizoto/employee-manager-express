const inquirer = require('inquirer');
const displayTable = require('console.table');
const askQuestions = require('../index.js');
const App = require('./App');
const db = require('./connection');
const { CLOSING } = require('ws');

const addEmployee = async () => {
// const getRoles = async () => {
  const Roles = await new Promise( ( resolve, reject ) => {
  const sql = `SELECT roles.role_name FROM roles;`
  return db.query(sql, (err, rows) => {
  if (err) {
    reject (err)
  } else if (rows) {
    const rolesArray = rows.map(v => v.role_name)
    const questions = [
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the employee\'s first name?',
        validate: nameInfo => {
          if (nameInfo) {
            return true;
            } else {
            console.log('Please enter the employee\'s first name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the employee\'s last name?',
        validate: nameInfo => {
          if (nameInfo) {
            return true;
            } else {
            console.log('Please enter the employee\'s last name!');
            return false;
          }
        }
      },
      {
        type: "list",
        name: "role_name",
        message: "What is the employee's role?",
        choices: rolesArray,
      }
    ];
    resolve (inquirer.prompt(questions));
  }
});
});

    const Manager = await new Promise( ( resolve, reject ) => {
    const sql = `SELECT concat(employees.first_name, ' ', employees.last_name) AS Manager FROM employees;`
    return db.query(sql, (err, rows) => {
    if (err) {
        reject (err)
    } 
    else if (rows) {

        const managerArray = rows.map(v => v.Manager)
        managerArray.push('NULL')
        const questions = [
        {
            type: "list",
            name: "manager_name",
            message: "Who is the employee's manager (use NULL if none)?",
            choices: managerArray,
        }
        ];
        resolve (inquirer.prompt(questions));
    }
    });
    });

    const { first_name, last_name, role_name } = Roles;

    const getroleID = await new Promise( ( resolve, reject ) => {
    const sql = `SELECT roles.id FROM roles WHERE role_name = ?`
    const params = [role_name];
    return db.query(sql, params, (err, rows) => {
        if (err) {
        reject (err)
        } else if (rows) {
        const roleID = rows.map(v => v.id)
        resolve (roleID)
        }
    });
    });

    const roleID = +getroleID.join("");

    const { manager_name } = Manager;
    const managerArray = manager_name.trim().split(/\s+/)
    const manager_firstName = managerArray[0]
    const manager_lastName = managerArray[1]

    const getmanagerID = await new Promise( ( resolve, reject ) => {
    const sql = `SELECT employees.id FROM employees WHERE first_name = ? AND last_name = ?`
    const params = [manager_firstName, manager_lastName];
    return db.query(sql, params, (err, rows) => {
        if (err) {
        reject (err)
        } else if (rows) {
        const managerID = rows.map(v => v.id)
        resolve (managerID)
        }
    });
    });

    let managerID = +getmanagerID.join("");

    if (managerID === 0) {
        managerID = NULL
    }

    const insertEmployeeInfo = await new Promise( ( resolve, reject ) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
    const params = [first_name, last_name, roleID, managerID];
    return db.query(sql, params, (err, result) => {
        if (err) {
        reject (err)
        } else if (result) {
        resolve (result)
        }
    });
    });
}

  const viewEmployees = async () => {
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

module.exports = { addEmployee, viewEmployees };