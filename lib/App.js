const figlet = require('figlet');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const addEmployee = require('./Employee');
const viewEmployees = require('./Employee');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root-password',
});

db.end((err) => {
  // The connection is terminated gracefully
  // Ensures all remaining queries are executed
  // Then sends a quit packet to the MySQL server.
});

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
        init();
        main()
      }
    });
  };

  const main = async () => {
    const answers = await askQuestions();
    const { MENU } = answers;
    if (MENU === "Add Employee") {
      addEmployee()
    }
    if (MENU === "View All Employees") {
      viewEmployees()
    }
  };

module.exports = run, main;