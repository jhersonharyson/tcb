export class Account {
  constructor(
    id: Number,
    bankCode: Number,
    agencyNumber: String,
    accountNumber: String
  ) {
    this.id = id;
    this.bankCode = bankCode;
    this.agencyNumber = agencyNumber;
    this.accountNumber = accountNumber;
  }
  id: Number;
  bankCode: Number;
  agencyNumber: String;
  accountNumber: String;
}
