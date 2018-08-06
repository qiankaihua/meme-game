import Vector2i from "../AStar/Vector2i";
import Storage from "../Storage";
/**
 * ToolKit
 * Include some tool in calculation
 */
export default class PriorityQueue {
    private static vecStartI: Vector2i = new Vector2i(0, 0);
    private static vecEndI: Vector2i = new Vector2i(0, 0);
    private static vecStartJ: Vector2i = new Vector2i(0, 0);
    private static vecEndJ: Vector2i = new Vector2i(0, 0);
    private heap: Array<{[key: string]: any}>;
    private endX: number;
    private endY: number;
    private startX: number;
    private startY: number;
    constructor(sx: number, sy: number, ex: number, ey: number) {
        this.heap = [];
        this.endX = ex;
        this.endY = ey;
        this.startX = sx;
        this.startY = sy;
    }

    public get top(): {[key: string]: any} {
        return this.heap[0];
    }

    public get size(): number {
        return this.heap.length;
    }

    public push_back(value: {[key: string]: any}) {
        this.heap.push(value);
        this.siftUp();
        return this.size;
    }

    public pop() {
        const poppedValue = this.top;
        const bottom = this.size - 1;
        if (bottom > 0) {
            this.swap(0, bottom);
        }
        this.heap.pop();
        this.siftDown();
        return poppedValue;
    }

    private siftUp() {
        let node = this.size - 1;
        let parent = Math.floor((node + 1) / 2) - 1;
        while (node > 0 && this.compare(node, parent)) {
            this.swap(node, parent);
            node = parent;
            parent = Math.floor((node + 1) / 2) - 1;
        }
    }

    private siftDown() {
        let node = 0;
        let left = node * 2 + 1;
        let right = (node + 1) * 2;
        while (
            (left < this.size && this.compare(left, node)) ||
            (right < this.size && this.compare(right, node))
        ) {
            const minChild = (right < this.size && this.compare(right, left)) ? right : left;
            this.swap(node, minChild);
            node = minChild;
            left = node * 2 + 1;
            right = (node + 1) * 2;
        }
    }

    private swap(i: number, j: number) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    private compare(i: number, j: number) {
        // return i < j;
        let iToEndX = Math.abs(this.heap[i].x - this.endX);
        let iToEndY = Math.abs(this.heap[i].y - this.endY);

        iToEndX = Math.min(iToEndX, Storage.sceneWidth - iToEndX);
        iToEndY = Math.min(iToEndY, Storage.sceneHeight - iToEndY);

        let jToEndX = Math.abs(this.heap[j].x - this.endX);
        let jToEndY = Math.abs(this.heap[j].y - this.endY);

        jToEndX = Math.min(jToEndX, Storage.sceneWidth - jToEndX);
        jToEndY = Math.min(jToEndY, Storage.sceneHeight - jToEndY);

        const iToEndStep = iToEndX + iToEndY;
        const jToEndStep = jToEndX + jToEndY;

        const coef = 0.05;
        const coefi = coef * iToEndStep;
        const coefj = coef * jToEndStep;

        const jumpCoef = 215;

        const crossProductCoef = 10;

        PriorityQueue.vecStartI.x = this.heap[i].x - this.startX;
        PriorityQueue.vecStartI.y = this.heap[i].y - this.startY;
        PriorityQueue.vecStartJ.x = this.heap[j].x - this.startX;
        PriorityQueue.vecStartJ.y = this.heap[j].y - this.startY;

        // const Hi = coef * iToEndStep;
        // const Hj = coef * jToEndStep;

        // const Gi = this.heap[i].step; // + this.heap[i].jumpSpeed / 4;
        // const Gj = this.heap[j].step; // + this.heap[j].jumpSpeed / 4;

        // return Hi + Gi < Hj + Gj;
        return  (this.heap[i].steps * (1 + this.heap[i].steps / 6000) +
                iToEndStep * coefi +
                this.heap[i].jump * this.heap[i].jump * this.heap[i].jump * jumpCoef +
                Vector2i.CrossProduct(PriorityQueue.vecStartI, PriorityQueue.vecEndI) * crossProductCoef)
              < (this.heap[j].steps * (1 + this.heap[j].steps / 6000) +
                jToEndStep * coefj +
                this.heap[j].jump * this.heap[j].jump * this.heap[j].jump * jumpCoef +
                Vector2i.CrossProduct(PriorityQueue.vecStartJ, PriorityQueue.vecEndJ) * crossProductCoef);
    }
}
