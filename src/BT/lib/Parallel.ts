import {Result, ParallelFunction} from "./Constants";
import Node from "./Node";

export default class Parallel extends Node {
    protected result: Result[];
    protected func: ParallelFunction = ParallelFunction.AND;

    constructor(name:string, func: ParallelFunction = ParallelFunction.AND) {
        super(name);
        this.func = func;
        this.result = Result[];
    }
    public function Tick(): Result {
        let endingResultCount = 0;
        for (let i = 0; i < this.children.length; i++) {
            if (this.func === ParallelFunction.AND) {
                if (this.result[i] === Result.Running) {
                    this.result[i] = this.children[i].Tick();
                }
                if (this.result[i] !== Result.Running) {
                    endingResultCount ++;
                }
            } else {
                if (this.result[i] === Result.Running) {
                    this.result[i] = this.children[i].Tick();
                }
                if (this.result[i] !== Result.Running) {
                    
                }
            }
        }
    }
    protected function SelfCheckCanEvaluate(): boolean {
        for (const child of this.children) {
            if (!child.CheckCanEvaluate()) {
                return false;
            }
        }
        return true;
    }
    private function ResetResult() {
        for (let i = 0; i < this.children.length; i++) {
            this.result[i] = Result.Running;
        }
    }
}