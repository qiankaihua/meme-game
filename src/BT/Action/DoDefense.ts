import Action from "../lib/Action";
import { Result, blackBoard } from "../lib/Constants";

export default class DoDefense extends Action {
    private timeout: NodeJS.Timer = null;

    constructor(name: string) {
        super(name);
        this.coolDown = blackBoard.defenseTime / 1.2;
    }

    public Tick(): Result {
        // console.log("do defense");
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.simulateKeyboardEvent("keyup", "Attack");
        this.simulateKeyboardEvent("keydown", "Defense");
        this.lastTimeEvaluate = (new Date()).valueOf();
        this.timeout = setTimeout(() => {
            this.simulateKeyboardEvent("keyup", "Defense");
        }, blackBoard.defenseTime);
        return Result.Ended;
    }
}
