import type { AxiosRequestConfig } from 'axios';
import { UseApiParams } from '../useApi';
import { KeyValueObject } from './KeyValueObject';
export declare type ApiRequestParams = {
    params?: KeyValueObject;
    query?: KeyValueObject;
    body?: KeyValueObject;
    extra?: KeyValueObject;
    requestConfig?: AxiosRequestConfig<any>;
    api?: Pick<UseApiParams<any, any>, 'cacheKey' | 'parallelKey' | 'method'> & {
        clearCache?: string;
    };
};
