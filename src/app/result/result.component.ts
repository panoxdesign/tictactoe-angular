import {
  GamecontrollerService,
  GameEvent
} from "./../matchfield/gamecontroller.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "tt-result",
  templateUrl: "./result.component.html",
  styles: []
})
export class ResultComponent implements OnInit, OnDestroy {
  private subscriber;
  gameEvent: GameEvent;

  constructor(private gc: GamecontrollerService) {}

  ngOnInit() {
    this.subscriber = this.gc
      .getGameEventEmitter()
      .subscribe((event: GameEvent) => {
        this.gameEvent = event;
      });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
