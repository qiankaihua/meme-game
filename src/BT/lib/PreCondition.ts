import {Result} from "./Constants";
import Node from "./Node";
export default class ProCondition extends Node {
    public function check(checkFunction: (blackBoard: {[key: string]: any}) => boolean): boolean {
        return checkFunction(this.blackBoard);
    }
    public Tick (): Result {
        if (this.check()) {
            return Result.Ended;
        } else {
            return Result.Running;
        }
    }
}