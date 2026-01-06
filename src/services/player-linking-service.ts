import type { UUID } from "node:crypto";
import { SeraphAuthService } from "./auth-service.js";
import type { Snowflake } from "discord-api-types/v6";

type LinkedAccounts = {
	snowflake: string;
	id: UUID;
	is_primary: boolean;
};

export type UserProfile = {
	snowflake: Snowflake;
	locale: string;
};

export type FetchedUserProfile = {
	user_profile: UserProfile;
	linked_accounts: LinkedAccounts[] | null;
} & { lng: string };

export class PlayerLinkingService {
	private readonly baseURL = "https://api.sussy.bot";

	constructor(private authService: SeraphAuthService) {}

	public sendLinkRequest = async (data: LinkedAccounts) => {
		const post = await fetch(`${this.baseURL}/v1/user/${data.snowflake}/link`, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				Authorization: await this.authService.getSeraphToken(true),
			},
		});
		if (!post.ok) throw new Error(await post.text());
		return (await post.json()) as typeof data;
	};

	public fetchLinkedAccounts = async (snowflake: string) => {
		const userLinkedAccounts = await fetch(`${this.baseURL}/v1/user/${snowflake}`, {
			method: "GET",
			headers: {
				Authorization: await this.authService.getSeraphToken(true),
			},
		});
		if (!userLinkedAccounts.ok) throw new Error(await userLinkedAccounts.text());
		return (await userLinkedAccounts.json()) as LinkedAccounts[];
	};

	public fetchUserProfile = async (snowflake: Snowflake) => {
		const userProfile = await fetch(`${this.baseURL}/v1/user/${snowflake}/profile`, {
			method: "GET",
			headers: {
				Authorization: await this.authService.getSeraphToken(true),
			},
		});
		if (!userProfile.ok) throw new Error(await userProfile.text());

		return (await userProfile.json()) as FetchedUserProfile;
	};

	public updateUserProfile = async (snowflake: Snowflake, data: Partial<Omit<UserProfile, "snowflake">>) => {
		const userProfile = await fetch(`${this.baseURL}/v1/user/${snowflake}/profile`, {
			method: "PATCH",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				Authorization: await this.authService.getSeraphToken(true),
			},
		});

		if (!userProfile.ok) throw new Error(await userProfile.text());

		return (await userProfile.json()) as UserProfile;
	};

	public fetchServerVerificationByCode = async (code: string) => {
		const response = await fetch(`${this.baseURL}/v1/verification/code/${code}`, {
			method: "GET",
			headers: {
				Authorization: await this.authService.getSeraphToken(true),
			},
		});
		if (!response.ok) throw new Error(await response.text());
		return (await response.json()) as { is_valid: boolean; success: boolean; message: string; minecraft_uuid?: UUID };
	};

	public updateUserPrefixById = async (uuidOrSnowflake: Snowflake | UUID) => {
		await fetch(`${this.baseURL}/v1/sync/rotational/prefix/${uuidOrSnowflake}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: await this.authService.getSeraphToken(true),
			},
		});
	};
}
