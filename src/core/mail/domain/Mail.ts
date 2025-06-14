export class Mail {
  private readonly _sender: string;
  private readonly _recipient: string;
  private readonly _body: string;
  private readonly _subject: string;
  constructor(
    sender: string,
    recipient: string,
    body: string,
    subject: string
  ) {
    this._sender = sender;
    this._recipient = recipient;
    this._body = body;
    this._subject = subject;
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
