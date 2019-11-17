import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransferComponent } from "./transfer.component";
import { TransferRoutingModule } from "./transfer-routing.module";

import { NzButtonModule } from "ng-zorro-antd/button";

@NgModule({
  imports: [CommonModule, TransferRoutingModule, NzButtonModule],
  declarations: [TransferComponent],
  exports: [TransferComponent]
})
export class TransferModule {}
