import { SeraphAuthService } from "./auth-service.js";
import type { UUID } from "node:crypto";

export class PlayerStashService {

	private readonly baseURL = "https://stash.seraph.si";

	constructor(private authService: SeraphAuthService) {
	}

	public fetchSeraphSearch = async (query: string) => {
		try {
			const response = await fetch(`${this.baseURL}/search`, {
				method: "POST",
				body: JSON.stringify({ query }),
				headers: {
					"Content-Type": "application/json",
					Authorization: await this.authService.getSeraphToken(true),
				},
			});

			if (!response.ok) return [];
			const data = (await response.json()) as { name: string; value: string }[];
			if (data == null) {
				return [];
			}

			return data;
		} catch {
			return [];
		}
	};

	public fetchSeraphPing = async (playerId: UUID | string) => {
		try {
			const response = await fetch(`${this.baseURL}/ping/${playerId}`, {
				headers: {
					Authorization: await this.authService.getSeraphToken(true),
				},
			});

			if (response.ok) {
				const { data } = (await response.json()) as {
					data:
						| {
						date: string;
						max: number;
						min: number;
						avg: number;
						history: number[];
						last_ping?: string;
					}[]
						| null;
				};
				return data;
			}

			return null;
		} catch (e) {
			return null;
		}
	};

}
