import {Result, ParallelFunction} from "./Constants";
import Node from "./Node";

export default class Parallel extends Node {
    protected result: Result[];
    protected func: ParallelFunction = ParallelFunction.AND;

    constructor(name:string, func: ParallelFunction = ParallelFunction.AND) {
        super(name);
        this.func = func;
        this.result = [];
    }
    public Tick(): Result {
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
                    this.ResetResult();
                    return Result.Ended;
                }
            }
        }
        if (endingResultCount === this.children.length) {
            this.ResetResult();
            return Result.Ended;
        }
        return Result.Running;
    }
    public Clear(): void {
        this.ResetResult();
        for (const child of this.children) {
            child.Clear();
        }
    }
    public AddChild(node: Node) {
        super.AddChild(node);
        this.result.push(Result.Running);
    }
    public RemoveChild(node: Node) {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].name === node.name) {
                this.RemoveChildById(i);
                this.result.splice(i, 1);
            }
        }
    }
    protected SelfCheckCanEvaluate(): boolean {
        for (const child of this.children) {
            if (!child.CheckCanEvaluate()) {
                return false;
            }
        }
        return true;
    }
    private ResetResult() {
        for (let i = 0; i < this.children.length; i++) {
            this.result[i] = Result.Running;
        }
    }
}