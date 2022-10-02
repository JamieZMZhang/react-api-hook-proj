import { ApiRequestParams } from './ApiRequestParams';


export type ApiTrigger<TData> = (reqeustParams: ApiRequestParams) => Promise<TData>;
