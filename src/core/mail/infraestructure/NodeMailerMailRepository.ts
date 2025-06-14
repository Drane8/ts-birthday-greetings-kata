import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import NodeMail from "nodemailer/lib/mailer";
import { MailRepository } from "../domain/MailRepository";
import { Mail } from "../domain/Mail";

interface Message extends SMTPTransport.Options, NodeMail.Options {}

export class NodeMailerMailRepository implements MailRepository {
  constructor(private smtpHost: string, private smtpPort: number) {}
  
   async send(mail: Mail) {
    const message = {
      host: this.smtpHost,
      port: this.smtpPort,
      from: mail.getSender(),
      to: [mail.getRecipent()],
      subject: mail.getSubject(),
      text: mail.getBody(),
    };

    this.deliveryMessage(message);
  }
  // made protected for testing :-(
  protected async deliveryMessage({ host, port, ...msg }: Message) {
    const transport = nodemailer.createTransport({ host, port });

    await transport.sendMail(msg);
  }
}