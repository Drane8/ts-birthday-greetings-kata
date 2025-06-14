import { Employee } from "src/core/employee/domain/Employee";

export interface MailRepository {
  sendBirthdayMails(employees: Employee[]): void;
}
