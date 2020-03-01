import { Observable } from "rxjs";
import { GamecontrollerService } from "./gamecontroller.service";
import { Component, OnInit } from "@angular/core";
import {
  trigger,
  query,
  transition,
  stagger,
  animateChild
} from "@angular/animations";
import { map, tap } from "rxjs/operators";
import { GameStatus } from "./gamestatus/GameStatus";

@Component({
  selector: "tt-matchfield",
  templateUrl: "./matchfield.component.html",
  styles: [],
  animations: [
    trigger("winAnimation", [
      transition("* => anim", [
        query(".field__winner-row", stagger(100, animateChild()))
      ])
    ])
  ]
})
export class MatchfieldComponent implements OnInit {
  private won: Observable<string>;
  constructor(private gc: GamecontrollerService) {}

  ngOnInit() {
    this.gc.reset();
    this.won = this.gc.gameEventEmitter.pipe(
      map(value => (value.status === GameStatus.WINNER ? "anim" : "")),
      tap(console.log)
    );
  }

  isWon() {
    return this.won;
  }
}
