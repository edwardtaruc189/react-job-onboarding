const parseSalary = salary => {
  return salary > 9999 ? `${Math.floor(salary / 1000)}k` : salary;
};

export default parseSalary;
