import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-transfer-card-detail",
  templateUrl: "./transfer-card-detail.component.html",
  styleUrls: ["./transfer-card-detail.component.css"]
})
export class TransferCardDetailComponent implements OnInit {
  @Input() data = [];
  data_to_remove = null;
  constructor() {}

  ngOnInit() {}

  remove(transaction_id, element) {
    element.classList.add("remove");
    setTimeout(() => {
      this.data = this.data.filter(
        transfer => transfer.transaction_id != transaction_id
      );
    }, 900);
  }
}
