import {Team} from "./Team";
import {Tipp} from "./TippN";
import {Match} from "./Match";

export class TippContainer {
  tipp: Tipp|undefined;
  team1: string|undefined;
  team2: string|undefined;
  spiel: Match|undefined;
  tipp1: string|undefined;
  tipp2: string|undefined;
}
