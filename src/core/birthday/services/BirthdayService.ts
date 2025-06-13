import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { Employee } from "../../employee/domain/Employee";
import { OurDate } from "../../ourDate/domain/OurDate";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class BirthdayService {
  sendGreetings(
    fileName: string,
    ourDate: OurDate,
    smtpHost: string,
    smtpPort: number
  ) {
    const employees = getEmployeesData(fileName);

    //enviar correos
    employees.forEach((employee) => {
      if (employee.isBirthday(ourDate)) {
        const recipient = employee.getEmail();
        const body = "Happy Birthday, dear %NAME%!".replace(
          "%NAME%",
          employee.getFirstName()
        );
        const subject = "Happy Birthday!";
        this.sendMessage(
          smtpHost,
          smtpPort,
          "sender@here.com",
          subject,
          body,
          recipient
        );
      }
    });
  }

  async sendMessage(
    smtpHost: string,
    smtpPort: number,
    sender: string,
    subject: string,
    body: string,
    recipient: string
  ) {
    const message = {
      host: smtpHost,
      port: smtpPort,
      from: sender,
      to: [recipient],
      subject,
      text: body,
    };

    this.deliveryMessage(message);
  }

  // made protected for testing :-(
  protected async deliveryMessage({ host, port, ...msg }: Message) {
    const transport = nodemailer.createTransport({ host, port });

    await transport.sendMail(msg);
  }
}

export interface Message extends SMTPTransport.Options, Mail.Options {}
function getEmployeesData(fileName: string): Employee[] {
  const data = fs.readFileSync(
    path.resolve(__dirname, `../../../../resources/${fileName}`),
    "UTF-8"
  );

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

