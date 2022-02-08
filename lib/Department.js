const inquirer = require('inquirer');
const db = require('./connection');

  const addDepartment = async () => {
    const newDepartment = await new Promise( ( resolve, reject ) => {
            const questions = [
            {
                type: 'input',
                name: 'new_department_name',
                message: 'What is the name of the new department?',
                validate: nameInfo => {
                if (nameInfo) {
                    return true;
                    } else {
                    console.log('Please enter the department\'s name!');
                    return false;
                }
                }
            }
            ];
            resolve (inquirer.prompt(questions));
        })

        const { new_department_name } = newDepartment;

        await new Promise( ( resolve, reject ) => {
            const sql = `INSERT INTO departments (department_name) VALUES (?)`
            const params = [new_department_name];
            return db.query(sql, params, (err, result) => {
                if (err) {
                reject (err)
                } else if (result) {
                resolve (result)
                }
            });
            });
        }


const viewDepartments = async () => {
    return new Promise( ( resolve, reject ) => {
        const sql = `SELECT departments.id AS ID, departments.department_name AS Department FROM departments;`
  return db.query(sql, (err, rows) => {
    if (err) {
      reject (err)
    }
      resolve (rows)
  });
});
}

module.exports = { viewDepartments, addDepartment };