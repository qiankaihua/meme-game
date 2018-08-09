enum Status {
    SUCCESS = 1,
    FAIL    = 2,
    Run     = 3,
}
enum Result {
    Ended   = 1,
    Running = 2,
}
enum ActionStatus {
    Ready   = 1,
    Running = 2,
}
enum ParallelFunction {
    AND     = 1,
    OR      = 2,
}
/**
 * blackBoard:
 *      bullets[]
 *          startX
 *          width
 *          height
 *          x
 *          y
 *          dir
 *          maxDistence
 *      sence
 *          width
 *          height
 *      role
 *          x
 *          y
 *          height
 *          width
 *      enemy
 *          x
 *          y
 *          height
 *          widht
 *      defenseTime
 */
const blackBoard = {
    Reset: false,
    defenseTime: 0,
    role: {
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        attackKeepTimer: 0,
    },
    sence: {
        width: 0,
        height: 0,
    },
    bullets: new Array(),
    enemy: {
        x: 0,
        y: 0,
        height: 0,
        width: 0,
    },
};
export {
    blackBoard,
    Status,
    Result,
    ActionStatus,
    ParallelFunction,
};
