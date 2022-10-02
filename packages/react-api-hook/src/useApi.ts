import { AxiosResponse } from 'axios';
import { ApiRequestParams } from './types/ApiRequestParams';

export type UseApiParams<TPayload, TData> = {
	url: string;
	method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
	initialValue: TData;

	debounce?: number;
	onSuccess?: (payload: TPayload, response: AxiosResponse<any, any>, resquest: ApiRequestParams) => TData;
	onError?: (error?: any) => void;
};

export function useApi<TPayload = any, TData = TPayload>(params: UseApiParams<TPayload, TData>) {}
