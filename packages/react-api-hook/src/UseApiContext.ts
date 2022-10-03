import { AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';
import { ApiRequestParams } from './types';

export type UseApiConfig = {
	baseUrl?: string;
	accessToken?: string;
	onBeforeRequest?: (request: AxiosRequestConfig) => AxiosRequestConfig;
	onResponse?: (response: AxiosResponse) => boolean | Promise<boolean>;
};

export const UseApiContext = React.createContext<UseApiConfig>({});
