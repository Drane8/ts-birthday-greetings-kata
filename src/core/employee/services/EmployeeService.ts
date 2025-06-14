import { EmployeeRepository } from "../domain/EmployeeRepository";

export class EmployeeService {
    constructor(
        private employeeRepository: EmployeeRepository,
    ) {}

    public async listEmployees() {
        return this.employeeRepository.list()
    }
}