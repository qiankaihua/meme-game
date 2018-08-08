import { Result } from "./Constants";
import Node from "./Node";

export default class PrioritySelector extends Node {
    private activeChild: Node;

    constructor(name: string) {
        super(name);
        this.activeChild = null;
    }

    public Clear(): void {
        if (this.activeChild !== null) {
            this.activeChild.Clear();
            this.activeChild = null;
        }
    }
    public Tick() {
        if (this.activeChild === null) {
            return Result.Ended;
        }
        const result = this.activeChild.Tick();
        if (result !== Result.Running) {
            this.activeChild.Clear();
            this.activeChild = null;
        }
        return result;
    }
    protected SelfCheckCanEvaluate(): boolean {
        for (const child of this.children) {
            if (child.CheckCanEvaluate()) {
                if (this.activeChild !== null && this.activeChild !== child) {
                    this.activeChild.Clear();
                }
                this.activeChild = child;
                return true;
            }
        }
        if (this.activeChild !== null) {
            this.activeChild.Clear();
            this.activeChild = null;
        }
        return false;
    }
}