# react-use-api

> An api hook for React.js

## Getting Started

### Basic usage
```javascript
import { useApi, LoadingState } from '@asxasdfghjkl/react-use-api';

const DataDisplay = () => {
	const [payload, loading, load] = useApi({
		url: 'https://jsonplaceholder.typicode.com/todos',
		initialValue: [],
	});

	React.useEffect(() => {
		load();
	}, []);

	if (loading === LoadingState.Pending) {
		return <h1>Loading...</h1>;
	}

	return JSON.stringify(payload);
};
```
