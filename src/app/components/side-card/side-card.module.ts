import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SideCardComponent } from "./side-card.component";
import { NzCardModule, NzIconModule, NzSpinModule } from "ng-zorro-antd";

@NgModule({
  declarations: [SideCardComponent],
  exports: [SideCardComponent],
  imports: [CommonModule, NzSpinModule, NzIconModule, NzCardModule]
})
export class SideCardModule {}
