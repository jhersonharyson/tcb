import { async } from "@angular/core/testing";
import { ModelDataTransferDetail } from "./../../../domain/model-data-transfer-detail";
import { ContasEmpresaService } from "./../../../services/contas-empresa.service";
import { BancoService } from "./../../../services/banco.service";
import { Banco } from "./../../../domain/banco";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Transfer } from "src/app/domain/transfer";
import { TransferService } from "src/app/services/transfer.service";
import { Subscription, Subject } from "rxjs";
import { Finalidade } from "src/app/domain/finalidade";
import { FinalidadeService } from "src/app/services/finalidade.service";
import { EmpresaContaDTO } from "src/app/domain/conta";
import { NzNotificationService } from "ng-zorro-antd";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: "app-new-transfer",
  templateUrl: "./new-transfer.component.html",
  styleUrls: ["./new-transfer.component.scss"]
})
export class NewTransferComponent implements OnInit {
  cnpjmask = [
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/
  ];
  cpfmask = [
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/
  ];
  submitted = false;
  id: number;
  transfer: Transfer = new Transfer();
  registerForm: FormGroup;
  saveSub: Subscription;

  finalidades: Finalidade[] = [];
  bancos: Banco[] = [];
  constasEmpresa: EmpresaContaDTO[] = [];

  dataHoje = new Date();

  modalidades = [{ descricao: "TED" }];

