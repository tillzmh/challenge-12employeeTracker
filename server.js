const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Employee_Tracker',
});

connection.connect();
function mainMenu() {
    inquirer.Prompt(
        {
            type: 'list',
            message:'Please select you object',
            name: 'option',
            choices:[
                'View all department',
                'View all employees',
                'View all roles',
                'add department',
                'add employees',
                'add roles',
                'delete department',
                'delete employees',
                'delete roles',
                'update department',
                'update employee manager',
                'exit'
            ]
        }). then(answer => {
            switch (answer.option) {

                case "view all department":
                    viewAllDepartments();
                    break;
                    
                case "view all employees":
                    viewAllEmployees();
                    break;

                case "view all roles":
                    viewAllRoles();
                    break;

                case "add department":
                    addDepartment();
                    break;

                case "add employees":
                    addEmployees();
                    break;

                case "add roles":
                    addRoles();
                    break;

                case "update department":
                    updateDepartment();
                    break;

                case "updateEmployeeManager":
                    updateEmployeeManager();
                    break;

                case "Exit":
                    connection.end()
                    break;
            }
        })
        
}

function viewAllDepartments() {
    connection.query(
        'SELECT * Department', (err,res) => {
            if (err){
            throw err;
        }
        console.log('view all departments')
        mainMenu();
        }
    )
}

// function viewAllEmployees() {
//     const sql = // TODO: ??
//     connection.query(
//         sql,
//         (err, res) => {
//             if (err) {
//                 throw err;
//             }
//             mainMenu();
//         }
//     )
// }

function viewAllRoles(){
    connection.query(
        'select ro.title as Role_title ro.salary as Salary, dept.name as DepartmentName from Role ro left join department as dept.id = ro.department_id', (err, res) => {
            if (err) {
                throw err;
            }
            mainMenu();
            }
    )
}

function addDepartmemt(){
    inquirer.Prompt([
        {
            type: "input",
            name: "department",
            message: "Add department name",
        }
    ]).then(answer =>{
        console.log(Answers)
        connection.query('INSERT INTO department SET?', {name: answer.department}, (err, res) => {
            if (err) throw err;
                mainMenu();
            });
    });
};
//finished review role id 
async function addEmployees() {
    const managers = await selectManager();
    inquirer.Prompt([{
        name: 'firstname',
        type: 'input',
        message: 'Enter first name',
    },
    {
        name: 'lastname',
        type: 'input',
        message: 'Enter last name',
    },
    {
        name:'role',
        type:'list',
        message: 'select role',
        choices: await selectRole()
    },
    {
        name:'manager',
        type:'list',
        message:'Manager name',
        choices: managers
    }
]).then(function(res) {
    let roleId = res.role
    let ManagerID = res.manager

    console.log({managerID})

    connection.query("INSERT INTO Employee SET?",
        {
            firstname: res.firstname,
            lastname: res.lastname,
            managerID: res.manager,
            roleId: res.roleId, // review role ID
        }, function (err) {
            if (err) throw err
            console.table(res)
            mainMenu();
        })
    })
}

function addRoles() {
    connection.promise().query("SELECT * FROM Department")
        .then((res) => {
            return res[0].map(dept => {
                return {
                    name: dept.name,
                    value: dept.id
                }
            })
        })
        .then((departments) => {

            return inquirer.prompt([

                {
                    type: 'input',
                    name: 'roles',
                    message: 'Please add a role:'
                },

                {
                    type: 'input',
                    name: 'salary',
                    message: 'Please enter a salary:'
                },

                {
                    type: 'list',
                    name: 'depts',
                    choices: departments,
                    message: 'Please select your department.'
                }
            ])
        })

        .then(answer => {
            console.log(answer);
            return connection.promise().query('INSERT INTO role SET ?', { title: answer.roles, salary: answer.salary, department_id: answer.depts });
        })
        .then(res => {
            console.log('Added new role')
            mainMenu();

        })
        .catch(err => {
            throw err
        });
}

function selectRole() {
    return connection.promise().query("SELECT * FROM role")
        .then(res => {
            return res[0].map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
        })
}


function selectManager() {
    return connection.promise().query("SELECT * FROM employee ")
        .then(res => {
            return res[0].map(manager => {
                return {
                    name: `${manager.firstname} ${manager.lastname}`,
                    value: manager.id,
                }
            })
        })

}

function deleteDepartment() {
    connection.promise().query('SELECT * FROM Department')
        .then((res) => {
            return res[0].map(dept => {
                return {
                    name: dept.name,
                    value: dept.id
                }
            })
        })
        .then((departments) => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'deptId',
                    choices: departments,
                    message: 'Please select the department you want to delete.'
                }
            ])
        })
        .then(answer => {
            console.log(answer);
            return connection.promise().query('DELETE FROM Department WHERE id = ?', answer.deptId);

        })
        .then(res => {
            console.log('Department Deleted Successfully')
            mainMenu();
        })

        .catch(err => {
            throw err
        });

}

function deleteEmployee() {
    connection.promise().query('SELECT * FROM employee')
        .then((res) => {
            return res[0].map(emp => {
                return {
                    name: emp.firstname,
                    value: emp.id
                }
            })
        })
        .then((employees) => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    choices: employees,
                    message: 'Please select the employee you want to delete.'
                }
            ])
        })
        .then(answer => {
            console.log(answer);
            return connection.promise().query('DELETE FROM Employee WHERE id = ?', answer.employeeId);

        })
        .then(res => {
            console.log('Employee Deleted Successfully')
            mainMenu();
        })

        .catch(err => {
            throw err
        });

}
