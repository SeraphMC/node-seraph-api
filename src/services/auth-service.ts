import type { SeraphTokenType } from "../models";

export class SeraphAuthService {
	private token?: { token: string; expiresAt: Date };

	constructor(private tokenType: SeraphTokenType, private clientRefreshToken: string) {
		if (!clientRefreshToken || !process.env.SERAPH_CLIENT_REFRESH_TOKEN) {
			throw new Error("Seraph refresh token is required");
		}
		if (!tokenType || !["SERAPH", "DEVELOPER"].includes(tokenType)) {
			throw new Error("Invalid token type");
		}
	}

	public getNewToken = async () => {
		let refreshURL: string;
		if (this.tokenType === "LEGACY") {
			refreshURL = "https://auth.seraph.si/v1/refresh";
		} else {
			refreshURL = "https://auth.seraph.si/v2/refresh/developer";
		}
		const response = await fetch(refreshURL, {
			method: "POST",
			body: JSON.stringify({
				token: this.clientRefreshToken,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) return null;

		const { token, expires_at } = (await response.json()) as { token: string; expires_at: string };
		this.token = {
			token,
			expiresAt: new Date(expires_at),
		};
	};

	private checkToken = async () => {
		if (!this.token?.token || (this.token && this.token.expiresAt < new Date())) {
			await this.getNewToken();
		}
	};

	public getSeraphToken = async (includeBearer: boolean = false) => {
		await this.checkToken();
		return (includeBearer ? "Bearer " : "") + this.token?.token;
	};
}
