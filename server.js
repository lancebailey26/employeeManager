const mysql = require('mysql');

const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_db'
  });
connection.connect((err) => {
    if (err) throw err;
    stepOne();
});

function stepOne(){
    inquirer
    .prompt({
        name: "menu",
        type: "list",
        message: "what would you like to do?",
        choices: ["list all employees", "view employees by department", "update employee", "add new employee", "delete an employee", "view all departments", "add department", "delete department", "quit"],
    })
    .then((results) =>{
        switch (results.menu) {
            case "list all employees":
                listallEmployees();
                break;
            case "view employees by department":
                byDepartment();
                break;
            case "update employee":
                updateEmployee();
                break;
            case "add new employee":
                newEmployee();
                break;
            case "delete an employee":
                deleteEmployee();
                break;
            case "view all departments":
                viewDepartments();
                break;
            case "add department":
                addDepartment();
                break;
            case "delete department":
                deleteDepartment();
                break;
            case "quit":
                connection.end();
                console.log("Bye!");
                break;
        }
    }
    )
}
const viewDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) =>{
     if (res[0]) {console.table(res)} else {console.log(err)} 
     repeat();
    });
    
}


const addDepartment = () => {
    inquirer
    .prompt({
        name: 'name',
        type: 'input',
        message: 'new department name: ',
    })
    .then((answers) => {
        connection.query('INSERT INTO department (name) VALUES ("'+answers.name+'")')
        console.log('new department created');
        repeat();
    })
}

const deleteDepartment = () => {
    inquirer
    .prompt({
        name: 'id',
        type: 'input',
        message: 'enter department id: ',
    })
    .then((answers) => {
        connection.query('SELECT * FROM department WHERE id ='+answers.id+'', (err, res) => {
            if (res) {console.table(res)} else {console.log(err)}
        })
        inquirer
        .prompt({
            name: "confirm",
            type: "list",
            message: "are you sure you want to delete this entry?",
            choices: ["yes", "go back"]
        })
        .then((answer) =>{
            switch(answer.confirm){
                case "yes":
                connection.query('DELETE FROM department WHERE id = '+answers.id+'', (err, res) => {
                    if (res) {console.log("Department Deleted.")} else {console.log(err)}
                    repeat();
                })
                break;
                case "go back":
                    repeat();
                    break;
    }})})};

const newEmployee = () => {
    inquirer
    .prompt([{
        name: 'first',
        type: 'input',
        message: 'first name: ',
    },
    {
        name: 'last',
        type: 'input',
        message: 'last name: ',
    },
    {
        name: 'title',
        type: 'input',
        message: 'title: ',
    },
    {
        name: 'role',
        type: 'input',
        message: 'role id #: ',
    },
    {
        name: 'dept',
        type: 'input',
        message: 'department id #: '
    },
    {
        name: 'manager',
        type: 'input',
        message: 'manager id # (if no manager, use NULL): '
    },
    {
        name: 'salary',
        type: 'input',
        message: 'salary: ',
    }])
    .then((answers) => {
        // console.log(answers)
        if (answers.manager==''){
            answers.manager == null
        }
        const query1 = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("'+answers.first+'", "'+answers.last+'", '+answers.role+', '+answers.manager+');' 
        const query2 = 'INSERT IGNORE INTO roles (title, department_id, salary) VALUES  ("'+answers.title+'", '+answers.dept+', '+answers.salary+');'
        // const query3 = 'INSERT  INTO roles (salary) VALUES  ('+answers.salary+');';
        connection.query(query1, (err, res) => {
            if (res) {console.log("Update 1/2 Complete!")} else {console.log(err)}
        });
        connection.query(query2, (err, res) => {
            if (res) {console.log("Update 2/2 Complete!")} else {console.log(err)}
        });
        // connection.query(query3, (err, res) => {
        //     if (res) {console.log("Update 3/3 Complete!")} else {console.log(err)}
        // });
        repeat();
        // connection.query('INSERT INTO employee (first_name, last_name) VALUES  ("'+answers.first+'", "'+answers.last+'"); INSERT IGNORE INTO roles (title) VALUES  ("'+answers.title+'"); INSERT  INTO roles (salary) VALUES  ("'+answers.salary+'");', (err, res) =>{
        //     if (res) {console.table(res)} else {console.log(err)}
        //     repeat();
        });
    }
