import {Result, ParallelFunction} from "./Constants";
import Node from "./Node";

export default class ParallelFlexible extends Node {

    protected activeList: boolean[];

    constructor(name:string) {
        super(name);
        this.activeList = new Array();
    }
    public Tick(): Result {
        let numRunningChildren = 0;

        for (let i = 0; i < this.children.length; i++) {
            if (this.activeList[i]) {
                const result = this.children[i].Tick();
                if (result === Result.Running) {
                    numRunningChildren ++;
                }
            }
        }
        if (numRunningChildren === 0) {
            return Result.Ended;
        }
        return Result.Running;
    }
    public Clear(): void {
        super.Clear();
        for (const child of this.children) {
            child.Clear();
        }
    }
    public AddChild(node: Node) {
        super.AddChild(node);
        this.activeList.push(false);
    }
    public RemoveChild(node: Node) {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].name === Child.name) {
                this.RemoveChildById(i);
                this.activeList.splice(i, 1);
            }
        }
    }
    protected SelfCheckCanEvaluate(): boolean {
        let numActiveChildren = 0;

        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].CheckCanEvaluate()) {
                this.activeList[i] = true;
                numActiveChildren++;
            } else {
                this.activeList[i] = false;
            }
        }

        if (numActiveChildren === 0) {
            return false;
        }
        return true;
    }
}