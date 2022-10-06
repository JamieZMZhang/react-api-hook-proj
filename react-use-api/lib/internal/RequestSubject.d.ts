declare type Subscriber<TData> = {
    onNext: (data: TData) => void;
    onError?: (reason?: any) => void;
};
export declare class RequestSubject<TData> {
    #private;
    private abortController;
    get subscriptions(): number;
    constructor(abortController: AbortController);
    subscribe(onNext: Subscriber<TData>['onNext'], onError?: Subscriber<TData>['onError']): () => void;
    next(data: TData): void;
    error(reason?: any): void;
}
export {};
