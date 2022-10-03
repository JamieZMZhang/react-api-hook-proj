import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UseApiProvider } from 'react-api-hook';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<UseApiProvider config={{ baseUrl: 'https://dummyjson.com' }}>
			<React.Suspense fallback={<h1>suspense</h1>}>
				<App />
			</React.Suspense>
		</UseApiProvider>
	</React.StrictMode>
);
