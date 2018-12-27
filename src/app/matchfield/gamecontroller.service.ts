import { GameEvent } from "./gamecontroller.service";
import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GamecontrollerService {
  private matchfield: number[] = new Array(9);

  private status: GameStatus;
  private actualPlayer: Player;

  gameEventEmitter = new EventEmitter<GameEvent>();

  private readonly winningSituations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  constructor() {}

  reset() {
    this.matchfield.fill(0, 0, 9);
    this.status = GameStatus.RUNNING;
    this.actualPlayer = Player.X_PLAYER;
    this.emitEvent();
  }

  setField(fieldNumber: number) {
    if (this.isWon() || this.getField(fieldNumber)) {
      return;
    }
    this.matchfield[fieldNumber] = this.actualPlayer;
    this.calcWinning();
    if (!this.isWon()) {
      this.actualPlayer =
        this.actualPlayer === Player.X_PLAYER
          ? Player.O_PLAYER
          : Player.X_PLAYER;
      this.emitEvent();
    }
  }

  getField(fieldNumber: number): number {
    return this.matchfield[fieldNumber];
  }

  private calcWinning() {
    for (let i = 0; i < this.winningSituations.length; i++) {
      if (
        (this.matchfield[this.winningSituations[i][0]] === Player.X_PLAYER &&
          this.matchfield[this.winningSituations[i][1]] === Player.X_PLAYER &&
          this.matchfield[this.winningSituations[i][2]] === Player.X_PLAYER) ||
        (this.matchfield[this.winningSituations[i][0]] === Player.O_PLAYER &&
          this.matchfield[this.winningSituations[i][1]] === Player.O_PLAYER &&
          this.matchfield[this.winningSituations[i][2]] === Player.O_PLAYER)
      ) {
        this.status = GameStatus.WINNER;
        this.emitEvent();
      }
    }

    if (
      !this.isWon() &&
      this.matchfield.find(value => value === 0) === undefined
    ) {
      this.status = GameStatus.REMI;
      this.emitEvent();
    }
  }

  getActualPlayer(): Player {
    return this.actualPlayer;
  }

  isWon(): boolean {
    return this.status === GameStatus.WINNER || this.status === GameStatus.REMI;
  }

  getGameEventEmitter() {
    return this.gameEventEmitter;
  }

  emitEvent() {
    this.gameEventEmitter.emit({
      status: this.status,
      gameSnapshot: this.matchfield.slice(),
      actualPlayer: this.getActualPlayer()
    });
  }
}

export enum Player {
  X_PLAYER = 1,
  O_PLAYER = 2
}

export enum GameStatus {
  RUNNING,
  WINNER,
  REMI
}

export interface GameEvent {
  status: GameStatus;
  gameSnapshot: number[];
  actualPlayer: Player;
}
