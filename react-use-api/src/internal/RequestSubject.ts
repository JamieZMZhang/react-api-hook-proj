type Subscriber<TData> = {
	onNext: (data: TData) => void;
	onError?: (reason?: any) => void;
};

export class RequestSubject<TData> {
	get subscriptions() {
		return this.#subscriptions.length;
	}

	constructor(private abortController: AbortController) {}

	#subscriptions: Subscriber<TData>[] = [];

	subscribe(onNext: Subscriber<TData>['onNext'], onError?: Subscriber<TData>['onError']) {
		const subscriber: Subscriber<TData> = { onNext, onError };
		this.#subscriptions.push(subscriber);

		return () => {
			const index = this.#subscriptions.indexOf(subscriber);
			this.#subscriptions.splice(index, 1);
			if (this.#subscriptions.length === 0) {
				this.abortController.abort();
			}
		};
	}

	next(data: TData) {
		for (const sub of this.#subscriptions) {
			try {
				sub.onNext(data);
			} catch (ex) {
				if (sub.onError) {
					sub.onError(ex);
				} else {
					throw ex;
				}
			}
		}
	}

	error(reason?: any) {
		for (const sub of this.#subscriptions) {
			sub.onError?.(reason);
		}
	}
}