  confirmModal: NzModalRef; // For testing by now

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private transferService: TransferService,
    private finalidadeService: FinalidadeService,
    private bancoService: BancoService,
    private contaEmpresaService: ContasEmpresaService,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}

  get f() {
    return this.registerForm.controls;
  }

  get nrCnpjCpfFavorecido() {
    return this.registerForm.get("nrCnpjCpfFavorecido");
  }

  get nomeFavorecido() {
    return this.registerForm.get("nomeFavorecido");
  }

  get nrBancoFavorecido() {
    return this.registerForm.get("nrBancoFavorecido");
  }

  get nrAgenciaFavorecido() {
    return this.registerForm.get("nrAgenciaFavorecido");
  }

  get nrContaFavorecido() {
    return this.registerForm.get("nrContaFavorecido");
  }

  get valor() {
    return this.registerForm.get("valor");
  }

  get valorTransferencia() {
    return this.registerForm.get("valorTransferencia");
  }

  get codigoFinalidade() {
    return this.registerForm.get("codigoFinalidade");
  }

  get modalidadeTransferencia() {
    return this.registerForm.get("modalidadeTransferencia");
  }

  get empresaContaDTO() {
    return this.registerForm.get("empresaContaDTO");
  }

  changeFinalidade(e) {
    this.codigoFinalidade.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeBanco(e) {
    //console.log(e.value)
    this.nrBancoFavorecido.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeContasEmpresa(e) {
    //console.log(e.value)
  }

  ngOnInit() {
    this.createForm(new Transfer());
    this.carregaFinalidades();
    this.carregaBancos();
    this.carregaContasEmpresa();
  }

  limparCpfCnpj(value) {
    return value.replace(/[./-]/g, "");
  }

  createForm(transfer: Transfer) {
    this.registerForm = this.fb.group({
      nrCnpjCpfFavorecido: [
        transfer.nrCnpjCpfFavorecido,
        [Validators.required]
      ],
      nomeFavorecido: [transfer.nomeFavorecido, [Validators.required]],
      nrBancoFavorecido: [transfer.nrBancoFavorecido, [Validators.required]],
      nrAgenciaFavorecido: [
        transfer.nrAgenciaFavorecido,
        [Validators.required]
      ],
      nrContaFavorecido: [transfer.nrContaFavorecido, [Validators.required]],
      valorTransferencia: [transfer.valorTransferencia],
      dataTransferencia: [transfer.dataTransferencia],
      codigoFinalidade: [transfer.codigoFinalidade, [Validators.required]],
      modalidadeTransferencia: [
        transfer.modalidadeTransferencia,
        [Validators.required]
      ],
      empresaContaDTO: [transfer.empresaContaDTO, [Validators.required]]
    });
  }

  onChange(result: Date): void {
    // console.log("onChange: ", result);
    // this.transfer.dataTransferencia = result;
  }

  carregaFinalidades() {
    return this.finalidadeService.findAll().subscribe(finalidades => {
      this.finalidades = finalidades;
    });
  }

  carregaContasEmpresa() {
    return this.contaEmpresaService.findAll().subscribe(constasEmpresa => {
      this.constasEmpresa = constasEmpresa;
    });
  }

  carregaBancos() {
    return this.bancoService.findAll().subscribe(bancos => {
      this.bancos = bancos;
    });
  }

  //  save(event: { preventDefault: () => void }) {
  //    event.preventDefault();

  //    this.saveSub = this.transferService
  //      .insert(this.registerForm.value)
  //      .subscribe(transfer => {
  //        // this.transferService.transfer = transfer;
  //        // this.transfer = this.transferService.transfer;
  //        //this.router.navigate(["transfer", transfer.id]);
  //       // transfer = this.registerForm.value
  //        this.transfer = transfer
  //        console.log(this.transfer)
  //        return this.transfer
  //      });

  //    //this.registerForm.reset(new Transfer());
  //  }

  showConfirm(contentTemplate: TemplateRef<{}>) {
    const valorTransacaoValidacao = document.getElementById("currency-field");
    // @ts-ignore
    this.registerForm.value["valorTransferencia"] = new Number(
      // @ts-ignore
      valorTransacaoValidacao.value
        .replace("R$ ", "")
        .replace(/\./g, "")
        .replace(",", ".")
    );

    this.registerForm.value["dataTransferencia"] = this.dataHoje;
    this.registerForm.value["modalidadeTransferencia"] = "TED";
    // @ts-ignore

    //console.log(new Number(valorTransacaoValidacao.value.replace('R$ ', '').replace(/\./g, '').replace(',', '.')) <= 0);
    // @ts-ignore
    //console.log(new Number(valorTransacaoValidacao.value.replace('R$ ', '').replace(/\./g, '').replace(',', '.')));

    // @ts-ignore
    //Validação do Valor
    if (
      new Number(
        // @ts-ignore
        valorTransacaoValidacao.value
          .replace("R$ ", "")
          .replace(/\./g, "")
          .replace(",", ".")
      ) <= 0
    ) {
      this.createNotification("error", "Insira um valor");
      return;
    }

    for (let key in this.f) {
      if (!!this[key] && this[key].errors != null) return;
    }

    this.confirmModal = this.modal.confirm({
      nzTitle: "Deseja prosseguir com a seguinte transferência?",
      nzContent: contentTemplate,
      nzOnOk: () => {
        const valorTransacao = document.getElementById("currency-field");

        this.registerForm.value["nrCnpjCpfFavorecido"] = this.unFormat(
          this.registerForm.value["nrCnpjCpfFavorecido"]
        );
        // @ts-ignore
        this.registerForm.value["valorTransferencia"] = new Number(
          // @ts-ignore
          valorTransacao.value
            .replace("R$ ", "")
            .replace(/\./g, "")
            .replace(",", ".")
        );

        const nrBancoFavorecido = this.registerForm.value["nrBancoFavorecido"];
        this.registerForm.value["dataTransferencia"] = new Date(
          this.registerForm.value["dataTransferencia"]
        ).getTime();

        this.registerForm.value["nrBancoFavorecido"] = this.registerForm.value[
          "nrBancoFavorecido"
        ].codigoBanco;

        try {
          return new Promise(async resolve => {
            try {
              const transfer = await this.transferService
                .insert(this.registerForm.value)
                .toPromise();

              this.transfer = transfer["data"];

              this.data_detail.push(new ModelDataTransferDetail(this.transfer));
            } catch (e) {
              setTimeout(() => {
                this.createNotification(
                  "error",
                  "Ops...",
                  "Não foi possível executar a tranferência. Tente novamente mais tarde"
                );
              }, 1000);
            } finally {
              resolve();
            }
          });
        } catch (e) {
          alert();
          return new Promise(resolve => {
            resolve();
            setTimeout(() => {
              this.createNotification(
                "error",
                "Ops...",
                "Não foi possível executar a tranferência. Tente novamente mais tarde"
              );
            }, 1000);
          });
          console.log(e);
        } finally {
          this.registerForm.value["nrBancoFavorecido"] = nrBancoFavorecido;
        }
      }
    });
  }

  /* ----------------------------------------------------------  */

  money = false;

  data_detail: any = [];

  onMoneyChange(event) {
    const value = event.target.value.indexOf("R$");
    alert(event.target.value);
  }

  formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  formatCurrency(input, blur) {
    this.money = true;
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    let input_val = input.target.value;

    // don't validate empty input
    if (input_val === "") {
      input.target.value = "R$ 00,00";
      return;
    }

    if (input_val.indexOf("R$ 0,00") >= 0 && input_val.length == 7) {
      input.target.value = "R$ 00,00";
      return;
    }

    if (input_val.indexOf("R$ 00,00") >= 0 && input_val.length == 8) {
      return;
    }

    if (input_val.indexOf("R$ 00,00") >= 0 && input_val.length === 9) {
      input.target.value = input_val.replace("R$ 00,00", "R$ ");
      return;
    }

    if (input_val.indexOf("R$ ,") >= 0) {
      input.target.value = input_val.replace("R$ ,", "R$ 00,");
      return;
    }

    if (input_val[3] === "0" && input_val[4] !== "," && input_val.length >= 5) {
      input.target.value = input_val.replace("R$ 0", "R$ ");
      return;
    }

    // original length
    const original_len = input_val.length;

    // initial caret position
    let caret_pos = input.target.selectionStart;

    // check for decimal
    if (input_val.indexOf(",") >= 0) {
      // get position of first decimal
      // this prevents multiple decimals from
      // being entered
      const decimal_pos = input_val.indexOf(",");

      // split number by decimal point
      let left_side = input_val.substring(0, decimal_pos);
      let right_side = input_val.substring(decimal_pos);

      // add commas to left side of number
      left_side = this.formatNumber(left_side);

      // validate right side
      right_side = this.formatNumber(right_side);

      // On blur make sure 2 numbers after decimal
      if (blur === "blur") {
        right_side += "00";
      }

      // Limit decimal to only 2 digits
      right_side = right_side.substring(0, 2);

      // join number by .
      input_val = "R$ " + left_side + "," + right_side;
    } else {
      // no decimal entered
      // add commas to number
      // remove all non-digits
      input_val = this.formatNumber(input_val);
      input_val = "R$ " + input_val;

      // final formatting
      if (blur === "blur") {
        input_val += ",00";
      }
    }

    // send updated string to input
    input.target.value = input_val === "R$ ,00" ? "R$ 00,00" : input_val;

    // put caret back in the right position
    const updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input.target.setSelectionRange(caret_pos, caret_pos);
  }

  cpf_cnpj = "";
  DECIMAL_SEPARATOR = ".";
  GROUP_SEPARATOR = ",";
  pureResult: any;
  maskedId: any;
  val: any;
  v: any;

  format() {
    const valString = this.registerForm.value["nrCnpjCpfFavorecido"];

    if (!valString) {
      return "";
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    this.pureResult = parts;

    if (parts[0].length <= 11) {
      this.maskedId = this.cpf_mask(parts[0]);

      return this.maskedId;
    } else {
      this.maskedId = this.cnpj(parts[0]);

      return this.maskedId;
    }
  }

  unFormat(val) {
    if (!val) {
      return "";
    }
    val = val.replace(/\D/g, "");

    if (this.GROUP_SEPARATOR === ",") {
      return val.replace(/,/g, "");
    } else {
      return val.replace(/\./g, "");
    }
  }

  cpf_mask(v) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
  }

  cnpj(v) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/, "$1.$2"); //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"); //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2"); //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2"); //Coloca um hífen depois do bloco de quatro dígitos
    return v;
  }

  validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf == "") return false;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    )
      return false;
    // Valida 1o digito
    var add = 0;
    for (var i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    var rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (var i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
  }

  createNotification(
    type: string,
    title: string = "Ops..",
    content: string = ""
  ): void {
    this.notification.create(type, title, content);
  }
}
