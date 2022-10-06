import { AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';
export declare type UseApiConfig = {
    baseUrl?: string;
    accessToken?: string;
    onBeforeRequest?: (request: AxiosRequestConfig) => AxiosRequestConfig;
    onResponse?: (response: AxiosResponse) => boolean | Promise<boolean>;
};
export declare const UseApiContext: React.Context<UseApiConfig>;
