import { Mail } from "./Mail";

export interface MailRepository {
  send(mail:Mail): void;
}
