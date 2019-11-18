import { NewTransferRoutingModule } from "./new-transfer-routing.module";
import { NgModule } from "@angular/core";
import { NewTransferComponent } from "./new-transfer.component";
import { CommonModule } from "@angular/common";
import { NzFormModule } from "ng-zorro-antd/form";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";
import { TextMaskModule } from "angular2-text-mask";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzIconModule } from "ng-zorro-antd";
import { NzRadioModule } from "ng-zorro-antd/radio";

import { SideCardModule } from "./../../../components/side-card/side-card.module";
import { TransferCardDetailModule } from "./../../../components/transfer-card-detail/transfer-card-detail.module";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  imports: [
    NewTransferRoutingModule,
    CommonModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatIconModule,
    NzIconModule,
    CommonModule,
    TextMaskModule,
    NzDatePickerModule,
    NzSelectModule,
    SideCardModule,
    MatSelectModule,
    NzRadioModule,
    TransferCardDetailModule
  ],
  declarations: [NewTransferComponent],
  exports: [NewTransferComponent],
  bootstrap: [NewTransferComponent]
})
export class NewTransferModule {}
