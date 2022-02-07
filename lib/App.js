const figlet = require('figlet');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');
const displayTable = require('console.table');
const Employee = require('./Employee');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root-password',
  multipleStatements: true,
});

const close = async () => {

  await db.end((err) => {
  if(err){
  console.log(`\x1b[31m
Error disconnecting from the Database...
    \x1b[0m`)
          } else {
         console.log(`\x1b[32m
Successfully Disconnected From Database!
              \x1b[0m`)        
}
})
}

const init = () => {
console.log(
figlet.textSync(`

Employee-

Manager-

Express

`, {
font: "Standard",
horizontalLayout: "fitted",
verticalLayout: "full",
width: 80,
whitespaceBreak: true
})
);
}

const getData = async (req, res) => {
    const checkDatabase = fs.readFileSync(path.join(__dirname, '../db/db.sql')).toString();
    const checkTables = fs.readFileSync(path.join(__dirname, '../db/schema.sql')).toString();
    db.query(checkDatabase,  (err, result) => {
        if (err){
             throw err;
        }
        });
    db.query(checkTables,  (err, result) => {
      if (err){
            throw err;
      }
      });  
}

const checkData = async () => {
  const checkTableData = fs.readFileSync(path.join(__dirname, '../db/check.sql')).toString();
  const addData = fs.readFileSync(path.join(__dirname, '../db/seeds.sql')).toString();

 db.query(checkTableData,  (err, result) => {
  if (err){
        throw err;
  } else if (!result.length) { 
    db.query(addData,  (err, result) => {
    if (err){
          throw err;
    } 
  })}
})
}
const askQuestions = () => {
  const questions = [
    {
      type: "list",
      name: "MENU",
      message: "What would you like to do?",
      choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role",  "View All Departments", "Add Department", "Quit"],
    }
  ];
  return inquirer.prompt(questions);
};

  const run = async () => {
    await db.connect((err) => {
      if(err){
        console.log(`\x1b[31m
Error connecting to Database...Check your My SQL credentials
\x1b[0m`);
      } else {
        console.log(`\x1b[32m
Database Connection Successful!
          \x1b[0m`);
        // Check Database and Seed (if empty)
        getData()
        checkData()
        // Display Title
        init();
        // Display Main Menu
        main()
      } 
    });
  };

  const main = async () => {
    const answers = await askQuestions();
    const { MENU } = answers;
    if (MENU === "Add Employee") {
      Employee.addEmployee()
    }
    if (MENU === "View All Employees") {
      const sql = `SELECT emp.id AS ID, emp.first_name AS First_Name, emp.last_name AS Last_Name, roles.role_name AS Title, departments.department_name AS Department, roles.salary AS Salary, concat(manager.first_name, ' ', manager.last_name) AS Manager FROM employees emp LEFT JOIN employees manager ON emp.manager_id = manager.id LEFT JOIN roles ON emp.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;`
      db.query(sql, (err, rows) => {
        if (err) {
          throw err;
        }
          console.table(rows)
          main()
      });
    }
    if (MENU === "Quit") {
      close()
  }
};

module.exports = run, main ;