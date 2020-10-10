export interface Action<T = {}, K = string> {
    type: K;
    payload: T;
}
