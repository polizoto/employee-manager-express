const figlet = require('figlet');
const inquirer = require('inquirer');
const db = require('./connection');
const path = require('path');
const fs = require('fs');
const displayTable = require('console.table');
const Employee = require('./Employee');
const Role = require('./Role');
const Department = require('./Department');

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

const mainMenuQuestions = () => {
  const questions = [
    {
      type: "list",
      name: "MENU",
      message: "What would you like to do?",
      choices: ["View All Employees", "Add Employee", "Update Employee Role", "Delete Employee", "View Employees by Department", "View Employees by Manager", "Update Employee Manager", "View All Roles", "Add Role", "Delete Role", "View All Departments", "Add Department", "Delete Department", "View Department Budget", "Quit"],
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
      await Employee.addEmployee()
      console.log("\x1b[32mNew Employee Added!\x1b[0m")
      main()
    }
    if (argument === "View All Employees") {
      const employees = await Employee.viewEmployees()
      console.log(displayTable.getTable(employees))
      main()
    }
    if (argument === "Update Employee Role") {
      await Employee.updateEmployee()
      console.log("\x1b[32mEmployee Updated!\x1b[0m")
      main()
    }
    if (argument === "Delete Employee") {
      await Employee.deleteEmployee()
      console.log("\x1b[32mEmployee Deleted!\x1b[0m")
      main()
    }
    if (argument === "View Employees by Department") {
      const employees = await Department.viewEmployees()
      console.log(displayTable.getTable(employees))
      main()
    }
    if (argument === "View Employees by Manager") {
      const employees = await Employee.viewManager()
      console.log(displayTable.getTable(employees))
      main()
    }
    if (argument === "Update Employee Manager") {
      await Employee.updateManager()
      console.log("\x1b[32mManager Updated!\x1b[0m")
      main()
    }
    if (argument === "View All Roles") {
      const roles = await Role.viewRoles()
      console.log(displayTable.getTable(roles))
      main()
    }
    if (argument === "Add Role") {
      await Role.addRole()
      console.log("\x1b[32mNew Role Added!\x1b[0m")
      main()
    }
    if (argument === "Delete Role") {
      await Role.deleteRole()
      console.log("\x1b[32mRole Deleted!\x1b[0m")
      main()
    }
    if (argument === "View All Departments") {
      const departments = await Department.viewDepartments()
      console.log(displayTable.getTable(departments))
      main()
    }
    if (argument === "Add Department") {
      await Department.addDepartment()
      console.log("\x1b[32mNew Department Added!\x1b[0m")
      main()
    }
    if (argument === "Delete Department") {
      await Department.deleteDepartment()
      console.log("\x1b[32mDepartment Deleted!\x1b[0m")
      main()
    }
    if (argument === "View Department Budget") {
      const budget = await Department.viewBudget()
      console.log(displayTable.getTable(budget))
      main()
    }
    if (argument === "Quit") {
      close()
  }
  } 

  const main = async () => {
    const answers = await mainMenuQuestions();
    const { MENU } = answers;
    menuHandler(MENU)
};

module.exports = { run };