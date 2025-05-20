const express = require('express');

const router = express.Router();
const { registeruser,loginuser,logoutuser,getAllUsers,geteemployee,getemployeebyid,emloyeeattends,payoutsalary,salarycalculate,getcalculatesalaryemployee, getSalary,calaculatesalary } = require('../controller/userController');
const { authorize, authMiddleware } = require('../middleware/auth');
// const { calculateSalary } = require('../utils/salaryUtils');
router.post('/register', registeruser);
router.post('/login', loginuser);
router.get('/logout',logoutuser);
router.get('/users', getAllUsers);

router.get('/users/', authorize(['HR', 'Admin']), geteemployee);
router.get('/users/:id', authorize(['HR', 'Admin']), getemployeebyid);
router.post('/users/:employeeId/attends', authMiddleware, emloyeeattends);
router.post("/salary/:employeeId", authMiddleware, payoutsalary);
// router.post("/calculate/:employeeId", authMiddleware(["HR"]), calaculatesalary);
router.get("/calculate/:employeeId", getcalculatesalaryemployee);
router.post('/calculate', calaculatesalary);
router.get('/:employeeId', getSalary);

module.exports = router;