import { EmpresaContaDTO } from "./conta";
import { Finalidade } from "./finalidade";

export class Transfer {
  codigoBanco?: number;
  codigoFinalidade?: Finalidade | number;
  descricaoFinalidade?: string;
  dataTransferencia?: number;
  id?: number;
  modalidadeTransferencia?: string = "TED";
  nomeFavorecido?: string;
  nrAgencia?: string;
  nrAgenciaFavorecido?: number;
  nrBancoFavorecido?: number;
  nomeBancoFavorecido?: string;
  nrCnpjCpfFavorecido?: string;
  nrConta?: string;
  nrContaFavorecido?: number;
  situacaoTransferencia?: string;
  valorTransferencia?: number;
  empresaContaDTO?: EmpresaContaDTO;
}
