import { Component, OnInit, Input, HostBinding } from "@angular/core";
import { GamecontrollerService, GameStatus } from "../gamecontroller.service";
import { map, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "tt-field",
  templateUrl: "./field.component.html",
  styles: []
})
export class FieldComponent implements OnInit {
  @Input() id: number;
  @HostBinding("class.field__winner-row")
  markAsWin = false;

  constructor(private gc: GamecontrollerService) {}

  ngOnInit() {
    this.gc.gameEventEmitter
      .pipe(
        distinctUntilChanged((x, y) => x.status === y.status),
        map(v =>
          v.status === GameStatus.RUNNING
            ? false
            : v.status === GameStatus.WINNER && v.winnerFields.includes(this.id)
            ? true
            : false
        )
      )
      .subscribe(v => (this.markAsWin = v));
  }

  handleClick(event) {
    this.gc.setField(this.id);
  }

  getValueOfField() {
    return this.gc.getField(this.id);
  }
}
