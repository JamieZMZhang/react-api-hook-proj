const noop = () => void 0 as any;

export function makePromise<T>() {
	let resolve: (value: T) => any = noop;
	let reject: (reason?: any) => any = noop;

	const promise = new Promise<T>((success, error) => {
		resolve = success;
		reject = error;
	});
	return { promise, resolve, reject };
}