function deleteEmployee(){
    inquirer
    .prompt({
        name: "id",
        type: "input",
        message: "enter employee's ID",
    })
    .then((results) =>{
        const query = 'SELECT * FROM employee JOIN roles ON employee.role_id = roles.id WHERE employee.id='+results.id+'';
        connection.query(query, (err, res) =>{
         if (res) {console.table(res)} else {console.log(err)}
        inquirer
        .prompt({
            name: "confirm",
            type: "list",
            message: "are you sure you want to delete this entry?",
            choices: ["yes", "go back"]
        })
        .then((answer) =>{
            switch(answer.confirm){
                case "yes":
                connection.query('DELETE FROM employee WHERE id = '+results.id+'', (err, res) => {
                    if (res) {console.log("Employee Deleted.")} else {console.log(err)}
                    repeat();
                });
                case "go back":
                    repeat();
                    break;
            }})})})};
function repeat(){
    inquirer
    .prompt({
        name: "menu",
        type: "list",
        message: "what would you like to do?",
        choices: ["return to main menu", "quit"],
    })
    .then((results) =>{
        switch (results.menu) {
            case "return to main menu":
                stepOne();
                break;
            case "quit":
                connection.end();
                console.log("Bye!");
                break;
        }
    }
    )
}

function byDepartment(){
    const names = connection.query('SELECT name FROM department')
    inquirer
    .prompt({
        name: "depart",
        type: "input",
        message: "Enter department id#: ",
        
    })
    .then((results) =>{
                var query = 'SELECT * FROM employee JOIN roles ON employee.role_id = roles.id WHERE department_id= '+results.depart+' ORDER BY employee.id ASC';
                connection.query(query, function (error, results){
                 if (error) throw error;
                   console.table(results)
                   repeat();
                }); 
        }
) 
}
const updateEmployee = () =>{
    inquirer
    .prompt({
        name: "id",
        type: "input",
        message: "enter employee's ID",
    })
    .then((results) =>{
        const query = 'SELECT * FROM employee JOIN roles ON employee.role_id = roles.id WHERE employee.id='+results.id+'';
        connection.query(query, (err, res) =>{
         if (res) {console.table(res)} else {console.log(err)} 
         inquirer
         .prompt({
            name: "what",
            type: "list",
            message:"what would you like to update?",
            choices: ["Salary", "Title", "Role ID", "Manager ID", "Department ID"]
         })
         .then((update)=>{
             switch(update.what){
                 case "Salary":
                 inquirer
                 .prompt({
                     name: "salary",
                     type: "input",
                     message: "enter salary: ",
                 })
                 .then((sal) =>{
                     connection.query('SELECT * FROM employee JOIN roles ON employee.role_id = roles.id;') 
                     connection.query('UPDATE roles SET salary ='+sal.salary+' WHERE id ='+results.id+';')
                     repeat();
                 })
                 break;

                 case "Title":
                 inquirer
                 .prompt({
                     name: "title",
                     type: "input",
                     message: "enter new title: ", 
                 })
                 .then((newTitle) =>{
                    connection.query('SELECT * FROM employee JOIN roles ON employee.role_id = roles.id;') 
                     connection.query('UPDATE roles SET title ="'+newTitle.title+'" WHERE id ='+results.id+';')
                    repeat();
                })
                break;

                case "Role ID":
                    inquirer
                    .prompt({
                        name: "role",
                        type: "input",
                        message: "enter new role id #: ", 
                    })
                    .then((newID) =>{
                       connection.query('SELECT * FROM employee JOIN roles ON employee.role_id = roles.id;') 
                        connection.query('UPDATE employee SET role_id ="'+newID.role+'" WHERE id ='+results.id+';')
                       repeat();
                   })
                break;

                 case "Manager ID":
                 inquirer
                 .prompt({
                     name: "mgr",
                     type: "input",
                     message: "enter new manager id #: ", 
                 })
                 .then((newMgr) =>{
                    connection.query('SELECT * FROM employee JOIN roles ON employee.role_id = roles.id;') 
                     connection.query('UPDATE employee SET manager_id ="'+newMgr.mgr+'" WHERE id ='+results.id+';')
                    repeat();
                })
                break;

                case "Department ID":
                    inquirer
                    .prompt({
                        name: "dept",
                        type: "input",
                        message: "enter new department #: ", 
                    })
                    .then((newDept) =>{
                       connection.query('SELECT * FROM employee JOIN roles ON employee.role_id = roles.id;') 
                        connection.query('UPDATE roles SET department_id ="'+newDept.dept+'" WHERE id ='+results.id+';')
                       repeat();
                   })
                break;
            };
        });
    })})};
         
            
const listallEmployees = () => {
    const query = 'SELECT * FROM employee JOIN roles ON employee.id = roles.id';
    connection.query(query, (err, res) =>{
     if (res[0]) {console.table(res)} else {console.log(err)} 
     repeat();
    });
    
}

