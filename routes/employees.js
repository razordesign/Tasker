var express = require('express');
var router = express.Router();
var mongoose = require('./conn');

//schema
var employeeSchema = new mongoose.Schema({
firstName: String,
lastName: String,
companyID: String
});
var Employee = mongoose.model('employees', employeeSchema);
// Get All Employees
function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('/somehow');
  } else {
    next();
  }
};

router.get('/employees', requireLogin, function(req, res){
    Employee.find({}, function(err, employees){
        if(err){
            res.send(err);
        }
        res.json(employees);
    });
});

router.get('/employees/:companyID', requireLogin, function(req, res){
    Employee.find({companyID: req.params.companyID}, function(err, employees){
        if(err){
            res.send(err);
        }
        res.json(employees);
    });
});

// Get Single Employee
router.get('/employee/:id', requireLogin, function(req, res){
    Employee.findOne({_id: req.params.id}, function(err, employee){
        if(err){
            res.send(err);
        }
        res.json(employee);
    });
});

//Save Employee
router.post('/employee', function(req, res){
    var employee = req.body;
    if(!employee.firstName || !employee.lastName || !employee.companyID){
        res.status(400);
        res.json({
            "error": "Bad Data Is There"
        });
    } else {
        var newEmployee = Employee(req.body).save(function(err, employee){
            if(err){
                res.send(err);
            }
            res.json(employee);
        });
    }
});

// Delete Task
router.delete('/employee/:id', function(req, res, next){
    Employee.find({_id: req.params.id}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
    });
});

// Update Task
router.put('/employee/:id', function(req, res, next){
    var employee = req.body;
    var updEmpl = {};
    
    if(employee.isDone){
        updEmpl.isDone = employee.isDone;
    }
    
    if(employee.title){
        updEmpl.title = employee.title;
    }
    
    if(!updEmpl){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        Employee.update({_id: req.params.id},updEmpl, {}, function(err, employee){
        if(err){
            res.send(err);
        }
        res.json(employee);
    });
    }
});

module.exports = router;