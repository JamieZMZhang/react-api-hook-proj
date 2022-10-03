import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';
import { LoadingState } from './LoadingState';
import { makePromise } from './internal/makePromise';
import { KeyValueObject } from './types';
import { ApiRequestParams } from './types/ApiRequestParams';
import { UseApiContext } from './UseApiContext';
import { joinUrl } from './utilities/url';
import { RequestSubject } from './internal/RequestSubject';

export type UseApiParams<TPayload, TData> = {
	url: string;
	method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
	initialValue: TData;

	cacheKey?: string | boolean;
	parallelKey?: string | boolean;

	suspense?: boolean;

	debounce?: number;
	onBeforeRequest?: (request: AxiosRequestConfig<any>) => AxiosRequestConfig<any>;
	onSuccess?: (payload: TPayload, response: AxiosResponse<any, any>, resquest: ApiRequestParams) => TData;
	onError?: (error: any, setData: React.Dispatch<React.SetStateAction<TData>>) => void;
};

let cacheStore: { [cacheKeys: string]: AxiosResponse<any> } = {};
let parallelStore: { [parallelKeys: string]: RequestSubject<any> } = {};

/**
 * Clear Api Cache data
 * @param cacheKey if empty remove all cache data
 */
export function clearApiCache(cacheKey?: string) {
	if (cacheKey) {
		delete cacheStore[cacheKey];
	} else {
		cacheStore = {};
	}
}

export function useApi<TPayload = any, TData = TPayload>(params: UseApiParams<TPayload, TData>) {
	const config = React.useContext(UseApiContext);
	const [data, setData] = React.useState<TData>(params.initialValue);
	const [loadingState, setLoadingState] = React.useState(LoadingState.NotInit);
	const [request, setRequest] = React.useState({ trigger: 0 } as ApiRequestParams & { trigger: number });
	const apiPromise = React.useRef(makePromise<TData>());
	const debounceRef = React.useRef<number>();

	const trigger = React.useCallback((apiParams?: ApiRequestParams) => {
		const send = () => {
			setRequest({ ...apiParams, trigger: +new Date() });
			apiPromise.current = makePromise<TData>();
			return apiPromise.current.promise;
		};

		if (typeof params.debounce === 'number') {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
				debounceRef.current = undefined;
			}
			return new Promise<TData>((resolve, reject) => {
				debounceRef.current = setTimeout(() => send().then(resolve).catch(reject), params.debounce);
			});
		}
		return send();
	}, []);

	React.useEffect(() => {
		if (request.trigger === 0) return;

		const onError = (reason: any) => {
			setLoadingState(LoadingState.Error);
			if (process.env.NODE_ENV === 'development') {
				console.error(reason);
			}
			if (typeof params.onError === 'function') {
				params.onError(reason, setData);
			}
			apiPromise.current.reject(reason);
		};

		const onSuccess = (response: AxiosResponse<any>) => {
			try {
				const data = typeof params.onSuccess === 'function' ? params.onSuccess(response.data, response, request) : response.data;
				setData(data);
				setLoadingState(LoadingState.Loaded);
				apiPromise.current.resolve(data);
			} catch (ex) {
				onError(ex);
			}
		};

		const requestUrl = getUrl(config.baseUrl, params.url, request.params);
		const cacheKey = getKey(requestUrl, request.api?.cacheKey, params.cacheKey);
		if (cacheKey !== null) {
			const cacheData = cacheStore[cacheKey];
			if (cacheData) {
				return void onSuccess(cacheData);
			}
		}

		// no cache. sending api request
		setLoadingState(LoadingState.Pending);

		const parallelKey = getKey(requestUrl, request.api?.parallelKey, params.parallelKey);
		let ongoingRequest: RequestSubject<AxiosResponse<any>> | undefined = parallelKey ? parallelStore[parallelKey] : undefined;

		if (!ongoingRequest) {
			const abortController = new AbortController();
			ongoingRequest = new RequestSubject(abortController);

			if (parallelKey) {
				parallelStore[parallelKey] = ongoingRequest;
			}

			const method = request.api?.method || params.method;

			let axiosRequest: AxiosRequestConfig<any> = {
				...request.requestConfig,
				url: requestUrl,
				params: { ...request.query, ...request.requestConfig?.params },
				method,
				data: request.body,
				signal: abortController.signal,
			};

			if (config.accessToken) {
				axiosRequest.headers = {
					...axiosRequest.headers,
					Authorization: 'Bearer ' + config.accessToken,
				};
			}

			if (typeof config.onBeforeRequest === 'function') {
				axiosRequest = config.onBeforeRequest(axiosRequest);
			}
			if (typeof params.onBeforeRequest === 'function') {
				axiosRequest = params.onBeforeRequest(axiosRequest);
			}
			axios(axiosRequest)
				.then(response => (typeof config.onResponse === 'function' && !config.onResponse(response) ? null : response))
				.then(response => {
					if (!response) return;
					if (cacheKey) {
						cacheStore[cacheKey] = response;
					}
					ongoingRequest!.next(response);
				})
				.catch(reason => ongoingRequest!.error(reason))
				.finally(() => {
					if (parallelKey && parallelStore[parallelKey]) {
						delete parallelStore[parallelKey];
					}
				});
		}
		const unsubscribe = ongoingRequest.subscribe(onSuccess, onError);

		return () => {
			unsubscribe();
			if (parallelKey && parallelStore[parallelKey]) {
				delete parallelStore[parallelKey];
			}
		};
	}, [request.trigger]);

	if (params.suspense && loadingState === LoadingState.Pending) {
		throw apiPromise.current.promise;
	}

	return [data, loadingState, trigger] as [typeof data, typeof loadingState, typeof trigger];
}

function getUrl(baseUrl: string | undefined | null, url: string, routeParams?: KeyValueObject) {
	let apiUrl = url;
	if (routeParams) {
		for (const paramKey in routeParams) {
			apiUrl = apiUrl.replaceAll(`{${paramKey}}`, routeParams[paramKey]);
		}
	}
	if (!!baseUrl && !/^([a-zA-z]+\:)?\/\//.test(apiUrl)) {
		apiUrl = joinUrl(baseUrl, apiUrl);
	}
	return apiUrl;
}

function getKey(apiUrl: string, requestKey?: string | boolean, apiParamsKey?: string | boolean) {
	const cacheKey = requestKey !== undefined ? requestKey : apiParamsKey;
	if (typeof cacheKey === 'string') {
		return cacheKey;
	}
	if (cacheKey === true) {
		return apiUrl;
	}
	return null;
}
