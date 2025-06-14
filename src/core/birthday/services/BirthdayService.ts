import { OurDate } from "../../ourDate/domain/OurDate";
import { EmployeeRepository } from "src/core/employee/domain/EmployeeRepository";
import { MailRepository } from "src/core/mail/domain/MailRepository";

export class BirthdayService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private mailRepository:MailRepository,){}
  async sendGreetings(
    ourDate: OurDate
  ) {
    const employees = await this.employeeRepository.listByBirthday(ourDate);
    this.mailRepository.sendBirthdayMails(employees);
  }
}

