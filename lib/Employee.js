const inquirer = require('inquirer');
const askQuestions = require('../index.js');

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

  const viewEmployees = () => {
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

module.exports = addEmployee, viewEmployees;