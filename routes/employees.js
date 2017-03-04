var express = require('express');
var router = express.Router();
var mongoose = require('./conn');
//var userfile = require('./users');
//var User = userfile.User;
//schema
var employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    companyID: String
});
var Employee = mongoose.model('employees', employeeSchema);
// SecurityFunction
function requireLogin(req, res, next) {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};
//Get All Employees
router.get('/employees/', requireLogin, function (req, res) {
    Employee.find({ companyID: req.session.user._id }, function (err, employees) {
        if (err) {
            res.send(err);
        }
        res.json(employees);
    });
});
// Get Single Employee
router.get('/employee/:id', requireLogin, function (req, res) {
    Employee.findOne({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send(err);
        }
        res.json(employee);
    });
});
//Add New Employee
router.post('/employee', function (req, res) {
    var employee = req.body;
    employee.companyID = req.session.user._id;
    if (!employee.firstName || !employee.lastName) {
        res.status(400);
        res.json({
            "error": "Bad Data Is There"
        });
    } else {
        var newEmployee = Employee(employee).save(function (err, employee) {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    }
});
//Delete An Employee
router.delete('/employee/:id', function (req, res, next) {
    console.log("deleting");
    Employee.find({ _id: req.params.id }).remove(function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});
//Update Employee
router.put('/employee/', requireLogin, function (req, res, next) {
    var employee = req.body;
    Employee.findOneAndUpdate(
        { _id: employee._id },
        { $set: { firstName: employee.firstName, lastName: employee.lastName } },
        function (err, employee) {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
});

module.exports.router =  router;
module.exports.employee = Employee;
