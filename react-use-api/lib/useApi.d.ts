import { AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';
import { LoadingState } from './LoadingState';
import { ApiRequestParams } from './types/ApiRequestParams';
export declare type UseApiParams<TPayload, TData> = {
    url: string;
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
    initialValue: TData;
    cacheKey?: string | boolean;
    parallelKey?: string | boolean;
    suspense?: boolean;
    debounce?: number;
    retry?: number;
    onBeforeRequest?: (request: AxiosRequestConfig<any>) => AxiosRequestConfig<any>;
    onSuccess?: (payload: TPayload, response: AxiosResponse<any, any>, resquest: ApiRequestParams) => TData;
    onError?: (error: any, setData: React.Dispatch<React.SetStateAction<TData>>) => void;
};
/**
 * Clear Api Cache data
 * @param cacheKey if empty remove all cache data
 */
export declare function clearApiCache(cacheKey?: string): void;
export declare function useApi<TPayload = any, TData = TPayload>(params: UseApiParams<TPayload, TData>): [TData, LoadingState, (apiParams?: ApiRequestParams) => Promise<TData>];
