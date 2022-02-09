const inquirer = require('inquirer');
const db = require('./connection');

const addEmployee = async () => {

    const Roles = await new Promise( ( resolve, reject ) => {
    const sql = `SELECT roles.role_name FROM roles;`
    return db.query(sql, (err, rows) => {
    if (err) {
        reject (err)
    } else if (rows) {
        const rolesArray = rows.map(v => v.role_name)
        const questions = [
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee\'s first name?',
            validate: nameInfo => {
            if (nameInfo) {
                return true;
                } else {
                console.log('Please enter the employee\'s first name!');
                return false;
            }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee\'s last name?',
            validate: nameInfo => {
            if (nameInfo) {
                return true;
                } else {
                console.log('Please enter the employee\'s last name!');
                return false;
            }
            }
        },
        {
            type: "list",
            name: "role_name",
            message: "What is the employee's role?",
            choices: rolesArray,
        }
        ];
        resolve (inquirer.prompt(questions));
    }
    });
    });

    const Manager = await new Promise( ( resolve, reject ) => {
    const sql = `SELECT concat(employees.first_name, ' ', employees.last_name) AS Manager FROM employees;`
    return db.query(sql, (err, rows) => {
    if (err) {
        reject (err)
    } 
    else if (rows) {

        const managerArray = rows.map(v => v.Manager)
        managerArray.push('NULL')
        const questions = [
        {
            type: "list",
            name: "manager_name",
            message: "Who is the employee's manager (use NULL if none)?",
            choices: managerArray,
        }
        ];
        resolve (inquirer.prompt(questions));
    }
    });
    });

    const { first_name, last_name, role_name } = Roles;

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

    const roleID = +getroleID.join("");

    const { manager_name } = Manager;
    const managerArray = manager_name.trim().split(/\s+/)
    const manager_firstName = managerArray[0]
    const manager_lastName = managerArray[1]

    const getmanagerID = await new Promise( ( resolve, reject ) => {
    const sql = `SELECT employees.id FROM employees WHERE first_name = ? AND last_name = ?`
    const params = [manager_firstName, manager_lastName];
    return db.query(sql, params, (err, rows) => {
        if (err) {
        reject (err)
        } else if (rows) {
        const managerID = rows.map(v => v.id)
        resolve (managerID)
        }
    });
    });

    let managerID = +getmanagerID.join("");

    if (managerID === 0) {
        managerID = NULL
    }

    const insertEmployeeInfo = await new Promise( ( resolve, reject ) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
    const params = [first_name, last_name, roleID, managerID];
    return db.query(sql, params, (err, result) => {
        if (err) {
        reject (err)
        } else if (result) {
        resolve (result)
        }
    });
    });
}

  const viewEmployees = async () => {
    return new Promise( ( resolve, reject ) => {
    const sql = `SELECT emp.id AS ID, emp.first_name AS First_Name, emp.last_name AS Last_Name, roles.role_name AS Title, departments.department_name AS Department, roles.salary AS Salary, concat(manager.first_name, ' ', manager.last_name) AS Manager FROM employees emp LEFT JOIN employees manager ON emp.manager_id = manager.id LEFT JOIN roles ON emp.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;`
  return db.query(sql, (err, rows) => {
    if (err) {
      reject (err)
    }
      resolve (rows)
  });
});
}

