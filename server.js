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
        choices: ["list all employees", "view employees by department", "quit"],
    })
    .then((results) =>{
        switch (results.menu) {
            case "list all employees":
                listallEmployees();
                break;
            case "view employees by department":
                byDepartment();
                break;
            case "quit":
                connection.end();
                console.log("Bye!");
                break;
        }
    }
    )
}

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
    inquirer
    .prompt({
        name: "depart",
        type: "list",
        message: "which department?",
        choices: ["Sales", "Engineering", "Legal", "Finance"]
    })
    .then((results) =>{
        switch (results.depart) {
            case "Sales":
                var query = 'SELECT * FROM employee JOIN roles ON employee.role_id = roles.id WHERE department_id= 1 ORDER BY employee.id ASC';
                
                
                connection.query(query, function (error, results){
                 if (error) throw error;
                   console.table(results)
                   repeat();
                });
                
                break;
            case "Engineering":
                var query = 'SELECT * FROM employee JOIN roles ON employee.role_id = roles.id WHERE department_id= 2 ORDER BY employee.id ASC';
                
                
                connection.query(query, function (error, results){
                 if (error) throw error;
                   console.table(results)
                   repeat();
                });
                
                break;
            case "Legal":
                var query = 'SELECT * FROM employee JOIN roles ON employee.role_id = roles.id WHERE department_id= 3 ORDER BY employee.id ASC';
                ;
                
                connection.query(query, function (error, results){
                 if (error) throw error;
                   console.table(results)
                   repeat();
                });
                
                break;
             case "Legal":
                var query = 'SELECT * FROM employee JOIN roles ON employee.role_id = roles.id WHERE department_id= 4 ORDER BY employee.id ASC';
                
                
                connection.query(query, function (error, results){
                 if (error) throw error;
                   console.table(results)
                   repeat();
                });
                break;   
        }
        
    }) 
    
}

const listallEmployees = () => {
    const query = 'SELECT * FROM employee JOIN roles ON employee.role_id = roles.id ORDER BY employee.id ASC';
    connection.query(query, (err, res) =>{
     if (res[0]) {console.table(res)} else {console.log(err)} 
     repeat();
    });
    
}

