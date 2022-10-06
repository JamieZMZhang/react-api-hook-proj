export function joinUrl(...urlSagments: string[]) {
	const slashRegex = /^\/|\/$/g;
	const sagments = urlSagments.map(sagment => sagment.replace(slashRegex, ''));
	return sagments.join('/');
}
