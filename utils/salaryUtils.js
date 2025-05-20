function calculateGrossSalary(basic, hra, allowances) {
  return basic + hra + allowances;
}

function calculateTax(gross) {
  if (gross <= 25000) return 0;
  if (gross <= 50000) return gross * 0.1;
  return gross * 0.2;
}

function calculatePF(basic) {
  return basic * 0.12;
}

function calculateSalary(gross, workingDays, fullDays, halfDays) {
  const dailyWage = gross / workingDays;
  const fullDaySalary = dailyWage * fullDays;
  const halfDaySalary = (dailyWage / 2) * halfDays;
  return fullDaySalary + halfDaySalary;
}

module.exports = { calculateGrossSalary, calculateTax, calculatePF, calculateSalary };