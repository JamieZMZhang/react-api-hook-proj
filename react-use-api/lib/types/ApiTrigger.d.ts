import { ApiRequestParams } from './ApiRequestParams';
export declare type ApiTrigger<TData> = (reqeustParams: ApiRequestParams) => Promise<TData>;
