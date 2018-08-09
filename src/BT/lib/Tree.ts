import { Result, blackBoard } from "./Constants";
import Node from "./Node";

export default class Tree {
    public isRunning: boolean;
    // public blackBoard: {[key: string]: any};
    protected root: Node;

    constructor() {
        this.root = null;
        this.isRunning = true;
        // this.blackBoard = {
        //     Reset: false,
        // };
    }
    public Awake(): void {
        this.Init();
        this.root.Activate();
    }
    public Update(): void {
        // console.log("updated");
        if (!this.isRunning) {
            return;
        }
        if (blackBoard.Reset === true) {
            this.Reset();
            blackBoard.Reset = false;
        }
        if (this.root.CheckCanEvaluate()) {
            this.root.Tick();
        }
    }
    public Destroy(): void {
        if (this.root !== null) {
            this.root.Clear();
        }
    }
    protected Reset(): void {
        if (this.root !== null) {
            this.root.Clear();
        }
    }
    protected Init(): void {
        blackBoard.Reset = false;
    }
}
