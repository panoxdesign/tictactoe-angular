import { GameStatus } from "./GameStatus";
import { Player } from "./Player";
export interface GameEvent {
  status: GameStatus;
  gameSnapshot: number[];
  actualPlayer: Player;
  winnerFields: number[];
}
