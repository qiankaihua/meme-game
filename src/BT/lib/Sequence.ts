import { Result } from "./Constants";
import Node from "./Node";

export default class Sequence extends Node {
    private activeChild: Node;
    private activeIndex: number;

    constructor(name: string) {
        super(name);
        this.activeIndex = -1;
    }
    public Tick(): Result {
        if (this.activeChild === null) {
            this.activeChild = this.children[0];
            this.activeIndex = 0;
        }
        let result: Result = this.activeChild.Tick();
        if (result === Result.Ended) {
            this.activeIndex ++;
            if (this.activeIndex >= this.children.length) {
                this.activeChild.Clear();
                this.activeChild = null;
                this.activeIndex = -1;
            } else {
                this.activeChild.Clear();
                this.activeChild = this.children[this.activeIndex];
                result = Result.Running;
            }
        }
        return result;
    }
    public Clear():void {
        if (this.activeChild !== null) {
            this.activeChild.Clear();
            this.activeChild = null;
        }
        for (const child of this.children) {
            child.Clear();
        }
    }
    protected SelfCheckCanEvaluate(): boolean {
        if (this.activeChild !== null) {
            const result: boolean = this.activeChild.CheckCanEvaluate();
            if (!result) {
                this.activeChild.Clear();
                this.activeChild = null;
                this.activeIndex = -1;
            }
            return result;
        } else {
            return this.children[0].CheckCanEvaluate();
        }
    }
}