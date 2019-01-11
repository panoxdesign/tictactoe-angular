import { GameEvent } from "./gamecontroller.service";
import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GamecontrollerService {
  private readonly MATCHFIELD_LENGTH = 9;
  private _matchfield: number[] = new Array(this.MATCHFIELD_LENGTH);

  private _status: GameStatus;
  private _actualPlayer: Player;

  private _gameEventEmitter = new EventEmitter<GameEvent>();

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
    this._matchfield.fill(0, 0, this.MATCHFIELD_LENGTH);
    this._status = GameStatus.RUNNING;
    this._actualPlayer = Player.X_PLAYER;
    this.emitEvent();
  }

  setField(fieldNumber: number) {
    if (this.isWon() || this.getField(fieldNumber)) {
      return;
    }
    this._matchfield[fieldNumber] = this._actualPlayer;
    this.calcWinning();
    if (!this.isWon()) {
      this._actualPlayer =
        this._actualPlayer === Player.X_PLAYER
          ? Player.O_PLAYER
          : Player.X_PLAYER;
    }
    this.emitEvent();
  }

  getField(fieldNumber: number): number {
    return this._matchfield[fieldNumber];
  }

  private calcWinning() {
    for (let i = 0; i < this.winningSituations.length; i++) {
      if (
        this._matchfield[this.winningSituations[i][0]] === this.actualPlayer &&
        this._matchfield[this.winningSituations[i][1]] === this.actualPlayer &&
        this._matchfield[this.winningSituations[i][2]] === this.actualPlayer
      ) {
        this._status = GameStatus.WINNER;
      }
    }

    if (
      !this.isWon() &&
      this._matchfield.find(value => value === 0) === undefined
    ) {
      this._status = GameStatus.REMI;
    }
  }

  get actualPlayer(): Player {
    return this._actualPlayer;
  }

  public get gameEventEmitter() {
    return this._gameEventEmitter;
  }

  private isWon(): boolean {
    return (
      this._status === GameStatus.WINNER || this._status === GameStatus.REMI
    );
  }

  private emitEvent() {
    this.gameEventEmitter.emit({
      status: this._status,
      gameSnapshot: this._matchfield.slice(),
      actualPlayer: this.actualPlayer
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
