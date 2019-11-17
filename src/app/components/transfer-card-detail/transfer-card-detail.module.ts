import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransferCardDetailComponent } from "./transfer-card-detail.component";
import {
  NzCardModule,
  NzIconModule,
  NzSpinModule,
  NzToolTipModule,
  NzButtonModule
} from "ng-zorro-antd";

@NgModule({
  declarations: [TransferCardDetailComponent],
  exports: [TransferCardDetailComponent],
  imports: [
    CommonModule,
    NzSpinModule,
    NzIconModule,
    NzCardModule,
    NzToolTipModule,
    NzButtonModule
  ]
})
export class TransferCardDetailModule {}
