export class User {

  constructor(
    id: string,
    fullName: string,
    cpf: string,
    cnpj: string,
    password: string,
    email: string,
    master: boolean,
    state: boolean,
    date: string
  ) {
    this.id = id;
    this.fullName = fullName;
    this.cpf = cpf;
    this.cnpj = cnpj;
    this.password = password;
    this.email = email;
    this.master = master;
    this.state = state;
    this.date = date;
  }

  id: string;
  fullName: string;
  cpf: string;
  cnpj: string;
  password: string;
  email: string;
  master: boolean;
  state?: boolean;
  date?: string;
}
