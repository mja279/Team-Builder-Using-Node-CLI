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

const employees = [];  

function promptUser() {
    return inquirer.prompt([
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
        {
            type: "list",
            name: "add",
            message: "Would you like to add more employees?",
            choices: ["Yes", "No, I'm done!"]
        }
    ]);
}

async function init() {

    try {
        const data = await promptUser();

        if (data.role === "Manager") {
            const newManager = new Manager(data.name, data.id, data.email, data.officeNumber);
            employees.push(newManager);
        }
        else if (data.role === "Engineer") {
            const newEngineer = new Engineer(data.name, data.id, data.email, data.github);
            employees.push(newEngineer);
        } 
        else { (data.role === "Intern") 
            const newIntern = new Intern(data.name, data.id, data.email, data.school);
            employees.push(newIntern);
        }

        const renderEmployees = render(employees);
        fs.writeFile(outputPath, renderEmployees, function() {
           console.log("Your team has been created!");
        })

        if (data.add === "Yes") {
            await init();
        }
    }
    catch(err){
        console.log(err);
    }
}

init();

