import {Nutzer} from "./Nutzer";
import {Match} from "./Match";
import {Liga} from "./Liga";

export class Tipp {

  tipid: bigint | undefined;
  tipper: Nutzer | undefined;
  match: Match | undefined;
  teamATip: bigint | undefined;
  teamBTip: bigint | undefined;
  liga: Liga | undefined;
}
