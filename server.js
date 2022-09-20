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