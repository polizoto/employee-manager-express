const inquirer = require('inquirer');
const db = require('./connection');

  const addRole = async () => {
    const newRole = await new Promise( ( resolve, reject ) => {
        const sql = `SELECT departments.department_name FROM departments;`
        return db.query(sql, (err, rows) => {
        if (err) {
            reject (err)
        } else if (rows) {
            const departmentsArray = rows.map(v => v.department_name)
            const questions = [
            {
                type: 'input',
                name: 'new_role_name',
                message: 'What is the name of the new role?',
                validate: nameInfo => {
                if (nameInfo) {
                    return true;
                    } else {
                    console.log('Please enter the name of the new role!');
                    return false;
                }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the new role\'s salary',
                validate: nameInfo => {
                if (nameInfo) {
                    return true;
                    } else {
                    console.log('Please enter the salary for the new role!');
                    return false;
                }
                }
            },
            {
                type: "list",
                name: "department_name",
                message: "What is the department for the new role?",
                choices: departmentsArray,
            }
            ];
            resolve (inquirer.prompt(questions));
        }
        });
        });

    const { new_role_name, salary, department_name } = newRole;

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

       const department_id = getDepartmentID

    await new Promise( ( resolve, reject ) => {
        const sql = `INSERT INTO roles (role_name, salary, department_id) VALUES (?, ?, ?)`
        const params = [new_role_name, salary, department_id ];
        return db.query(sql, params, (err, result) => {
            if (err) {
            reject (err)
            } else if (result) {
            resolve (result)
            }
        });
        });
}

const viewRoles = async () => {
    return new Promise( ( resolve, reject ) => {
    const sql = `SELECT roles.id AS ID, roles.role_name AS Role, roles.salary AS Salary, departments.department_name AS Department FROM roles LEFT JOIN departments ON roles.department_id = departments.id;`
  return db.query(sql, (err, rows) => {
    if (err) {
      reject (err)
    }
      resolve (rows)
  });
});
}

const deleteRole = async () => {
    const getRoles = await new Promise( ( resolve, reject ) => {
        const sql = `SELECT roles.role_name FROM roles;`
        return db.query(sql, (err, rows) => {
        if (err) {
            reject (err)
        } else if (rows) {
            const rolesArray = rows.map(v => v.role_name)
            const questions = [
            {
                type: "list",
                name: "role_name",
                message: "What role would you like to delete?",
                choices: rolesArray ,
            }
            ];
            resolve (inquirer.prompt(questions));
        }
        });
        });
    
        const { role_name } = getRoles;
    
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
    
         const role_id = +getroleID.join("");
    
        await new Promise( ( resolve, reject ) => {
          const sql =  `DELETE FROM roles WHERE id = ?`
          const params = [role_id];
        return db.query(sql, params, (err, rows) => {
            if (err) {
            reject (err)
            }
            resolve (rows)
            });
        });
}

module.exports = { viewRoles, addRole, deleteRole };