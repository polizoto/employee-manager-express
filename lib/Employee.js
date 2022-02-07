const inquirer = require('inquirer');
const displayTable = require('console.table');
const askQuestions = require('../index.js');
const App = require('./App');

const addEmployee = () => {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the employee\'s Name?',
        validate: nameInfo => {
          if (nameInfo) {
            return true;
            } else {
            console.log('Please enter the employee\'s name!');
            return false;
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  };

//   const viewEmployees = () => {
//     const questions = [
//       {
//         type: 'input',
//         name: 'name',
//         message: 'What is the employee\'s Name?',
//         validate: nameInfo => {
//           if (nameInfo) {
//             return true;
//             } else {
//             console.log('Please enter the employee\'s name!');
//             return false;
//           }
//         }
//       }
//     ];
//     return inquirer.prompt(questions);
//   };

  const viewEmployees = () => {
    const sql = `SELECT emp.id AS ID, emp.first_name AS First_Name, emp.last_name AS Last_Name, roles.role_name AS Title, departments.department_name AS Department, roles.salary AS Salary, concat(manager.first_name, ' ', manager.last_name) AS Manager FROM employees emp LEFT JOIN employees manager ON emp.manager_id = manager.id LEFT JOIN roles ON emp.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;`
    App.db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
        return displayTable(rows)
    });
  };

module.exports = { addEmployee };