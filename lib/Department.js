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

const deleteDepartment = async () => {
  const getDepartments = await new Promise( ( resolve, reject ) => {
    const sql = `SELECT departments.department_name FROM departments;`
    return db.query(sql, (err, rows) => {
    if (err) {
        reject (err)
    } else if (rows) {
        const departmentsArray = rows.map(v => v.department_name)
        const questions = [
        {
            type: "list",
            name: "department_name",
            message: "What department would you like to delete?",
            choices: departmentsArray,
        }
        ];
        resolve (inquirer.prompt(questions));
    }
    });
    });

    const { department_name } = getDepartments;

    const getDepartmentID = await new Promise( ( resolve, reject ) => {
      const sql = `SELECT departments.id FROM departments WHERE department_name = ?`
      const params = [department_name];
      return db.query(sql, params, (err, rows) => {
          if (err) {
          reject (err)
          } else if (rows) {
          const departmentID = rows.map(v => v.id)
          resolve (departmentID)
          }
      });
      });

     const department_id = +getDepartmentID.join("");

    await new Promise( ( resolve, reject ) => {
      const sql =  `DELETE FROM departments WHERE id = ?`
      const params = [department_id];
    return db.query(sql, params, (err, rows) => {
        if (err) {
        reject (err)
        }
        resolve (rows)
        });
    });
}

const viewBudget = async () => {
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

const viewEmployees = async () => {
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

module.exports = { viewDepartments, addDepartment, viewBudget, deleteDepartment, viewEmployees };