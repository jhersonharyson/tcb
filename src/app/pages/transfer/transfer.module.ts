import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransferComponent } from "./transfer.component";
import { TransferRoutingModule } from "./transfer-routing.module";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzStepsModule } from "ng-zorro-antd/steps";

@NgModule({
  imports: [CommonModule, TransferRoutingModule, NzButtonModule, NzStepsModule],
  declarations: [TransferComponent],
  exports: [TransferComponent]
})
export class TransferModule {}
