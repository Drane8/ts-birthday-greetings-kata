import { Employee } from "src/core/employee/domain/Employee";
import { Mail } from "./Mail";

export class BirthdayMail implements Mail {
  private readonly _sender: string;
  private readonly _recipient: string;
  private readonly _body: string;
  private readonly _subject: string;
  constructor(employee: Employee, sender: string) {
    this._sender = sender;
    this._recipient = employee.getEmail();
    this._body = "Happy Birthday, dear %NAME%!".replace(
      "%NAME%",
      employee.getFirstName()
    );
    this._subject = "Happy Birthday!";
  }

  getSender() {
    return this._sender;
  }
  getRecipent() {
    return this._recipient;
  }
  getBody() {
    return this._body;
  }
  getSubject() {
    return this._subject;
  }
}
