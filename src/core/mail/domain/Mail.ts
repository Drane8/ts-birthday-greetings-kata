export interface Mail {
  getSender(): string;
  getRecipent(): string;
  getBody(): string;
  getSubject(): string;
}
