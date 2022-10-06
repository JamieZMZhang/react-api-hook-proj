# react-use-api

> An api hook for React.js with Axios

## Getting Started

```bash
yarn add @asxasdfghjkl/react-use-api axios
or
npm install @asxasdfghjkl/react-use-api axios
```

### Basic usage

```javascript
import { useApi, LoadingState } from '@asxasdfghjkl/react-use-api';

const DataDisplay = () => {
	const [payload, loading, load] = useApi({
		url: 'https://jsonplaceholder.typicode.com/todos/{id}',
		initialValue: null,
	});

	React.useEffect(() => {
		load({
			params: { id: 1 },
			// query: { action: 'test' },
			// body: { data: 'hi' }
		});
	}, []);

	if (loading === LoadingState.Pending) {
		return <h1>Loading...</h1>;
	}

	return JSON.stringify(payload);
};
```
