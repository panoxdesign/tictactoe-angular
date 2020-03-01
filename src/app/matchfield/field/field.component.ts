import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener
} from "@angular/core";
import { GamecontrollerService } from "../gamecontroller.service";
import { GameStatus } from "../gamestatus/GameStatus";
import { map, distinctUntilChanged } from "rxjs/operators";
import {
  trigger,
  style,
  state,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: "tt-field",
  templateUrl: "./field.component.html",
  styles: [],
  animations: [
    trigger("winnerRow", [
      state("win", style({ backgroundColor: "#962c22" })),
      transition("* => win", [animate(250)])
    ])
  ]
})
export class FieldComponent implements OnInit {
  @Input() id: number;
  @HostBinding("@winnerRow")
  markAsWin = "";
  @HostBinding("class.field__winner-row")
  win = false;

  @HostListener("click")
  handleClick() {
    this.gc.setField(this.id);
  }

  constructor(private gc: GamecontrollerService) {}

  ngOnInit() {
    this.gc.gameEventEmitter
      .pipe(
        distinctUntilChanged((x, y) => x.status === y.status),
        map(v =>
          v.status === GameStatus.RUNNING
            ? ""
            : v.status === GameStatus.WINNER && v.winnerFields.includes(this.id)
            ? "win"
            : ""
        )
      )
      .subscribe(v => {
        this.markAsWin = v;
        this.win = v === "win";
      });
  }

  getValueOfField() {
    return this.gc.getField(this.id);
  }
}
