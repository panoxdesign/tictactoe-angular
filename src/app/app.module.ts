import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MatchfieldComponent } from "./matchfield/matchfield.component";
import { FieldComponent } from "./matchfield/field/field.component";
import { PlayerPipePipe } from "./matchfield/field/player-pipe.pipe";
import { ResultComponent } from "./result/result.component";
import { GamecontrolsComponent } from "./matchfield/gamecontrols/gamecontrols.component";
import { GameeventPipePipe } from "./result/gameevent-pipe.pipe";

@NgModule({
  declarations: [
    AppComponent,
    MatchfieldComponent,
    FieldComponent,
    PlayerPipePipe,
    ResultComponent,
    GamecontrolsComponent,
    GameeventPipePipe
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
