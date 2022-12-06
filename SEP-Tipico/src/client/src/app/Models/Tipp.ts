import {Nutzer} from "./Nutzer";
import {Team} from "./Team";
import {Liga} from "./Liga";

export class Tipp {
  tipper: Nutzer|undefined;
  team1: Team|undefined;
  team1Goals: bigint|undefined;

  team2: Team|undefined;
  team2Goals: bigint|undefined;

  tippLiga: Liga|undefined;
}
