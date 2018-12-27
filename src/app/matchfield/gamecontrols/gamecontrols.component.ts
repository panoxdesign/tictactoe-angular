import { GamecontrollerService } from "./../gamecontroller.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "tt-gamecontrols",
  templateUrl: "./gamecontrols.component.html",
  styles: []
})
export class GamecontrolsComponent implements OnInit {
  constructor(private gc: GamecontrollerService) {}

  ngOnInit() {}

  reset() {
    this.gc.reset();
  }
}
