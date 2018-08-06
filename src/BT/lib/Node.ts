import {Status} from "./Constants";
import PreCondition from "./PreCondition";

export default abstract class Node {
    protected blackBoard: {[key: string]: any};
    protected preCondition: PreCondition;
    protected activated: boolean;
    protected coolDown: number;

    constructor(blackBoard: {[key: string]: any}) {
        this.blackBoard = blackBoard;
        this.preCondition = null;
        this.activated = false;
    }
    public abstract function Activate(blackBoard: {[key: string]: any}) {}
    public abstract function Tick(): Status {}
    public abstract function Clear() {}
    public function CheckCanEvaluate() {
        let CD: boolean = this.isCoolDown;
        return this.activated
            && CD
            && (this.preCondition === null || this.preCondition.check())
            && this.SelfCheckCanEvaluate();
    }
    protected abstract function SelfCheckCanEvaluate(): boolean {};

    protected function isCoolDown(): boolean {
        // to do;
        return this.coolDown === 0;
    }
}