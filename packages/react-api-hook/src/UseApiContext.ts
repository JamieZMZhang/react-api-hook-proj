import React from 'react';

export type UseApiConfig = {
	host?: string;
};

export const UseApiContext = React.createContext<UseApiConfig>({});
