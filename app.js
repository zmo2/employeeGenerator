
const path = require("path")
const fs = require("fs")
const inquirer = require("inquirer")
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

const OUTPUT_DIR = path.resolve(__dirname,"output")
const outputPath = path.join(OUTPUT_DIR,"team.html")
const render = require("./lib/htmlRenderer")
let inpArray = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function getInfo(){
    return inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Please enter member name"
            },
            {
                type: "input",
                name: "id",
                message: "Please enter member id"
            },
            {
                type: "list",
                name: "title",
                message: "Please choose member title",
                choices: ["Engineer", "Intern", "Manager"],
            },
            {
                type: "input",
                name: "email",
                message: "Please enter member email"
            },
            {
                type: "input",
                name: "school",
                message: "Please enter member school",
                when: function(res) {
                return (res.title === "Intern")
                }
            },
            {
                type: "input",
                name: "github",
                message: "Please enter member github handle",
                when: function (res) {
                return (res.title === "Engineer")
                }
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Please enter member office number",
                when: function(res) {
                return (res.title === "Manager")
                }
            },
            {
                type: "confirm",
                name: "continue",
                message: "Would you like to keep adding?"
            },
        ]).then(function(res){
            switch(res.title){
                case "Manager":
                    let manager = new Manager(res.name, res.id, res.title,res.email, res.officeNumber)
                    inpArray.push(manager)
                    break
                case "Engineer":
                    let engineer = new Engineer(res.name, res.id, res.title, res.email, res.github)
                    inpArray.push(engineer)
                    break
                case "Intern":
                    let intern = new Intern(res.name, res.id, res.title, res.email, res.school)
                    inpArray.push(intern)
            }
            console.log(inpArray)
            keepAdd(res)
            let teamHtml = render(inpArray)
            fs.writeFileSync(outputPath,teamHtml)
        })
}

function keepAdd(res){
    if(res.continue){
        getInfo()
    }else{
        console.log("You have added all team members")
    }
}

getInfo()


