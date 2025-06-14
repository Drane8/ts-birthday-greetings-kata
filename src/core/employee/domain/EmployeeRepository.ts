import { OurDate } from "src/core/ourDate/domain/OurDate";
import { Employee } from "./Employee";

export interface EmployeeRepository {
    list(): Promise<Employee[]>;
    listByBirthday(ourDate: OurDate): Promise<Employee[]>;
}