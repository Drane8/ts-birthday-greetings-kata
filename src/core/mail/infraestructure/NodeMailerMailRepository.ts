import { Employee } from "src/core/employee/domain/Employee";
import nodemailer from "nodemailer";
import { MailRepository } from "../domain/MailRepository";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";
import { Mail as ourMail } from "src/core/mail/domain/Mail";

export class NodeMailerMailRepository implements MailRepository {
  constructor(private smtpHost: string, private smtpPort: number) {}
  sendBirthdayMails(employees: Employee[]): void {
    //enviar correos
    employees.forEach((employee) => {
      const mail = getMailMessage(employee, "sender@here.com");
      this.sendMessage(this.smtpHost, this.smtpPort, mail);
    });
  }

  private async sendMessage(smtpHost: string, smtpPort: number, mail: ourMail) {
    const message = {
      host: smtpHost,
      port: smtpPort,
      from: mail.getSender(),
      to: [mail.getRecipent()],
      subject: mail.getSubject(),
      text: mail.getBody(),
    };

    this.deliveryMessage(message);
  }
  protected async deliveryMessage({ host, port, ...msg }: Message) {
    const transport = nodemailer.createTransport({ host, port });

    await transport.sendMail(msg);
  }
}

export interface Message extends SMTPTransport.Options, Mail.Options {}

// made protected for testing :-(

function getMailMessage(employee: Employee, sender: string) {
  const recipient = employee.getEmail();
  const body = "Happy Birthday, dear %NAME%!".replace(
    "%NAME%",
    employee.getFirstName()
  );
  const subject = "Happy Birthday!";
  return new ourMail(sender, recipient, body, subject);
}
