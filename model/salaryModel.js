const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  month: String,
  grossSalary: Number,
  pf: Number,
  tax: Number,
  totalSalary: Number,
  netSalary: Number

}, { timestamps: true });

const salay = mongoose.model('Salary', salarySchema);
module.exports = salay;
