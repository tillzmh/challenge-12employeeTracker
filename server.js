const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_tracker',
});

connection.connect();
function mainMenu() {
    inquirer.prompt(
        {
            type: 'list',
            message:'Please select you object',
            name: 'option',
            choices:[
                'view all department',
                'view all employees',
                'view all roles',
                'add department',
                'add employees',
                'add roles',
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


                case "updateEmployeeManager":
                    updateEmployeeManager();
                    break;

                case "exit":
                    connection.end()
                    break;
            }
        })
        
}

function viewAllDepartments() {
    connection.query(
        'SELECT * FROM Department', (err,res) => {
            if (err){
            throw err;
        }
        console.table(res)
        mainMenu();
        }
    )
}

function viewAllEmployees() {
    const sql = 'Select emp.id as EmployeeID, concat(emp.first_name,"  ",emp.last_name ) as EmployeeName , ro.title as Job_tittle, ro.salary as Salary,dept.name as Department_Name,concat(emp2.first_name,"  ",emp2.last_name) as ManagerName from employee_tracker.employee as emp left join employee_tracker.employee as emp2 on emp2.id=emp.manager_id left join employee_tracker.Role as ro on emp.role_id=ro.id left join employee_tracker.department as dept on dept.id = ro.department_id';
    connection.query(
        sql,
        (err, res) => {
            if (err) {
                throw err;
            }
            console.table(res)
            mainMenu();
        }
    )
}

function viewAllRoles(){
    connection.query(
        'select ro.title as Role_title, ro.salary as Salary , dept.name as DepartmentName from Role ro left join department as dept on dept.id = ro.department_id', (err, res) => {
            if (err) {
                throw err;
            }
            console.table(res)
            mainMenu();
            }
    )
}

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Add department name",
        }
    ]).then(answer =>{
        console.log(answer)
        connection.query('INSERT INTO Department SET?', {name: answer.department}, (err, res) => {
            // if (err) throw err;
            console.table(res)
                mainMenu();
            });
    });
};
//finished review role id 
async function addEmployees() {
    const managers = await selectManager();
    inquirer.prompt([{
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
    let roleID =res.role
    let managerID = res.manager

    console.log({managerID})

    connection.query("INSERT INTO Employee SET ?",
        {
            first_name: res.firstname,
            last_name: res.lastname,
            manager_id: managerID,
            role_id: roleID, // review role ID
        }, function (err) {
            // if (err) throw err
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
            // mainMenu();

        })
        .catch(err => {
            // throw err
        });
        mainMenu();
}



mainMenu();