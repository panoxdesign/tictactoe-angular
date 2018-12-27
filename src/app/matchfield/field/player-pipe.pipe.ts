import { Pipe, PipeTransform } from "@angular/core";
import { Player } from "./../gamecontroller.service";

@Pipe({
  name: "playerPipe"
})
export class PlayerPipePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const convertedValue = +value;

    if (isNaN(convertedValue) || !convertedValue) {
      return "";
    }
    return convertedValue === Player.X_PLAYER ? "X" : "O";
  }
}
