import { Employee } from "./Employee";

export interface EmployeeRepository {
    list(): Promise<Employee[]>;
}