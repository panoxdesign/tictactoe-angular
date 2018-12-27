import { GamecontrollerService } from "./gamecontroller.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "tt-matchfield",
  templateUrl: "./matchfield.component.html",
  styles: []
})
export class MatchfieldComponent implements OnInit {
  constructor(private gc: GamecontrollerService) {}

  ngOnInit() {
    this.gc.reset();
  }
}
