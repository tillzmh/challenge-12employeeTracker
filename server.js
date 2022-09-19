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
            
        }
    )
}