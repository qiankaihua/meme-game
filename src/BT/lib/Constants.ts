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
export {
    Status,
    Result,
    ActionStatus,
    ParallelFunction,
};