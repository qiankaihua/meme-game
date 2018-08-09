import Action from "../lib/Action";
import { Result } from "../lib/Constants";

export default class DoAttack extends Action {

    constructor(name: string) {
        super(name);
        this.coolDown = 750;
    }

    public Tick(): Result {
        // console.log("do attack");
        this.lastTimeEvaluate = (new Date()).valueOf();
        this.simulateKeyboardEvent("keydown", "Attack");
        setTimeout(() => {
            this.simulateKeyboardEvent("keyup", "Attack");
        }, 2);
        return Result.Ended;
    }
}