const updateEmployee = async () => {
    const Employee = await new Promise( ( resolve, reject ) => {
        const sql = `SELECT concat(employees.first_name, ' ', employees.last_name) AS Employee FROM employees;`
        return db.query(sql, (err, rows) => {
        if (err) {
            reject (err)
        } 
        else if (rows) {
    
            const employeeArray = rows.map(v => v.Employee)
            const questions = [
            {
                type: "list",
                name: "employee_name",
                message: "Who is the employee whose role you would like to update?",
                choices: employeeArray,
            }
            ];
            resolve (inquirer.prompt(questions));
        }
        });
        });

    const { employee_name } = Employee;
    const employeeArray = employee_name.trim().split(/\s+/)
    const employee_firstName = employeeArray[0]
    const employee_lastName = employeeArray[1]

    const getemployeeID = await new Promise( ( resolve, reject ) => {
        const sql = `SELECT employees.id FROM employees WHERE first_name = ? AND last_name = ?`
        const params = [employee_firstName, employee_lastName];
        return db.query(sql, params, (err, rows) => {
            if (err) {
            reject (err)
            } else if (rows) {
            const employeeID = rows.map(v => v.id)
            resolve (employeeID)
            }
        });
        });
    
        let employeeID = +getemployeeID.join("");
    
    const Roles = await new Promise( ( resolve, reject ) => {
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
                message: "What is the employee's mew role?",
                choices: rolesArray,
            }
            ];
            resolve (inquirer.prompt(questions));
        }
        });
        });

        const { role_name } = Roles;

        const getRoleID = await new Promise( ( resolve, reject ) => {
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
        
        const role_id = getRoleID

        await new Promise( ( resolve, reject ) => {
            const sql = `UPDATE employees SET role_id = ? WHERE id = ?`
            const params = [role_id, employeeID ];
            return db.query(sql, params, (err, result) => {
                if (err) {
                reject (err)
                } else if (result) {
                resolve (result)
                }
            });
            });
    
}

const updateManager = async () => {
    const getEmployee = await new Promise( ( resolve, reject ) => {
        const sql = `SELECT concat(employees.first_name, ' ', employees.last_name) AS Employee FROM employees;`
        return db.query(sql, (err, rows) => {
        if (err) {
            reject (err)
        } 
        else if (rows) {
    
            const employeeArray = rows.map(v => v.Employee)
            const questions = [
            {
                type: "list",
                name: "employee_name",
                message: "Which employee would like to update?",
                choices: employeeArray,
            }
            ];
            resolve (inquirer.prompt(questions));
        }
        });
        });
    
    const { employee_name } = getEmployee;
    const employeeArray = employee_name.trim().split(/\s+/)
    const employee_firstName = employeeArray [0]
    const employee_lastName = employeeArray [1]

    const getemployeeID = await new Promise( ( resolve, reject ) => {
        const sql = `SELECT employees.id FROM employees WHERE first_name = ? AND last_name = ?`
        const params = [employee_firstName, employee_lastName];
        return db.query(sql, params, (err, rows) => {
            if (err) {
            reject (err)
            } else if (rows) {
            const employeeID = rows.map(v => v.id)
            resolve (employeeID)
            }
        });
        });

        let employeeID = +getemployeeID.join("");
    
        const getManager = await new Promise( ( resolve, reject ) => {
            const sql = `SELECT concat(employees.first_name, ' ', employees.last_name) AS Manager FROM employees WHERE id NOT IN (?);`
            const params = [employeeID];
            return db.query(sql, params, (err, rows) => {
            if (err) {
                reject (err)
            } 
            else if (rows) {
        
                const managerArray = rows.map(v => v.Manager)
                managerArray.push('NULL')
                const questions = [
                {
                    type: "list",
                    name: "manager_name",
                    message: "Who is the employee's new manager (enter Null if none)?",
                    choices: managerArray,
                }
                ];
                resolve (inquirer.prompt(questions));
            }
            });
            });
        
        const { manager_name } = getManager;
        const managerArray = manager_name.trim().split(/\s+/)
        const manager_firstName = managerArray[0]
        const manager_lastName = managerArray[1]
        
        
        if (manager_name === 'NULL') {

            await new Promise( ( resolve, reject ) => {
                const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`
                const params = [null, employeeID ];
                return db.query(sql, params, (err, result) => {
                    if (err) {
                    reject (err)
                    } else if (result) {
                    resolve (result)
                    }
                });
                });
        }  else {
            const getmanagerID = await new Promise( ( resolve, reject ) => {
                const sql = `SELECT employees.id FROM employees WHERE first_name = ? AND last_name = ?`
                const params = [manager_firstName, manager_lastName];
                return db.query(sql, params, (err, rows) => {
                    if (err) {
                    reject (err)
                    } else if (rows) {
                    const managerID = rows.map(v => v.id)
                    resolve (managerID)
                    }
                });
                });
                const managerID = +getmanagerID.join("");

            await new Promise( ( resolve, reject ) => {
            const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`
            const params = [managerID, employeeID ];
            return db.query(sql, params, (err, result) => {
                if (err) {
                reject (err)
                } else if (result) {
                resolve (result)
                }
            });
            });
        }
}

const viewManager = async () => {
    const getManager = await new Promise( ( resolve, reject ) => {
        const sql = `SELECT concat(employees.first_name, ' ', employees.last_name) AS Manager FROM employees;`
        return db.query(sql, (err, rows) => {
        if (err) {
            reject (err)
        } 
        else if (rows) {
    
            const managerArray = rows.map(v => v.Manager)
            managerArray.push('NULL')
            const questions = [
            {
                type: "list",
                name: "manager_name",
                message: "Which manager would you like to view?",
                choices: managerArray,
            }
            ];
            resolve (inquirer.prompt(questions));
        }
        });
        });
    
    const { manager_name } = getManager;
    const managerArray = manager_name.trim().split(/\s+/)
    const manager_firstName = managerArray[0]
    const manager_lastName = managerArray[1]

    const getmanagerID = await new Promise( ( resolve, reject ) => {
    const sql = `SELECT employees.id FROM employees WHERE first_name = ? AND last_name = ?`
    const params = [manager_firstName, manager_lastName];
    return db.query(sql, params, (err, rows) => {
        if (err) {
        reject (err)
        } else if (rows) {
        const managerID = rows.map(v => v.id)
        resolve (managerID)
        }
    });
    });

    let managerID = +getmanagerID.join("");

    const checkmanagerID = await new Promise( ( resolve, reject ) => {
        const sql =  `SELECT employees.manager_id FROM employees WHERE employees.manager_id = ?`
        const params = [managerID];
        return db.query(sql, params, (err, rows) => {
            if (err) {
            reject (err)
            } else if (rows) {
            resolve (rows)
            }
        });
        });

    if (!checkmanagerID.length) {
        return `
${manager_name} is not a manager!
        `
    } else {

    return new Promise( ( resolve, reject ) => {
        const sql = `SELECT employees.id AS ID, concat(employees.first_name, ' ', employees.last_name) AS Employee, roles.role_name AS Role FROM employees LEFT JOIN roles ON employees.role_id = roles.id WHERE manager_id = ?`
        const params = [managerID];
      return db.query(sql, params, (err, rows) => {
        if (err) {
          reject (err)
        }
         console.log('\n')
          resolve (rows)
      });
    });
}
}

const deleteEmployee = async () => {
    const getEmployees = await new Promise( ( resolve, reject ) => {
        const sql = `SELECT concat(employees.first_name, ' ', employees.last_name) AS Employee FROM employees;`
        return db.query(sql, (err, rows) => {
        if (err) {
            reject (err)
        } else if (rows) {
            const employeeArray = rows.map(v => v.Employee)
            const questions = [
            {
                type: "list",
                name: "employee_name",
                message: "Which employee would you like to delete?",
                choices: employeeArray,
            }
            ];
            resolve (inquirer.prompt(questions));
        }
        });
        });
    
        const { employee_name } = getEmployees;
        const employeeArray = employee_name.trim().split(/\s+/)
        const employee_firstName = employeeArray[0]
        const employee_lastName = employeeArray[1]
    
        const getemployeeID = await new Promise( ( resolve, reject ) => {
            const sql = `SELECT employees.id FROM employees WHERE first_name = ? AND last_name = ?`
            const params = [employee_firstName, employee_lastName];
            return db.query(sql, params, (err, rows) => {
                if (err) {
                reject (err)
                } else if (rows) {
                const employeeID = rows.map(v => v.id)
                resolve (employeeID)
                }
            });
            });
        
            let employeeID = +getemployeeID.join("");
    
        await new Promise( ( resolve, reject ) => {
          const sql =  `DELETE FROM employees WHERE id = ?`
          const params = [employeeID];
        return db.query(sql, params, (err, rows) => {
            if (err) {
            reject (err)
            }
            resolve (rows)
            });
        });
}

module.exports = { addEmployee, viewEmployees, updateEmployee, updateManager, viewManager,deleteEmployee }