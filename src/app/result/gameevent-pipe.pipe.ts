import { GameEvent } from "./../matchfield/gamestatus/GameEvent";
import { GameStatus } from "./../matchfield/gamestatus/GameStatus";
import { Pipe, PipeTransform } from "@angular/core";
import { PlayerPipePipe } from "../matchfield/field/player-pipe.pipe";

@Pipe({
  name: "gameeventPipe"
})
export class GameeventPipePipe implements PipeTransform {
  private gameEvent: GameEvent;

  transform(value: any, args?: any): any {
    if (value) {
      this.gameEvent = value;
      if (this.gameEvent.status === GameStatus.RUNNING) {
        return `Spieler ${new PlayerPipePipe().transform(
          this.gameEvent.actualPlayer
        )} ist am Zug!`;
      } else if (this.gameEvent.status === GameStatus.WINNER) {
        return `Spieler ${new PlayerPipePipe().transform(
          this.gameEvent.actualPlayer
        )} hat Gewonnen!`;
      } else if (this.gameEvent.status === GameStatus.REMI) {
        return `Unentschieden`;
      }
    }
    return "Da ist wohl was Schiefgelaufen";
  }
}
