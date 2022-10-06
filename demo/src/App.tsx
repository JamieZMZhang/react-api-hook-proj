import { LoadingState, useApi } from '@asxasdfghjkl/react-use-api';

function App() {
	const [products, loadingProducts, loadProducts] = useApi({
		url: 'https://dummyjson.com/products/{id}',
		initialValue: [],
		parallelKey: '1',
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
