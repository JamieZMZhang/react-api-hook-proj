import * as React from 'react';
import { LoadingState, useApi, clearApiCache } from 'react-api-hook';

function App() {
	const [products, loadingProducts, loadProducts] = useApi({
		url: 'https://dummyjson.com/products/{id}',
		initialValue: [],
		cacheKey: true,
		parallelKey: true,
		suspense: true,
	});
	const [products1, loadingProducts1, loadProducts1] = useApi({
		url: '/products/{id}',
		initialValue: [],
		parallelKey: true,
	});

	if (loadingProducts === LoadingState.Pending) {
		return <h1>Loading...</h1>;
	}

	return (
		<div>
			<button
				onClick={async () => {
					const data = await loadProducts({ api: { cacheKey: false }, params: { id: 1 } });
					console.log(data);
					loadProducts1({ api: { cacheKey: true }, params: { id: 2 } });
				}}
			>
				Load
			</button>
			<hr />
			{JSON.stringify(products)}
			<hr />
			{JSON.stringify(products1)}
		</div>
	);
}

export default App;
