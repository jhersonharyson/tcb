import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-side-card",
  templateUrl: "./side-card.component.html",
  styleUrls: ["./side-card.component.css"]
})
export class SideCardComponent implements OnInit {
  state = true;
  @Input() title = "Title";
  @Input() init = true;
  @Input() show = true;
  @Input() boxSize = "200px";

  constructor() {
    this.show = this.init;
  }

  ngOnInit() {}

  toggle() {
    this.state = !this.state;
  }
}
