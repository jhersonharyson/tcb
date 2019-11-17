import { Transfer } from "./transfer";

export class ModelDataTransferDetail {
  transaction_id: number;
  origin_bank: string;
  origin_agency: string;
  origin_account: string;
  target_bank: string;
  target_agency: number;
  target_account: number;
  transactioned_value: number;
  deleted: boolean;

  constructor(transfer: Transfer) {
    this.transaction_id = transfer.id;
    this.origin_bank = transfer.empresaContaDTO.nomeBanco;
    this.origin_agency = transfer.empresaContaDTO.nrAgencia;
    this.origin_account = transfer.empresaContaDTO.nrConta;
    this.target_bank = transfer.nomeBancoFavorecido;
    this.target_agency = transfer.nrAgenciaFavorecido;
    this.target_account = transfer.nrContaFavorecido;
    this.transactioned_value = transfer.valorTransferencia;
    this.deleted = false;
  }
}
