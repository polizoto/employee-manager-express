const figlet = require('figlet');
const inquirer = require('inquirer');

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
        filter: function(val) {
          return val.split(".")[1];
        }
      }
    ];
    return inquirer.prompt(questions);
  };
  
  // ...
  
  const run = async () => {
    init();
    const answers = await askQuestions();
    const { MENU } = answers;
  };

  run();