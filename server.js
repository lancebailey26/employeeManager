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
// connection.connect((err) => {
//     if (err) throw err;
//     stepOne();
// });

function stepOne(){
    inquirer
    .prompt({
        name: "menu",
        type: "list",
        message: "what would you like to do?",
        choices: ["list all employees", "quit"],
    })
    .then((results) =>{
        switch (results.menu) {
            case "list all employees":
                listallEmployees();
                break;
            case "quit":
                connection.end();
                console.log("Bye!");
                break;
        }
    }
    )
}

function listallEmployees(){
    const query = 'SELECT * FROM employee';
    connection.connect();
    
    connection.query(query, function (error, results){
     if (error) throw error;
       console.table(results)
    });
    connection.end(); 
}
stepOne();
