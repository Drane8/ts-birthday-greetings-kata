import { OurDate } from "../../ourDate/domain/OurDate";
import { EmployeeRepository } from "src/core/employee/domain/EmployeeRepository";
import { MailRepository } from "src/core/mail/domain/MailRepository";
import { BirthdayMail } from "src/core/mail/domain/BirthdayMail";

export class BirthdayService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private mailRepository:MailRepository,){}
  async sendGreetings(
    ourDate: OurDate,
    sender: string
  ) {
    const employees = await this.employeeRepository.listByBirthday(ourDate);
      employees.forEach((employee) => {
        const mail = new BirthdayMail(employee, sender);
        this.mailRepository.send(mail);
      });
  }  
}

