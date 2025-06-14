import fs from "fs";
import path from "path";
import { Employee } from "../domain/Employee";
import { EmployeeRepository } from "../domain/EmployeeRepository";
import { OurDate } from "src/core/ourDate/domain/OurDate";

const FILE_PATH = "../../../../resources/employee_data.txt";

export class LocalEmployeeRepository implements EmployeeRepository {
  constructor() {}

  async list(): Promise<Employee[]> {
    const data = fs.readFileSync(path.resolve(__dirname, FILE_PATH), "UTF-8");

    // split the contents by new line
    const lines = data.split(/\r?\n/);
    lines.shift();

    // get employees
    const employees = lines.map((line) => {
      const employeeData = line.split(", ");
      return new Employee(
        employeeData[1],
        employeeData[0],
        employeeData[2],
        employeeData[3]
      );
    });
    return employees;
  }
  async listByBirthday(ourDate: OurDate): Promise<Employee[]> {
    const employees = await this.list();
    return employees.filter((employee) => employee.isBirthday(ourDate));
  }
}
