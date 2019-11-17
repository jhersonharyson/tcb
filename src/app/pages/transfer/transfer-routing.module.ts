import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TransferComponent } from "./transfer.component";

const routes: Routes = [
  { path: "", component: TransferComponent },
  {
    path: "new-transfer",
    loadChildren: () =>
      import("./new-transfer/new-transfer.module").then(
        m => m.NewTransferModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferRoutingModule {}
