export class currentUser {
  id: string;
  fullName: string;
  cpf: string;
  cnpj: string;
  email: string;
  master: boolean;
  accounts: Array<Account>;

  constructor(
    id: string,
    fullName: string,
    cpf: string,
    cnpj: string,
    email: string,
    master: boolean
  ) {
    this.id = id;
    this.fullName = fullName;
    this.cpf = cpf;
    this.cnpj = cnpj;
    this.email = email;
    this.master = master;
  }

  isMaster() {
    return this.master;
  }

  setAccounts(accounts: Array<Account>) {
    this.accounts = accounts;
  }
}
