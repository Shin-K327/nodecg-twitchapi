/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type RecievedEvent = (
	| {
			id: string;
			broadcaster_user_id: string;
			broadcaster_user_login: string;
			broadcaster_user_name: string;
			title: string;
			outcomes: {
				id: string;
				title: string;
				color: string;
				users?: number;
				channel_points?: number;
				top_predictors?: {
					user_name: string;
					user_login: string;
					user_id: string;
					channel_points_won: null | number;
					channel_points_used: number;
				}[];
			}[];
			started_at: string;
			locks_at?: string;
			locked_at?: string;
			ended_at?: string;
	  }
	| {
			broadcaster_user_id: string;
			broadcaster_user_login: string;
			broadcaster_user_name: string;
			title: string;
			language: string;
			category_id: string;
			category_name: string;
			is_mature: boolean;
	  }
	| {
			user_id: string;
			user_login: string;
			user_name: string;
			broadcaster_user_id: string;
			broadcaster_user_login: string;
			broadcaster_user_name: string;
			followed_at: string;
	  }
)[];