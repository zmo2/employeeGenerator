// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require ("./Employee")

class Manager extends Employee{
    constructor(name, id, title, email, officeNumber){
        super(name, id, title, email)
        this.officeNumber = officeNumber
    }
    getOfficeNumber(){
        return this.officeNumber
    }
}

module.exports = Manager;