export declare function makePromise<T>(): {
    promise: Promise<T>;
    resolve: (value: T) => any;
    reject: (reason?: any) => any;
};
