const User = require('../model/userModel');
const employee = require('../model/attenddsMode');
const jwt = require('jsonwebtoken');
// controllers/salary.controller.js
const { calculateGrossSalary, calculatePF, calculateTax, calculateSalary } = require('../utils/salaryUtils');
const Salary = require('../model/salaryModel');
const Employee = require('../model/userModel');
const Attendance = require('../model/attenddsMode');
const registeruser = async (req, res) => {
    const { name, email, role, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.find
            ({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "employee", // Default role
        });
        await newUser.save();
        return res.status(201).json({ newUser, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const loginuser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET || "your_jwt_secret", { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const logoutuser = async (req, res) => {
    try {
        // Invalidate the token or perform any necessary logout actions
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const geteemployee = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


const getemployeebyid = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const emloyeeattends = async (req, res) => {
    const { employeeId } = req.params
    try {
        const { date, checkInTime, checkOutTime, status } = req.body
        const User = await employee.findById(employeeId)
        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newAttendds = new Attendds({
            employeeId: employeeId,
            date,
            checkInTime,
            checkOutTime,
            status
        })
        await newAttendds.save()
        res.status(201).json({ message: 'Attendance recorded successfully', newAttendds })



    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const payoutsalary = async (req, res) => {
    const { employeeId } = req.params
    try {
        const { salary , month , year } = req.body
        const User = await employee.findById(employeeId)
        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newAttendds = new Attendds({
            employeeId: employeeId,
            salary,
            month,
            year
        })
        await newAttendds.save()
        res.status(201).json({ message: ' salary payout  successfully', newAttendds })

    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const salary = async (req, res) => {
    const { employeeId } = req.params
    try {
        const { salary } = req.body
        const User = await employee.findById(employeeId)
        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newAttendds = new Attendds({
            employeeId: employeeId,
            salary
        })
        await newAttendds.save()
        res.status(201).json({ message: 'Attendance recorded successfully', newAttendds })

    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}

const salarycalculate = async (req, res) => {
    const { employeeId } = req.params
    try {
        const calculateSalary = await employee.findById(employeeId)
        if (!calculateSalary) {
            return res.status(404).json({ message: 'User not found' });
        }
        const totalSalary = calculateSalary.salary
        const totalDays = calculateSalary.attendance.length

        const salaryPerDay = totalSalary / totalDays
        // const totalSalary = salaryPerDay * totalDays
        res.status(200).json({ message: 'Salary calculated successfully', totalSalary })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getcalculatesalaryemployee = async (req, res) => {
    const { month, year } = req.query
    const { employeeId } = req.params
    try {
        month = month || new Date().toLocaleString('default', { month: 'long' });
        year = year || new Date().getFullYear();
        month = month.charAt(0).toUpperCase() + month.slice(1);
        const calculateSalary = await employee.findById(employeeId)
        if (!calculateSalary) {
            return res.status(404).json({ message: 'User not found' });
        }
        const totalSalary = calculateSalary.salary
        month = totalSalary.month
        year = totalSalary.year
        const basicSalary = totalSalary.basicSalary
        const bonus = totalSalary.bonus
        
        const totalDays = calculateSalary.attendance.length

        const salaryPerDay = totalSalary / totalDays
        // const totalSalary = salaryPerDay * totalDays
        res.status(200).json({ message: 'Salary calculated successfully', totalSalary })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}



const calaculatesalary = async (req, res) => {
  const { employeeId, month } = req.body;
  const employee = await Employee.findById(employeeId);
  const attendance = await Attendance.find({
    employee: employeeId,
    date: { $regex: month }
  });
  let fullDays = 0, halfDays = 0;
  attendance.forEach(a => a.hoursWorked >= 8 ? fullDays++ : halfDays++);
  const workingDays = fullDays + halfDays;
  const gross = calculateGrossSalary(employee.basicSalary, employee.hra, employee.allowances);
  const pf = calculatePF(employee.basicSalary);
  const tax = calculateTax(gross);
  const total = calculateSalary(gross, workingDays, fullDays, halfDays);
  const net = total - pf - tax;

  const salary = new Salary({ employee: employeeId, month, grossSalary: gross, pf, tax, totalSalary: total, netSalary: net });
  await salary.save();
  res.send(salary);
};

const getSalary = async (req, res) => {
  const { employeeId } = req.params;
  const { month } = req.query;
  const salary = await Salary.findOne({ employee: employeeId, month });
  if (!salary) return res.status(404).send('Salary not found');
  res.send(salary);
};

    module.exports = {
        registeruser,
        loginuser,
        logoutuser,
        getAllUsers,
        geteemployee,
        getemployeebyid,
        emloyeeattends,
        salary,
        payoutsalary,
        salarycalculate,
        calaculatesalary,
        getSalary,
        getcalculatesalaryemployee
    };
