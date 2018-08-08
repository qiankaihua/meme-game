import { Result } from "./Constants";
import Node from "./Node";

export default class Selector extends Node {
    private activeChild: Node;
    private startPoint: number;

    constructor(name: string) {
        super(name);
        this.activeChild = null;
        this.startPoint = 0;
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
        for (let i = 0; i < this.children.length; i++) {
        // for (const child of this.children) {
            this.startPoint++;
            this.startPoint %= this.children.length;
            if (this.children[this.startPoint].CheckCanEvaluate()) {
                if (this.activeChild !== null && this.activeChild !== this.children[this.startPoint]) {
                    this.activeChild.Clear();
                }
                this.activeChild = this.children[this.startPoint];
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