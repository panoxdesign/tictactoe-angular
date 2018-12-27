import { Component, OnInit, Input } from "@angular/core";
import { GamecontrollerService } from "../gamecontroller.service";

@Component({
  selector: "tt-field",
  templateUrl: "./field.component.html",
  styles: []
})
export class FieldComponent implements OnInit {
  @Input() id: number;

  constructor(private gc: GamecontrollerService) {}

  ngOnInit() {}

  handleClick(event) {
    this.gc.setField(this.id);
  }

  getValueOfField() {
    return this.gc.getField(this.id);
  }
}
