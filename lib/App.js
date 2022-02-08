const figlet = require('figlet');
const inquirer = require('inquirer');
const db = require('./connection');
const path = require('path');
const fs = require('fs');
const displayTable = require('console.table');
const Employee = require('./Employee');

const roleList = ["Lead Engineer", "Accountant Manager", "Legal Team Lead", "Sales Lead", "Software Engineer", "Accountant", "Lawyer", "Salesperson"]

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
Error connecting to Database...Check your My SQL credentials\x1b[0m`);
      } else {
        console.log(`\x1b[32m
Database Connection Successful!
          \x1b[0m`);
        getData()
        checkData()
        init();
        main()
      } 
    });
  };

  const menuHandler = async (argument) => {
    if (argument === "Add Employee") {
      const newEmployee = await Employee.addEmployee()
      console.log("\x1b[32mNew Employee Added!\x1b[0m")
      main()
    }
    if (argument === "View All Employees") {
      const table = await Employee.viewEmployees()
      console.log(displayTable.getTable(table))
      main()
    }
    if (argument === "Update Employee Role") {
      const table = await Employee.updateEmployee()
      console.log(displayTable.getTable(table))
      main()
  }
    if (argument === "Quit") {
      close()
  }
  } 

  const main = async () => {
    const answers = await askQuestions();
    const { MENU } = answers;
    menuHandler(MENU)
};

module.exports = { run, main };