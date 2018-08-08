import {Result} from "./Constants";
import Node from "./Node";
export default class PreCondition extends Node {

    private checkFunction: (blackBoard: {[key: string]: any}) => boolean;

    constructor(name: string) {
        super(name);
    }

    public set checkfunction(func: (blackBoard: {[key: string]: any}) => boolean) {
        this.checkFunction = func;
    }

    public check(): boolean {
        return this.checkFunction(this.blackBoard);
    }
    public Tick (): Result {
        if (this.check()) {
            return Result.Ended;
        } else {
            return Result.Running;
        }
    }
}