import { KeyValueObject } from "./KeyValueObject";


export type ApiRequestParams = {
	params?: KeyValueObject;
	query?: KeyValueObject;
	body?: KeyValueObject;
	extra?: KeyValueObject;
};
