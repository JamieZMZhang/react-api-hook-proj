import * as React from 'react';
import { UseApiConfig } from './UseApiContext';
declare interface UseApiProviderProps {
    config: UseApiConfig;
    children: React.ReactNode;
}
export declare const UseApiProvider: React.FunctionComponent<UseApiProviderProps>;
export {};
