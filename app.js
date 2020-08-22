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


const questions = [
    {
        type: "list",
        name: "role",
        message: "What type of employee would you like to add?",
        choices: ["Manager", "Engineer","Intern"]
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
        }
    },
    {
        type: "input",
        name: "school",
        message: "What school does the intern attend?",
        when: function (answers) {
            return answers.role === "Intern";
        }
    },
    // {
    //     type: "confirm",
    //     name: "add",
    //     message: "Would you like to add more team members?",
    //     default: true
    //     },
    {
        type: "list",
        name: "add",
        message: "Would you like to add more employees?",
        choices: ["Yes", "No, I'm done!"]
    }
]

function promptUser() {
    return inquirer.prompt(questions)
};

promptUser() 
    .then(function(data){
        console.log(data);

        const employees = [];   

        if (data.role === "Manager") {
            const newManager = new Manager(data.name, data.id, data.email, data.officeNumber);
            employees.push(newManager);
        }
        else if (data.role === "Engineer") {
            const newEngineer = new Engineer(data.name, data.id, data.email, data.github);
            employees.push(newEngineer);
        } 
        else if (data.role === "Intern") {
            const newIntern = new Intern(data.name, data.id, data.email, data.school);
            employees.push(newIntern);
        }

        const renderEmployees = render(employees);
        fs.writeFile(outputPath, renderEmployees, function(err) {
           console.log(err);
        })

        if (data.add === "Yes") {
            promptUser();
        }
    })
    .then(function() {
        console.log("File has been written");
    })
    .catch(function(err){
        console.log(err);
    })


  

    
