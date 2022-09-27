USE employee_tracker;

INSERT INTO Departments(name) 

VALUES 
(1233, 'Networking'),
(2344, 'Engineering'),
(3456, 'Desktop'),
(4789, 'Help Desk');

INSERT INTO Roles(title, salary, department_id) 

VALUES
(00001, 'Desktop Tech', 600, 10001),
(00002, 'System Administrator', 600, 10002),
(00003, 'Administrator', 600, 10003),
(00004, 'System analyst', 600, 10004);

INSERT INTO Employees(first_name, last_name, role_id, manager_id) 

VALUES
(00005, 'John', 'Doe', 1991, 10005), 
(00006, 'Lawrence', 'Tillery', 1992, 10006),
(00007,'James', 'Doe', 1993, 10007),
(00008, 'Ermias', 'Doe', 1994, 10009);
