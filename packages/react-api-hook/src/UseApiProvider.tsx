import * as React from 'react';
import { UseApiConfig, UseApiContext } from './UseApiContext';

declare interface UseApiProviderProps {
	config: UseApiConfig;
	children: React.ReactNode;
}

const UseApiProvider: React.FunctionComponent<UseApiProviderProps> = ({ config, children }) => {
	return <UseApiContext.Provider value={config} children={children} />;
};

export default UseApiProvider;
