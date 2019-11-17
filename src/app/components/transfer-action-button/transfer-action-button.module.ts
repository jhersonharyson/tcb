import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransferActionButtonComponent } from "./transfer-action-button.component";

import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TransferActionButtonComponent],
  exports: [TransferActionButtonComponent]
})
export class TransferActionButtonModule {}
