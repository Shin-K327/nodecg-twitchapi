/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type EventSubscription = {
	id: string;
	status: string;
	type: string;
	version: string;
	cost: number;
	condition: {
		broadcaster_user_id: string;
	};
	transport: {
		method: string;
		callback: string;
	};
	created_at: string;
}[];