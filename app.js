// classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// prompt
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// path
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// output
const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const questions = [
    {
        type: "list",
        name: "role",
        message: "What type of employee would you like to add?",
        choices: ["Manger", "Engineer","Intern"]
    },
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's phone number?",
        when: function (answers) {
            return answers.role === "Manager";
        }
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub name?",
        when: function (answers) {
            return answers.role === "Engineer";
        },
    },
    {
        type: "input",
        name: "school",
        message: "What school does the intern attend?",
        when: function (answers) {
            return answers.role === "Intern";
        },
    },
    {
        type: "confirm",
        name: "add",
        message: "Would you like to add more team members?",
        default: true
        },
]

function promptUser() {
    return inquirer.prompt(questions)
};

promptUser() 
    .then(function(data){
        console.log(data);

        const employees = [];

        // if (data.add === true) {
        //     promptUser();
        // } else {
        //     console.log(data);
        // }

        if (data.role === "Manager") {
            const newManager = new Manager(name, id, email, officeNumber);
            employees.push(newManager);
        } 
        const renderEmployees = render(employees);
        fs.writeFile(outputPath, renderEmployees, function() {
            console.log("File has been written");
        })  
    });

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
function writeToFile(Manager, data) {
    fs.writeToFile(__dirname + "/manager.html"), function(err, data) {}        
}


// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.



// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
