const inquirer = require('inquirer');
const sql = require('mysql12');

const connect = mysql.createConnection({
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