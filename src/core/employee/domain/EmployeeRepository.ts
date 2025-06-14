import { OurDate } from "src/core/ourDate/domain/OurDate";
import { Employee } from "./Employee";

export interface EmployeeRepository {
    listByBirthday(ourDate: OurDate): Promise<Employee[]>;
}