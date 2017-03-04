var express = require('express');
var router = express.Router();
var mongoose = require('./conn');
var userfile = require('./users');
var User = userfile.User;
var employeeFile = require('./employees');
var Employee = employeeFile.employee;
//schema
var serviceSchema = new mongoose.Schema({
    serviceName: String,
    serviceDuration: Number,
    companyID: String,
    assignedEmployees: Array
});
var Service = mongoose.model('services', serviceSchema);
// SecurityFunction
function requireLogin(req, res, next) {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

//Get All Assignees of a particular service
router.get('/assignees/:id', requireLogin, function (req, res) {
    //console.log(req.params.id);
    Service.findOne({ _id: req.params.id }, function (err, service) {
        if (err) {
            res.send(err);
        }
        //Check employeesIDs
        if (service.assignedEmployees != undefined) {
            if (service.assignedEmployees.length > 0) {
                var query = { $or: [] };
                for (var i = 0; i < service.assignedEmployees.length; i++) {
                    var assignedEmployee = service.assignedEmployees[i];
                    query.$or.push({
                        _id: assignedEmployee
                    });
                }
                Employee.find(query).exec(function (err, assignees) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(assignees);
                });
            }
            else {
                res.json([]);
            }
        }
        else {

        }
        //Find Employees by their IDs and return them
    });
});
//Assign/Unassign employee from service
router.put('/assignees/', requireLogin, function (req, res, next) {
    var type = req.body.type;
    var serviceId = req.body.serviceId;
    var employeeId = req.body.employeeId;
    console.log(serviceId + employeeId + type);
    if (type === "unassign") {
        Service.findOneAndUpdate(
            { _id: serviceId },
            { $pull: { assignedEmployees: { _id: employeeId } } },
            function (err, service) {
                if (err) {
                    res.status(400);
                    res.send(err);
                }
                Employee.findOne({ _id: employeeId }).exec(function (err, assignee) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(assignee);
                });
            });
    }
    if (type === "assign") {
        Service.findOneAndUpdate(
            { _id: serviceId },
            { $push: { assignedEmployees: { _id: employeeId } } },
            function (err, service) {
                if (err) {
                    res.status(400);
                    res.send(err);
                }
                Employee.findOne({ _id: employeeId }).exec(function (err, assignee) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(assignee);
                });
            });
    }
});






//Load available employees
router.get('/assignees/available/:id', requireLogin, function (req, res) {
    Service.findOne({ _id: req.params.id }, function (err, service) {
        if (err) {
            res.send(err);
        }
        Employee.find({ companyID: req.session.user._id }, function (err, employees) {
            if (err) {
                res.send(err);
            }
            for (var i = 0; i < service.assignedEmployees.length; i++) {
                for (var y = 0; y < employees.length; y++) {
                    if (employees[y]._id == service.assignedEmployees[i]._id) {
                        employees.splice(y, 1);
                    }
                }
            }
            res.json(employees);

        })

    });



    /*  Service.findOne({ _id: req.params.id }, function (err, service) {
          if (err) {
              res.send(err);
          }
          //Check employeesIDs
          if(service.assignedEmployees != undefined)
          {
          if (service.assignedEmployees.length > 0) {
              var query = { $or: [] };
              for (var i = 0; i < service.assignedEmployees.length; i++) {
                  var assignedEmployee = service.assignedEmployees[i];
                  query.$or.push({
                      _id: assignedEmployee
                  });
              }
              Employee.find(query).exec(function (err, assignees) {
                  if (err) {
                      res.send(err);
                  }
                  res.json(assignees);
              });
          }
          else{
              res.status(404).json({error: "Assignees not found"});
          }
          }
          //Find Employees by their IDs and return them
      });*/
});



//Get All Services
router.get('/services/', requireLogin, function (req, res) {
    Service.find({ companyID: req.session.user._id }, function (err, services) {
        if (err) {
            res.send(err);
        }
        res.json(services);
    });
});
// Get Single Service
router.get('/service/:id', requireLogin, function (req, res) {
    Service.findOne({ _id: req.params.id }, function (err, service) {
        if (err) {
            res.send(err);
        }
        res.json(service);
    });
});
//Add New Service
router.post('/service', function (req, res) {
    var service = req.body;
    service.companyID = req.session.user._id;
    if (!service.serviceName || !service.serviceDuration) {
        res.status(400);
        res.json({
            "error": "Bad Data Is There"
        });
    } else {
        var newService = Service(service).save(function (err, service) {
            if (err) {
                res.send(err);
            }
            res.json(service);
        });
    }
});
//Delete An Service
router.delete('/service/:id', function (req, res, next) {
    console.log("deleting");
    Service.find({ _id: req.params.id }).remove(function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});
//Update Service
router.put('/service/', requireLogin, function (req, res, next) {
    var service = req.body;
    Service.findOneAndUpdate(
        { _id: service._id },
        { $set: { serviceName: service.serviceName, serviceDuration: service.serviceDuration } },
        function (err, service) {
            if (err) {
                res.send(err);
            }
            res.json(service);
        });
});

module.exports = router;